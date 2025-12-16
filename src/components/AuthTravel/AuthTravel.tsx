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

/** Берёт пользователей из localStorage (если JSON битый — возвращает пустой список). */
const getUsersFromStorage = (): StoredUser[] => {
  const raw = localStorage.getItem(USERS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as StoredUser[];
  } catch {
    return [];
  }
};

/** Сохраняет массив пользователей в localStorage. */
const saveUsersToStorage = (users: StoredUser[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

/** Считает “силу” пароля для подсказки пользователю (не как реальная безопасность). */
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

  // Компонент хранит режим формы: регистрация или логин.
  const [mode, setMode] = React.useState<"register" | "login">("register");

  // Компонент хранит пользовательские сообщения об успехе/ошибке.
  const [message, setMessage] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  // Компонент управляет видимостью полей пароля.
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [showLoginPassword, setShowLoginPassword] = React.useState(false);

  // Компонент хранит текущее состояние “силы” пароля для регистрации.
  const [passwordStrength, setPasswordStrength] = React.useState<
    "weak" | "medium" | "strong" | null
  >(null);

  /**
   * Компонент поддерживает смену темы через Tailwind `dark:` классы.
   */

  // Компонент создаёт Yup-схему с локализованными ошибками.
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

  // Компонент создаёт Yup-схему для логина с локализованными ошибками.
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

  // Компонент обрабатывает регистрацию: проверяет email и сохраняет пользователя в localStorage.
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

  // Компонент обрабатывает логин: валидирует пару email+password по localStorage и логинит в Redux.
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
    <div className="w-full flex items-center mt-20 justify-center px-4 py-8 bg-transparent">
      {/* Карточка формы поддерживает светлую/тёмную тему */}
      <div
        className="w-full max-w-xl rounded-2xl border p-6 sm:p-8 shadow-xl
                      bg-white border-sky-100
                      dark:bg-slate-900 dark:border-slate-800 dark:shadow-black/30"
      >
        {/*  Hero image над формой */}
        <div className="-mx-6 -mt-6 sm:-mx-8 sm:-mt-8 mb-6">
          <div
            className="
      relative h-40 sm:h-44 w-full overflow-hidden
      rounded-t-2xl
    "
          >
            <img
              src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80"
              alt="Travel"
              className="h-full w-full object-cover"
              draggable={false}
            />

            {/* затемнение */}
            <div className="absolute inset-0 bg-black/35 dark:bg-black/55" />

            {/* легкий градиент вниз (чтобы красиво сливалось с карточкой) */}
            <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white/90 to-transparent dark:from-slate-900/95" />
          </div>
        </div>

        {/* Header + mode switch */}
        <div className="mb-6 text-center">
          <p
            className="text-[10px] uppercase tracking-[0.25em] font-semibold
                        text-sky-500 dark:text-sky-400"
          >
            {t("auth.brand")}
          </p>

          <h2
            className="text-2xl sm:text-3xl font-bold mt-2
                         text-slate-900 dark:text-white"
          >
            {mode === "register"
              ? t("auth.title_register")
              : t("auth.title_login")}
          </h2>

          <p className="text-sm mt-1 text-slate-500 dark:text-slate-400">
            {mode === "register"
              ? t("auth.subtitle_register")
              : t("auth.subtitle_login")}
          </p>

          <div className="mt-4 inline-flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <button
              type="button"
              onClick={() => {
                setMode("register");
                setPasswordStrength(null);
              }}
              className={`px-3 py-1 rounded-full border text-xs transition
                ${
                  mode === "register"
                    ? "bg-sky-500 text-white border-sky-500"
                    : "border-slate-200 hover:border-sky-400 dark:border-slate-700 dark:hover:border-sky-500"
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
              className={`px-3 py-1 rounded-full border text-xs transition
                ${
                  mode === "login"
                    ? "bg-sky-500 text-white border-sky-500"
                    : "border-slate-200 hover:border-sky-400 dark:border-slate-700 dark:hover:border-sky-500"
                }`}
            >
              {t("auth.switch_login")}
            </button>
          </div>
        </div>

        {error && (
          <div
            className="mb-4 rounded-lg border px-3 py-2 text-sm
                          border-red-200 bg-red-50 text-red-700
                          dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200"
          >
            {error}
          </div>
        )}

        {message && (
          <div
            className="mb-4 rounded-lg border px-3 py-2 text-sm
                          border-emerald-200 bg-emerald-50 text-emerald-700
                          dark:border-emerald-900/60 dark:bg-emerald-950/35 dark:text-emerald-200"
          >
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
                      className="block text-xs font-semibold mb-1.5
                                 text-slate-600 dark:text-slate-300"
                      htmlFor="firstName"
                    >
                      {t("auth.fields.first_name")}
                    </label>
                    <Field
                      id="firstName"
                      name="firstName"
                      className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition
                                 border-slate-200 bg-white text-slate-900
                                 focus:border-sky-400 focus:ring-2 focus:ring-sky-100
                                 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100
                                 dark:focus:border-sky-500 dark:focus:ring-sky-900/40"
                      placeholder={t("auth.placeholders.first_name")}
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="mt-1 text-xs text-red-600 dark:text-red-300"
                    />
                  </div>

                  <div>
                    <label
                      className="block text-xs font-semibold mb-1.5
                                 text-slate-600 dark:text-slate-300"
                      htmlFor="lastName"
                    >
                      {t("auth.fields.last_name")}
                    </label>
                    <Field
                      id="lastName"
                      name="lastName"
                      className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition
                                 border-slate-200 bg-white text-slate-900
                                 focus:border-sky-400 focus:ring-2 focus:ring-sky-100
                                 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100
                                 dark:focus:border-sky-500 dark:focus:ring-sky-900/40"
                      placeholder={t("auth.placeholders.last_name")}
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="mt-1 text-xs text-red-600 dark:text-red-300"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    className="block text-xs font-semibold mb-1.5
                               text-slate-600 dark:text-slate-300"
                    htmlFor="email"
                  >
                    {t("auth.fields.email")}
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition
                               border-slate-200 bg-white text-slate-900
                               focus:border-sky-400 focus:ring-2 focus:ring-sky-100
                               dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100
                               dark:focus:border-sky-500 dark:focus:ring-sky-900/40"
                    placeholder={t("auth.placeholders.email")}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="mt-1 text-xs text-red-600 dark:text-red-300"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    className="block text-xs font-semibold mb-1.5
                               text-slate-600 dark:text-slate-300"
                    htmlFor="phone"
                  >
                    {t("auth.fields.phone")}
                  </label>
                  <Field
                    id="phone"
                    name="phone"
                    className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition
                               border-slate-200 bg-white text-slate-900
                               focus:border-sky-400 focus:ring-2 focus:ring-sky-100
                               dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100
                               dark:focus:border-sky-500 dark:focus:ring-sky-900/40"
                    placeholder={t("auth.placeholders.phone")}
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="mt-1 text-xs text-red-600 dark:text-red-300"
                  />
                </div>

                {/* Password + Confirm */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Password with strength indicator */}
                  <div>
                    <label
                      className="block text-xs font-semibold mb-1.5
                                 text-slate-600 dark:text-slate-300"
                      htmlFor="password"
                    >
                      {t("auth.fields.password")}
                    </label>

                    <Field name="password">
                      {({ field }: { field: { name: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; onBlur: (e: React.FocusEvent<HTMLInputElement>) => void } }) => (
                        <div className="relative">
                          <input
                            {...field}
                            id="password"
                            type={showPassword ? "text" : "password"}
                            className="w-full rounded-lg border px-3 pr-16 py-2.5 text-sm outline-none transition
                                       border-slate-200 bg-white text-slate-900
                                       focus:border-sky-400 focus:ring-2 focus:ring-sky-100
                                       dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100
                                       dark:focus:border-sky-500 dark:focus:ring-sky-900/40"
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
                            className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center
                                       px-3 transition
                                       text-slate-600 hover:text-slate-800
                                       dark:text-slate-300 dark:hover:text-white"
                            aria-label={
                              showPassword
                                ? t("auth.a11y.hide_password")
                                : t("auth.a11y.show_password")
                            }
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
                      className="mt-1 text-xs text-red-600 dark:text-red-300"
                    />

                    {passwordStrength && (
                      <div className="mt-1 text-xs font-semibold">
                        {passwordStrength === "weak" && (
                          <span className="text-red-600 dark:text-red-300">
                            {t("auth.password_strength.weak")}
                          </span>
                        )}
                        {passwordStrength === "medium" && (
                          <span className="text-yellow-600 dark:text-yellow-300">
                            {t("auth.password_strength.medium")}
                          </span>
                        )}
                        {passwordStrength === "strong" && (
                          <span className="text-emerald-600 dark:text-emerald-300">
                            {t("auth.password_strength.strong")}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label
                      className="block text-xs font-semibold mb-1.5
                                 text-slate-600 dark:text-slate-300"
                      htmlFor="confirmPassword"
                    >
                      {t("auth.fields.confirm_password")}
                    </label>

                    <div className="relative">
                      <Field
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        className="w-full rounded-lg border px-3 pr-16 py-2.5 text-sm outline-none transition
                                   border-slate-200 bg-white text-slate-900
                                   focus:border-sky-400 focus:ring-2 focus:ring-sky-100
                                   dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100
                                   dark:focus:border-sky-500 dark:focus:ring-sky-900/40"
                        placeholder={t("auth.placeholders.confirm_password")}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center
                                   px-3 transition
                                   text-slate-600 hover:text-slate-800
                                   dark:text-slate-300 dark:hover:text-white"
                        aria-label={
                          showConfirmPassword
                            ? t("auth.a11y.hide_password")
                            : t("auth.a11y.show_password")
                        }
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
                      className="mt-1 text-xs text-red-600 dark:text-red-300"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition
                             bg-gradient-to-r from-sky-500 to-emerald-500
                             shadow-md shadow-sky-200 hover:from-sky-600 hover:to-emerald-600
                             focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-400
                             disabled:opacity-60 disabled:cursor-not-allowed
                             dark:shadow-black/20 dark:focus:ring-offset-slate-900"
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
                    className="block text-xs font-semibold mb-1.5
                               text-slate-600 dark:text-slate-300"
                    htmlFor="loginEmail"
                  >
                    {t("auth.fields.email")}
                  </label>
                  <Field
                    id="loginEmail"
                    name="email"
                    type="email"
                    className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition
                               border-slate-200 bg-white text-slate-900
                               focus:border-sky-400 focus:ring-2 focus:ring-sky-100
                               dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100
                               dark:focus:border-sky-500 dark:focus:ring-sky-900/40"
                    placeholder={t("auth.placeholders.email")}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="mt-1 text-xs text-red-600 dark:text-red-300"
                  />
                </div>

                <div>
                  <label
                    className="block text-xs font-semibold mb-1.5
                               text-slate-600 dark:text-slate-300"
                    htmlFor="loginPassword"
                  >
                    {t("auth.fields.password")}
                  </label>

                  <div className="relative">
                    <Field
                      id="loginPassword"
                      name="password"
                      type={showLoginPassword ? "text" : "password"}
                      className="w-full rounded-lg border px-3 pr-16 py-2.5 text-sm outline-none transition
                                 border-slate-200 bg-white text-slate-900
                                 focus:border-sky-400 focus:ring-2 focus:ring-sky-100
                                 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100
                                 dark:focus:border-sky-500 dark:focus:ring-sky-900/40"
                      placeholder={t("auth.placeholders.password")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword((prev) => !prev)}
                      className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center
                                 px-3 transition
                                 text-slate-600 hover:text-slate-800
                                 dark:text-slate-300 dark:hover:text-white"
                      aria-label={
                        showLoginPassword
                          ? t("auth.a11y.hide_password")
                          : t("auth.a11y.show_password")
                      }
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
                    className="mt-1 text-xs text-red-600 dark:text-red-300"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition
                             bg-gradient-to-r from-sky-500 to-emerald-500
                             shadow-md shadow-sky-200 hover:from-sky-600 hover:to-emerald-600
                             focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-400
                             disabled:opacity-60 disabled:cursor-not-allowed
                             dark:shadow-black/20 dark:focus:ring-offset-slate-900"
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
