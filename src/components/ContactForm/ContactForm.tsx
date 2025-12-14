import { useState, type FormEvent, type ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import "./ContactForm.css";

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

const ContactForm = () => {
  const { t } = useTranslation();

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

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Очищаем ошибку при изменении поля
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Имитация отправки формы
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Данные формы:", formData);
      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      // Скрыть сообщение об успехе через 5 секунд
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error("Ошибка отправки формы:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-form-container">
      <h2 className="contact-form-title">{t("contact_form.title")}</h2>
      <p className="contact-form-subtitle">{t("contact_form.subtitle")}</p>

      {submitSuccess && (
        <div className="success-message">{t("contact_form.success")}</div>
      )}

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">{t("contact_form.fields.name")} *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={t("contact_form.placeholders.name")}
            className={errors.name ? "error" : ""}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">{t("contact_form.fields.email")} *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t("contact_form.placeholders.email")}
            className={errors.email ? "error" : ""}
          />
          {errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="phone">{t("contact_form.fields.phone")}</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder={t("contact_form.placeholders.phone")}
          />
        </div>

        <div className="form-group">
          <label htmlFor="subject">{t("contact_form.fields.subject")}</label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
          >
            <option value="">{t("contact_form.subjects.placeholder")}</option>
            <option value="booking">{t("contact_form.subjects.booking")}</option>
            <option value="info">{t("contact_form.subjects.info")}</option>
            <option value="support">{t("contact_form.subjects.support")}</option>
            <option value="partnership">
              {t("contact_form.subjects.partnership")}
            </option>
            <option value="other">{t("contact_form.subjects.other")}</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="message">{t("contact_form.fields.message")} *</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder={t("contact_form.placeholders.message")}
            rows={5}
            className={errors.message ? "error" : ""}
          />
          {errors.message && (
            <span className="error-message">{errors.message}</span>
          )}
        </div>

        <button type="submit" className="submit-button" disabled={isSubmitting}>
          {isSubmitting
            ? t("contact_form.sending")
            : t("contact_form.submit")}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
