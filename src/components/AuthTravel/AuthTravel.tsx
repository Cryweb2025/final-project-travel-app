import React from "react";
import type {
  RegisterFormValues,
  LoginFormValues,
  StoredUser,
} from "../../types/auth";

import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from "formik";
import * as Yup from "yup";
import { Eye, EyeOff } from "lucide-react";

const USERS_KEY = "travel_users";

const registerValidationSchema = Yup.object({
  firstName: Yup.string().min(2, "Minimum 2 characters").required("Required"),
  lastName: Yup.string().min(2, "Minimum 2 characters").required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phone: Yup.string().min(5, "Too short").required("Required"),
  password: Yup.string().min(6, "Minimum 6 characters").required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Required"),
});

const loginValidationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

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

const AuthTravel: React.FC = () => {
  const [mode, setMode] = React.useState<"register" | "login">("register");
  const [message, setMessage] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const [showLoginPassword, setShowLoginPassword] = React.useState(false);

  const handleRegister = async (
    values: RegisterFormValues,
    { setSubmitting, resetForm }: FormikHelpers<RegisterFormValues>
  ) => {
    setMessage(null);
    setError(null);

    const users = getUsersFromStorage();
    const exists = users.find((u) => u.email === values.email);

    if (exists) {
      setError("User with this email already exists.");
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

    setMessage("Registration successful! You can now log in.");
    resetForm();
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
      setError("Invalid email or password.");
      setSubmitting(false);
      return;
    }

    localStorage.setItem("logged_user", JSON.stringify(user));

    setSubmitting(false);
    window.location.href = "/account";
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 bg-white">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl border border-sky-100 p-6 sm:p-8">
        {/* Header + mode switch */}
        <div className="mb-6 text-center">
          <p className="text-[10px] uppercase tracking-[0.25em] text-sky-500 font-semibold">
            Travel Agency
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-slate-900">
            {mode === "register" ? "Client Registration" : "Client Login"}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {mode === "register"
              ? "Create a test profile stored in your browser."
              : "Log in using a previously registered test account."}
          </p>

          <div className="mt-4 inline-flex items-center gap-2 text-xs text-slate-500">
            <button
              type="button"
              onClick={() => setMode("register")}
              className={`px-3 py-1 rounded-full border text-xs ${
                mode === "register"
                  ? "bg-sky-500 text-white border-sky-500"
                  : "border-slate-200 hover:border-sky-400"
              }`}
            >
              Register
            </button>
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`px-3 py-1 rounded-full border text-xs ${
                mode === "login"
                  ? "bg-sky-500 text-white border-sky-500"
                  : "border-slate-200 hover:border-sky-400"
              }`}
            >
              Login
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
                      First Name
                    </label>
                    <Field
                      id="firstName"
                      name="firstName"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition"
                      placeholder="John"
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
                      Last Name
                    </label>
                    <Field
                      id="lastName"
                      name="lastName"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition"
                      placeholder="Smith"
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
                    Email Address
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition"
                    placeholder="example@mail.com"
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
                    Phone Number
                  </label>
                  <Field
                    id="phone"
                    name="phone"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition"
                    placeholder="+49 156 123 4567"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="mt-1 text-xs text-red-600"
                  />
                </div>

                {/* Password + Confirm */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-xs font-semibold text-slate-600 mb-1.5"
                      htmlFor="password"
                    >
                      Password
                    </label>

                    <div className="relative">
                      <Field
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        className="w-full rounded-lg border border-slate-200 px-3 pr-16 py-2.5 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition"
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

                    <ErrorMessage
                      name="password"
                      component="div"
                      className="mt-1 text-xs text-red-600"
                    />
                  </div>

                  <div>
                    <label
                      className="block text-xs font-semibold text-slate-600 mb-1.5"
                      htmlFor="confirmPassword"
                    >
                      Confirm Password
                    </label>

                    <div className="relative">
                      <Field
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        className="w-full rounded-lg border border-slate-200 px-3 pr-16 py-2.5 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition"
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
                  {isSubmitting ? "Submitting..." : "Register"}
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
                    Email Address
                  </label>
                  <Field
                    id="loginEmail"
                    name="email"
                    type="email"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition"
                    placeholder="example@mail.com"
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
                    Password
                  </label>

                  <div className="relative">
                    <Field
                      id="loginPassword"
                      name="password"
                      type={showLoginPassword ? "text" : "password"}
                      className="w-full rounded-lg border border-slate-200 px-3 pr-16 py-2.5 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition"
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
                  {isSubmitting ? "Logging in..." : "Login"}
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
