// Тип пользователя, который мы ожидаем в localStorage
export type AccountUser = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password?: string;
};

// Мок-данные для поездок (My Trips)
export type Trip = {
  id: number;
  destination: string;
  dates: string;
  status: "Booked" | "Completed" | "Cancelled";
};

// Тип для newsletter-подписок
export type NewsletterPrefs = {
  deals: boolean;
  flights: boolean;
  hotels: boolean;
};

export type TabKey = "overview" | "trips" | "security" | "settings";