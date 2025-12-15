import { useState, type FormEvent, type ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

// Картинке для формы
import headerImage from "../../assets/images/contact.jpg";

/*
  Типы данных формы
*/
interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const ContactForm: React.FC = () => {
  const { t } = useTranslation();

  /* --------------------------------------------------
     Состояние формы
  -------------------------------------------------- */
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  /* --------------------------------------------------
     Валидация формы
  -------------------------------------------------- */
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t("contact_form.errors.name_required");
    }

    if (!formData.email.trim()) {
      newErrors.email = t("contact_form.errors.email_required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("contact_form.errors.email_invalid");
    }

    if (!formData.message.trim()) {
      newErrors.message = t("contact_form.errors.message_required");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* --------------------------------------------------
     Обработчик изменения полей
  -------------------------------------------------- */
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Очистка ошибки при вводе
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  /* --------------------------------------------------
     Отправка формы (демо)
  -------------------------------------------------- */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // имитация отправки
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Contact form data:", formData);

      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      setTimeout(() => setSubmitSuccess(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8">
      {/* ======================================================
         Контейнер формы
      ====================================================== */}
      <div
        className="
          overflow-hidden
          bg-white dark:bg-slate-900
          border border-slate-100 dark:border-slate-800
          rounded-2xl
          shadow-xl
        "
      >
        {/* ✅ Картинка над формой */}
        <div className="relative h-40 sm:h-52">
          <img
            src={headerImage}
            alt="Contact header"
            className="w-full h-full object-cover"
            draggable={false}
          />
          {/* затемнение + мягкий градиент */}
          <div className="absolute inset-0 bg-black/25 dark:bg-black/45" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/35 to-transparent" />
        </div>

        {/* Внутренние отступы карточки */}
        <div className="p-6 sm:p-8">
          {/* Заголовок */}
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              {t("contact_form.title")}
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {t("contact_form.subtitle")}
            </p>
          </div>

          {/* Успешная отправка */}
          {submitSuccess && (
            <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 dark:bg-emerald-900/20 px-4 py-2 text-sm text-emerald-700 dark:text-emerald-400">
              {t("contact_form.success")}
            </div>
          )}

          {/* ======================================================
             Форма
          ====================================================== */}
          <form onSubmit={handleSubmit} className="grid gap-4">
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                {t("contact_form.fields.name")} *
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t("contact_form.placeholders.name")}
                className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition
                  ${
                    errors.name
                      ? "border-red-400 focus:ring-red-200"
                      : "border-slate-200 dark:border-slate-700 focus:border-sky-400 focus:ring-sky-100"
                  }
                  bg-white dark:bg-slate-800
                  text-slate-900 dark:text-white
                `}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                {t("contact_form.fields.email")} *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t("contact_form.placeholders.email")}
                className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition
                  ${
                    errors.email
                      ? "border-red-400 focus:ring-red-200"
                      : "border-slate-200 dark:border-slate-700 focus:border-sky-400 focus:ring-sky-100"
                  }
                  bg-white dark:bg-slate-800
                  text-slate-900 dark:text-white
                `}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                {t("contact_form.fields.phone")}
              </label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder={t("contact_form.placeholders.phone")}
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2.5 text-sm text-slate-900 dark:text-white outline-none focus:border-sky-400 focus:ring-sky-100 transition"
              />
            </div>

            {/* Subject */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                {t("contact_form.fields.subject")}
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2.5 text-sm text-slate-900 dark:text-white outline-none focus:border-sky-400 focus:ring-sky-100 transition"
              >
                <option value="">
                  {t("contact_form.subjects.placeholder")}
                </option>
                <option value="booking">
                  {t("contact_form.subjects.booking")}
                </option>
                <option value="info">{t("contact_form.subjects.info")}</option>
                <option value="support">
                  {t("contact_form.subjects.support")}
                </option>
                <option value="partnership">
                  {t("contact_form.subjects.partnership")}
                </option>
                <option value="other">
                  {t("contact_form.subjects.other")}
                </option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                {t("contact_form.fields.message")} *
              </label>
              <textarea
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder={t("contact_form.placeholders.message")}
                className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition
                  ${
                    errors.message
                      ? "border-red-400 focus:ring-red-200"
                      : "border-slate-200 dark:border-slate-700 focus:border-sky-400 focus:ring-sky-100"
                  }
                  bg-white dark:bg-slate-800
                  text-slate-900 dark:text-white
                `}
              />
              {errors.message && (
                <p className="mt-1 text-xs text-red-600">{errors.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="
                mt-2
                inline-flex items-center justify-center
                rounded-lg
                bg-gradient-to-r from-sky-500 to-emerald-500
                px-4 py-2.5
                text-sm font-semibold text-white
                shadow-md
                hover:from-sky-600 hover:to-emerald-600
                disabled:opacity-60 disabled:cursor-not-allowed
                transition
              "
            >
              {isSubmitting
                ? t("contact_form.sending")
                : t("contact_form.submit")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
