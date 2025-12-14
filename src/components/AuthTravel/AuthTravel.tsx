import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../../slices/authSlice";
import type {
  RegisterFormValues,
  LoginFormValues,
  StoredUser,
} from "../../services/types/auth";

import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from "formik";
import * as Yup from "yup";
import { Eye, EyeOff } from "lucide-react";
import { useTranslation } from "react-i18next";

const USERS_KEY = "travel_users";

const getUsersFromStorage = (): StoredUser[] => {
  const raw = localStorage.getItem(USERS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as StoredUser[];
  } catch {
    return [];
  }
};

const saveUsersToStorage = (users: StoredUser[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const getPasswordStrength = (
  password: string
): "weak" | "medium" | "strong" | null => {
  if (!password) return null;

  let score = 0;

  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return "weak";
  if (score <= 4) return "medium";
  return "strong";
};

const AuthTravel: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [mode, setMode] = React.useState<"register" | "login">("register");
  const [message, setMessage] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [showLoginPassword, setShowLoginPassword] = React.useState(false);

  const [passwordStrength, setPasswordStrength] = React.useState<
    "weak" | "medium" | "strong" | null
  >(null);

  // i18n schemas (нужно для локализации Yup ошибок)
  const registerValidationSchema = React.useMemo(
    () =>
      Yup.object({
        firstName: Yup.string()
          .min(2, t("auth.validation.min2"))
          .required(t("auth.validation.required")),
        lastName: Yup.string()
          .min(2, t("auth.validation.min2"))
          .required(t("auth.validation.required")),
        email: Yup.string()
          .email(t("auth.validation.invalid_email"))
          .required(t("auth.validation.required")),
        phone: Yup.string()
          .min(5, t("auth.validation.too_short"))
          .required(t("auth.validation.required")),
        password: Yup.string()
          .min(6, t("auth.validation.min6"))
          .required(t("auth.validation.required")),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password")], t("auth.validation.passwords_no_match"))
          .required(t("auth.validation.required")),
      }),
    [t]
  );

  const loginValidationSchema = React.useMemo(
    () =>
      Yup.object({
        email: Yup.string()
          .email(t("auth.validation.invalid_email"))
          .required(t("auth.validation.required")),
        password: Yup.string().required(t("auth.validation.required")),
      }),
    [t]
  );

  const handleRegister = async (
    values: RegisterFormValues,
    { setSubmitting, resetForm }: FormikHelpers<RegisterFormValues>
  ) => {
    setMessage(null);
    setError(null);

    const users = getUsersFromStorage();
    const exists = users.find((u) => u.email === values.email);

    if (exists) {
      setError(t("auth.messages.user_exists"));
      setSubmitting(false);
      return;
    }

    const newUser: StoredUser = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone,
      password: values.password,
    };

    users.push(newUser);
    saveUsersToStorage(users);

    setMessage(t("auth.messages.register_success"));
    resetForm();
    setPasswordStrength(null);
    setSubmitting(false);
    setMode("login");
  };

  const handleLogin = async (
    values: LoginFormValues,
    { setSubmitting }: FormikHelpers<LoginFormValues>
  ) => {
    setMessage(null);
    setError(null);

    const users = getUsersFromStorage();
    const user = users.find(
      (u) => u.email === values.email && u.password === values.password
    );

    if (!user) {
      setError(t("auth.messages.invalid_credentials"));
      setSubmitting(false);
      return;
    }

    localStorage.setItem("logged_user", JSON.stringify(user));
    dispatch(login(user.email));

    setSubmitting(false);
    window.location.href = "/account";
  };

  return (
    <div className="w-full flex items-center mt-20 justify-center px-4 py-8 bg-white">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl border border-sky-100 p-6 sm:p-8">
        {/* Header + mode switch */}
        <div className="mb-6 text-center">
          <p className="text-[10px] uppercase tracking-[0.25em] text-sky-500 font-semibold">
            {t("auth.brand")}
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-slate-900">
            {mode === "register"
              ? t("auth.title_register")
              : t("auth.title_login")}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {mode === "register"
              ? t("auth.subtitle_register")
              : t("auth.subtitle_login")}
          </p>

          <div className="mt-4 inline-flex items-center gap-2 text-xs text-slate-500">
            <button
              type="button"
              onClick={() => {
                setMode("register");
                setPasswordStrength(null);
              }}
              className={`px-3 py-1 rounded-full border text-xs ${
                mode === "register"
                  ? "bg-sky-500 text-white border-sky-500"
                  : "border-slate-200 hover:border-sky-400"
              }`}
            >
              {t("auth.switch_register")}
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setPasswordStrength(null);
              }}
              className={`px-3 py-1 rounded-full border text-xs ${
                mode === "login"
                  ? "bg-sky-500 text-white border-sky-500"
                  : "border-slate-200 hover:border-sky-400"
              }`}
            >
              {t("auth.switch_login")}
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            {message}
          </div>
        )}

        {mode === "register" ? (
          // REGISTER FORM
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              phone: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={registerValidationSchema}
            onSubmit={handleRegister}
          >
            {({ isSubmitting }) => (
              <Form className="grid grid-cols-1 gap-4 sm:gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-xs font-semibold text-slate-600 mb-1.5"
                      htmlFor="firstName"
                    >
                      {t("auth.fields.first_name")}
                    </label>
                    <Field
                      id="firstName"
                      name="firstName"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition"
                      placeholder={t("auth.placeholders.first_name")}
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="mt-1 text-xs text-red-600"
                    />
                  </div>

                  <div>
                    <label
                      className="block text-xs font-semibold text-slate-600 mb-1.5"
                      htmlFor="lastName"
                    >
                      {t("auth.fields.last_name")}
                    </label>
                    <Field
                      id="lastName"
                      name="lastName"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition"
                      placeholder={t("auth.placeholders.last_name")}
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="mt-1 text-xs text-red-600"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    className="block text-xs font-semibold text-slate-600 mb-1.5"
                    htmlFor="email"
                  >
                    {t("auth.fields.email")}
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition"
                    placeholder={t("auth.placeholders.email")}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="mt-1 text-xs text-red-600"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    className="block text-xs font-semibold text-slate-600 mb-1.5"
                    htmlFor="phone"
                  >
                    {t("auth.fields.phone")}
                  </label>
                  <Field
                    id="phone"
                    name="phone"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition"
                    placeholder={t("auth.placeholders.phone")}
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="mt-1 text-xs text-red-600"
                  />
                </div>

                {/* Password + Confirm */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Password with strength indicator */}
                  <div>
                    <label
                      className="block text-xs font-semibold text-slate-600 mb-1.5"
                      htmlFor="password"
                    >
                      {t("auth.fields.password")}
                    </label>

                    <Field name="password">
                      {({ field }: any) => (
                        <div className="relative">
                          <input
                            {...field}
                            id="password"
                            type={showPassword ? "text" : "password"}
                            className="w-full rounded-lg border border-slate-200 px-3 pr-16 py-2.5 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition"
                            placeholder={t("auth.placeholders.password")}
                            onChange={(e) => {
                              field.onChange(e);
                              setPasswordStrength(
                                getPasswordStrength(e.target.value)
                              );
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center text-slate-600 hover:text-slate-800 px-3"
                          >
                            {showPassword ? (
                              <EyeOff size={18} strokeWidth={2} />
                            ) : (
                              <Eye size={18} strokeWidth={2} />
                            )}
                          </button>
                        </div>
                      )}
                    </Field>

                    <ErrorMessage
                      name="password"
                      component="div"
                      className="mt-1 text-xs text-red-600"
                    />

                    {passwordStrength && (
                      <div className="mt-1 text-xs font-semibold">
                        {passwordStrength === "weak" && (
                          <span className="text-red-600">
                            {t("auth.password_strength.weak")}
                          </span>
                        )}
                        {passwordStrength === "medium" && (
                          <span className="text-yellow-600">
                            {t("auth.password_strength.medium")}
                          </span>
                        )}
                        {passwordStrength === "strong" && (
                          <span className="text-emerald-600">
                            {t("auth.password_strength.strong")}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label
                      className="block text-xs font-semibold text-slate-600 mb-1.5"
                      htmlFor="confirmPassword"
                    >
                      {t("auth.fields.confirm_password")}
                    </label>

                    <div className="relative">
                      <Field
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        className="w-full rounded-lg border border-slate-200 px-3 pr-16 py-2.5 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition"
                        placeholder={t("auth.placeholders.confirm_password")}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center text-slate-600 hover:text-slate-800 px-3"
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={18} strokeWidth={2} />
                        ) : (
                          <Eye size={18} strokeWidth={2} />
                        )}
                      </button>
                    </div>

                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="mt-1 text-xs text-red-600"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-sky-500 to-emerald-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-sky-200 hover:from-sky-600 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-400 disabled:opacity-60 disabled:cursor-not-allowed transition"
                >
                  {isSubmitting
                    ? t("auth.submitting")
                    : t("auth.register_button")}
                </button>
              </Form>
            )}
          </Formik>
        ) : (
          // LOGIN FORM
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginValidationSchema}
            onSubmit={handleLogin}
          >
            {({ isSubmitting }) => (
              <Form className="grid grid-cols-1 gap-4 sm:gap-5">
                <div>
                  <label
                    className="block text-xs font-semibold text-slate-600 mb-1.5"
                    htmlFor="loginEmail"
                  >
                    {t("auth.fields.email")}
                  </label>
                  <Field
                    id="loginEmail"
                    name="email"
                    type="email"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition"
                    placeholder={t("auth.placeholders.email")}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="mt-1 text-xs text-red-600"
                  />
                </div>

                <div>
                  <label
                    className="block text-xs font-semibold text-slate-600 mb-1.5"
                    htmlFor="loginPassword"
                  >
                    {t("auth.fields.password")}
                  </label>

                  <div className="relative">
                    <Field
                      id="loginPassword"
                      name="password"
                      type={showLoginPassword ? "text" : "password"}
                      className="w-full rounded-lg border border-slate-200 px-3 pr-16 py-2.5 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition"
                      placeholder={t("auth.placeholders.password")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword((prev) => !prev)}
                      className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center text-slate-600 hover:text-slate-800 px-3"
                    >
                      {showLoginPassword ? (
                        <EyeOff size={18} strokeWidth={2} />
                      ) : (
                        <Eye size={18} strokeWidth={2} />
                      )}
                    </button>
                  </div>

                  <ErrorMessage
                    name="password"
                    component="div"
                    className="mt-1 text-xs text-red-600"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-sky-500 to-emerald-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-sky-200 hover:from-sky-600 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-400 disabled:opacity-60 disabled:cursor-not-allowed transition"
                >
                  {isSubmitting ? t("auth.logging_in") : t("auth.login_button")}
                </button>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default AuthTravel;
