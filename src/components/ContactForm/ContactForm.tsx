import { useState, type FormEvent, type ChangeEvent } from 'react';
import './ContactForm.css';

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
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Имя обязательно для заполнения';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email обязателен для заполнения';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Введите корректный email адрес';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Сообщение обязательно для заполнения';
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

            console.log('Данные формы:', formData);
            setSubmitSuccess(true);
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: '',
            });

            // Скрыть сообщение об успехе через 5 секунд
            setTimeout(() => setSubmitSuccess(false), 5000);
        } catch (error) {
            console.error('Ошибка отправки формы:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="contact-form-container">
            <h2 className="contact-form-title">Свяжитесь с нами</h2>
            <p className="contact-form-subtitle">
                Есть вопросы о путешествиях? Напишите нам, и мы ответим в ближайшее время!
            </p>

            {submitSuccess && (
                <div className="success-message">
                    ✓ Спасибо! Ваше сообщение успешно отправлено. Мы свяжемся с вами в ближайшее время.
                </div>
            )}

            <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Имя *</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Введите ваше имя"
                        className={errors.name ? 'error' : ''}
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="example@email.com"
                        className={errors.email ? 'error' : ''}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Телефон</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+7 (999) 123-45-67"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="subject">Тема обращения</label>
                    <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                    >
                        <option value="">Выберите тему</option>
                        <option value="booking">Бронирование тура</option>
                        <option value="info">Информация о турах</option>
                        <option value="support">Поддержка</option>
                        <option value="partnership">Сотрудничество</option>
                        <option value="other">Другое</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="message">Сообщение *</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Напишите ваше сообщение..."
                        rows={5}
                        className={errors.message ? 'error' : ''}
                    />
                    {errors.message && <span className="error-message">{errors.message}</span>}
                </div>

                <button
                    type="submit"
                    className="submit-button"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Отправка...' : 'Отправить сообщение'}
                </button>
            </form>
        </div>
    );
};

export default ContactForm;
