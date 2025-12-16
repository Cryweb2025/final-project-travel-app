import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../slices/authSlice";
import type {
  AccountUser,
  Trip,
  NewsletterPrefs,
  TabKey,
} from "../services/types/account";

// Компонент использует тот же ключ, что и AuthTravel, чтобы работать с общей базой пользователей в localStorage.
const USERS_KEY = "travel_users";


// Компонент использует мок-данные поездок для демо-отображения.
const mockTrips: Trip[] = [
  {
    id: 1,
    destination: "Barcelona, Spain",
    dates: "12–18 April 2026",
    status: "Booked",
  },
  {
    id: 2,
    destination: "Rome, Italy",
    dates: "03–07 January 2026",
    status: "Completed",
  },
  {
    id: 3,
    destination: "Athens, Greece",
    dates: "21–28 August 2025",
    status: "Completed",
  },
];

// Компонент вычисляет уровень (tier) по количеству поездок (упрощённая логика).
const getTierFromTrips = (tripCount: number): "Bronze" | "Silver" | "Gold" => {
  if (tripCount >= 5) return "Gold";
  if (tripCount >= 2) return "Silver";
  return "Bronze";
};

const Account: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Компонент хранит данные текущего пользователя.
  const [user, setUser] = React.useState<AccountUser | null>(null);

  // Компонент использует флаг готовности, чтобы корректно отрисовать состояния загрузки/доступа.
  const [isReady, setIsReady] = React.useState(false);

  // Компонент хранит активную вкладку.
  const [activeTab, setActiveTab] = React.useState<TabKey>("overview");

  // Компонент хранит состояние режима редактирования профиля и значения редактируемых полей.
  const [isEditingProfile, setIsEditingProfile] = React.useState(false);
  const [editFirstName, setEditFirstName] = React.useState("");
  const [editLastName, setEditLastName] = React.useState("");
  const [editPhone, setEditPhone] = React.useState("");
  const [editEmail, setEditEmail] = React.useState("");

  // Компонент хранит настройки рассылки (newsletter).
  const [newsletter, setNewsletter] = React.useState<NewsletterPrefs>({
    deals: true,
    flights: false,
    hotels: false,
  });

  // Компонент хранит состояние секции Security (смена пароля).
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmNewPassword, setConfirmNewPassword] = React.useState("");
  const [securityMessage, setSecurityMessage] = React.useState<string | null>(
    null
  );
  const [securityError, setSecurityError] = React.useState<string | null>(null);

  // Компонент формирует простую статистику (на основе mockTrips).
  const tripCount = mockTrips.length;
  const completedTrips = mockTrips.filter(
    (t) => t.status === "Completed"
  ).length;
  const tier = getTierFromTrips(tripCount);
  const rewardPoints = tripCount * 500 + 200;

  /**
   * Компонент поддерживает смену темы через Tailwind `dark:` классы.
   * Важно: для `dark:` нужен включённый darkMode (class или media) в tailwind.config.
   */

  // Компонент инициализируется: читает logged_user и newsletter prefs из localStorage.
  React.useEffect(() => {
    try {
      const rawUser = localStorage.getItem("logged_user");
      if (rawUser) {
        const parsedUser = JSON.parse(rawUser) as AccountUser;
        setUser(parsedUser);

        // Компонент синхронизирует поля формы редактирования с текущим пользователем.
        setEditFirstName(parsedUser.firstName);
        setEditLastName(parsedUser.lastName);
        setEditPhone(parsedUser.phone);
        setEditEmail(parsedUser.email);

        // Компонент загружает настройки newsletter по email пользователя.
        const prefsRaw = localStorage.getItem(
          `travel_newsletter_${parsedUser.email}`
        );
        if (prefsRaw) {
          const parsedPrefs = JSON.parse(prefsRaw) as NewsletterPrefs;
          setNewsletter(parsedPrefs);
        }
      } else {
        setUser(null);
      }
    } catch (e) {
      console.error("Failed to parse logged_user", e);
      setUser(null);
    } finally {
      setIsReady(true);
    }
  }, []);

  // Компонент сохраняет newsletter prefs в localStorage под ключом email.
  const saveNewsletterPrefs = (prefs: NewsletterPrefs, email: string) => {
    localStorage.setItem(`travel_newsletter_${email}`, JSON.stringify(prefs));
  };

  // Компонент выполняет logout: очищает localStorage, Redux state и делает SPA-редирект.
  const handleLogout = () => {
    localStorage.removeItem("logged_user");
    dispatch(logout());
    setUser(null);
    navigate("/", { replace: true });
  };

  // Компонент сохраняет изменения профиля и обновляет запись в общем списке пользователей.
  const handleProfileSave = () => {
    if (!user) return;

    const updatedUser: AccountUser = {
      ...user,
      firstName: editFirstName.trim(),
      lastName: editLastName.trim(),
      phone: editPhone.trim(),
      email: editEmail.trim(),
    };

    // Компонент обновляет logged_user.
    localStorage.setItem("logged_user", JSON.stringify(updatedUser));

    // Компонент обновляет пользователя в массиве USERS_KEY.
    try {
      const rawUsers = localStorage.getItem(USERS_KEY);
      if (rawUsers) {
        const users = JSON.parse(rawUsers) as AccountUser[];
        const updatedUsers = users.map((u) =>
          u.email === user.email ? { ...u, ...updatedUser } : u
        );
        localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
      }
    } catch (e) {
      console.error("Failed to update users list", e);
    }

    setUser(updatedUser);
    setIsEditingProfile(false);
  };

  // Компонент переключает чекбокс newsletter и сразу сохраняет изменения.
  const handleNewsletterChange = (key: keyof NewsletterPrefs) => {
    if (!user) return;
    const updated = { ...newsletter, [key]: !newsletter[key] };
    setNewsletter(updated);
    saveNewsletterPrefs(updated, user.email);
  };

  // Компонент выполняет смену пароля (валидация + обновление в localStorage).
  const handleChangePassword = () => {
    if (!user) return;

    setSecurityMessage(null);
    setSecurityError(null);

    if (!user.password) {
      setSecurityError(t("account.security.errors.not_available"));
      return;
    }

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setSecurityError(t("account.security.errors.fill_all"));
      return;
    }

    if (currentPassword !== user.password) {
      setSecurityError(t("account.security.errors.current_incorrect"));
      return;
    }

    if (newPassword.length < 6) {
      setSecurityError(t("account.security.errors.new_min6"));
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setSecurityError(t("account.security.errors.new_no_match"));
      return;
    }

    // Компонент обновляет пароль в logged_user.
    const updatedUser: AccountUser = { ...user, password: newPassword };
    localStorage.setItem("logged_user", JSON.stringify(updatedUser));

    // Компонент обновляет пароль в общем списке пользователей.
    try {
      const rawUsers = localStorage.getItem(USERS_KEY);
      if (rawUsers) {
        const users = JSON.parse(rawUsers) as AccountUser[];
        const updatedUsers = users.map((u) =>
          u.email === user.email ? { ...u, password: newPassword } : u
        );
        localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
      }
    } catch (e) {
      console.error("Failed to update password in users list", e);
    }

    setUser(updatedUser);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setSecurityMessage(t("account.security.success"));
  };

  // Компонент удаляет аккаунт из USERS_KEY, очищает сессию и делает редирект.
  const handleDeleteAccount = () => {
    if (!user) return;

    const confirmDelete = window.confirm(t("account.delete.confirm"));
    if (!confirmDelete) return;

    // Компонент удаляет пользователя из общего списка.
    try {
      const rawUsers = localStorage.getItem(USERS_KEY);
      if (rawUsers) {
        const users = JSON.parse(rawUsers) as AccountUser[];
        const filtered = users.filter((u) => u.email !== user.email);
        localStorage.setItem(USERS_KEY, JSON.stringify(filtered));
      }
    } catch (e) {
      console.error("Failed to delete user from users list", e);
    }

    // Компонент удаляет текущую сессию и prefs.
    localStorage.removeItem("logged_user");
    localStorage.removeItem(`travel_newsletter_${user.email}`);

    dispatch(logout());
    setUser(null);
    navigate("/", { replace: true });
  };

  // Компонент показывает экран загрузки, пока идёт чтение localStorage.
  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {t("account.loading")}
        </p>
      </div>
    );
  }

  // Компонент запрещает доступ, если пользователь не залогинен.
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <p className="text-xl text-red-500 dark:text-red-300 font-semibold">
          {t("account.access_denied")}
        </p>
      </div>
    );
  }

  // Компонент строит инициалы из имени пользователя для аватарки.
  const initials =
    (user.firstName?.[0] || "").toUpperCase() +
    (user.lastName?.[0] || "").toUpperCase();

  return (
    <div className="w-full flex items-center mt-20 justify-center px-4 py-8 bg-transparent">
      {/* Контейнер аккаунта поддерживает светлую/тёмную тему */}
      <div
        className="w-full max-w-4xl rounded-2xl border p-6 sm:p-8 shadow-xl
                   bg-white border-sky-50
                   dark:bg-slate-900 dark:border-slate-800 dark:shadow-black/30"
      >
        {/*  Hero image над аккаунтом */}
        <div className="-mx-6 -mt-6 sm:-mx-8 sm:-mt-8 mb-6">
          <div className="relative h-40 sm:h-44 w-full overflow-hidden rounded-t-2xl">
            <img
              src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80"
              alt="Travel"
              className="h-full w-full object-cover"
              draggable={false}
            />

            {/* затемнение */}
            <div className="absolute inset-0 bg-black/35 dark:bg-black/55" />

            {/* плавный переход к карточке */}
            <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white/90 to-transparent dark:from-slate-900/95" />
          </div>
        </div>

        {/* Верхняя панель: заголовок + logout */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              {t("account.title")}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {t("account.subtitle")}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center justify-center rounded-lg border px-3 py-1.5 text-xs sm:text-sm font-semibold transition
                       border-red-100 bg-red-50 text-red-600 hover:bg-red-100
                       dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200 dark:hover:bg-red-900/40"
          >
            {t("account.logout")}
          </button>
        </div>

        {/* Основной layout: слева профиль, справа вкладки */}
        <div className="grid grid-cols-1 md:grid-cols-[260px,1fr] gap-6">
          {/* Левая колонка */}
          <div
            className="rounded-xl border p-4
                          border-slate-100 bg-slate-50/40
                          dark:border-slate-800 dark:bg-slate-950/40"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-sky-500 to-emerald-500 flex items-center justify-center text-white text-2xl font-bold shadow-md mb-3">
                {initials || "U"}
              </div>

              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                {user.firstName} {user.lastName}
              </h2>

              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {t("account.travel_client")}
              </p>

              <div className="mt-3 text-xs text-slate-500 dark:text-slate-400 space-y-1">
                <p>
                  <span className="font-semibold text-slate-600 dark:text-slate-300">
                    {t("account.labels.email")}:
                  </span>{" "}
                  <span className="text-slate-700 dark:text-slate-200">
                    {user.email}
                  </span>
                </p>
                <p>
                  <span className="font-semibold text-slate-600 dark:text-slate-300">
                    {t("account.labels.phone")}:
                  </span>{" "}
                  <span className="text-slate-700 dark:text-slate-200">
                    {user.phone}
                  </span>
                </p>
              </div>
            </div>

            {/* Rewards */}
            <div className="mt-5 border-t pt-4 border-slate-100 dark:border-slate-800">
              <p className="text-xs font-semibold uppercase tracking-wide mb-2 text-slate-500 dark:text-slate-400">
                {t("account.rewards.title")}
              </p>

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div
                  className="rounded-lg border py-2 px-1
                                bg-white border-slate-100
                                dark:bg-slate-950 dark:border-slate-800"
                >
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">
                    {t("account.rewards.trips")}
                  </div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">
                    {tripCount}
                  </div>
                </div>

                <div
                  className="rounded-lg border py-2 px-1
                                bg-white border-slate-100
                                dark:bg-slate-950 dark:border-slate-800"
                >
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">
                    {t("account.rewards.completed")}
                  </div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">
                    {completedTrips}
                  </div>
                </div>

                <div
                  className="rounded-lg border py-2 px-1
                                bg-white border-slate-100
                                dark:bg-slate-950 dark:border-slate-800"
                >
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">
                    {t("account.rewards.tier")}
                  </div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">
                    {tier}
                  </div>
                </div>
              </div>

              <div
                className="mt-3 rounded-lg border px-3 py-2 text-xs
                              bg-gradient-to-r from-sky-50 to-emerald-50 border-sky-100
                              dark:from-slate-950 dark:to-slate-950 dark:border-slate-800"
              >
                <p className="text-[10px] uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  {t("account.rewards.points_title")}
                </p>
                <p className="text-base font-semibold text-slate-900 dark:text-white">
                  {rewardPoints.toLocaleString()}{" "}
                  {t("account.rewards.points_suffix")}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {t("account.rewards.points_hint")}
                </p>
              </div>
            </div>
          </div>

          {/* Правая колонка */}
          <div className="flex flex-col">
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 border-b mb-4 pb-2 text-xs sm:text-sm border-slate-100 dark:border-slate-800">
              <button
                className={`px-3 py-1.5 rounded-full border transition ${activeTab === "overview"
                    ? "bg-sky-500 text-white border-sky-500"
                    : "border-slate-200 text-slate-600 hover:border-sky-400 dark:border-slate-700 dark:text-slate-300 dark:hover:border-sky-500"
                  }`}
                onClick={() => setActiveTab("overview")}
              >
                {t("account.tabs.profile")}
              </button>

              <button
                className={`px-3 py-1.5 rounded-full border transition ${activeTab === "trips"
                    ? "bg-sky-500 text-white border-sky-500"
                    : "border-slate-200 text-slate-600 hover:border-sky-400 dark:border-slate-700 dark:text-slate-300 dark:hover:border-sky-500"
                  }`}
                onClick={() => setActiveTab("trips")}
              >
                {t("account.tabs.trips")}
              </button>

              <button
                className={`px-3 py-1.5 rounded-full border transition ${activeTab === "security"
                    ? "bg-sky-500 text-white border-sky-500"
                    : "border-slate-200 text-slate-600 hover:border-sky-400 dark:border-slate-700 dark:text-slate-300 dark:hover:border-sky-500"
                  }`}
                onClick={() => setActiveTab("security")}
              >
                {t("account.tabs.security")}
              </button>

              <button
                className={`px-3 py-1.5 rounded-full border transition ${activeTab === "settings"
                    ? "bg-sky-500 text-white border-sky-500"
                    : "border-slate-200 text-slate-600 hover:border-sky-400 dark:border-slate-700 dark:text-slate-300 dark:hover:border-sky-500"
                  }`}
                onClick={() => setActiveTab("settings")}
              >
                {t("account.tabs.settings")}
              </button>
            </div>

            {/* Content */}
            <div className="flex-1">
              {activeTab === "overview" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
                      {t("account.profile.title")}
                    </h2>
                    {!isEditingProfile ? (
                      <button
                        onClick={() => setIsEditingProfile(true)}
                        className="text-xs font-semibold text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300"
                      >
                        {t("account.profile.edit")}
                      </button>
                    ) : null}
                  </div>

                  {!isEditingProfile ? (
                    <div className="text-sm text-slate-600 dark:text-slate-300 space-y-1">
                      <p>
                        <span className="font-semibold text-slate-700 dark:text-slate-200">
                          {t("account.profile.full_name")}:
                        </span>{" "}
                        {user.firstName} {user.lastName}
                      </p>
                      <p>
                        <span className="font-semibold text-slate-700 dark:text-slate-200">
                          {t("account.labels.email")}:
                        </span>{" "}
                        {user.email}
                      </p>
                      <p>
                        <span className="font-semibold text-slate-700 dark:text-slate-200">
                          {t("account.labels.phone")}:
                        </span>{" "}
                        {user.phone}
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <label
                          className="block text-xs font-semibold mb-1 text-slate-600 dark:text-slate-300"
                          htmlFor="account-first-name"
                        >
                          {t("account.edit.first_name")}
                        </label>
                        <input
                          id="account-first-name"
                          className="w-full rounded-lg border px-3 py-2 text-sm outline-none transition
                                     border-slate-200 bg-white text-slate-900
                                     focus:border-sky-400 focus:ring-2 focus:ring-sky-100
                                     dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100
                                     dark:focus:border-sky-500 dark:focus:ring-sky-900/40"
                          value={editFirstName}
                          onChange={(e) => setEditFirstName(e.target.value)}
                        />
                      </div>

                      <div>
                        <label
                          className="block text-xs font-semibold mb-1 text-slate-600 dark:text-slate-300"
                          htmlFor="account-last-name"
                        >
                          {t("account.edit.last_name")}
                        </label>
                        <input
                          id="account-last-name"
                          className="w-full rounded-lg border px-3 py-2 text-sm outline-none transition
                                     border-slate-200 bg-white text-slate-900
                                     focus:border-sky-400 focus:ring-2 focus:ring-sky-100
                                     dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100
                                     dark:focus:border-sky-500 dark:focus:ring-sky-900/40"
                          value={editLastName}
                          onChange={(e) => setEditLastName(e.target.value)}
                        />
                      </div>

                      <div>
                        <label
                          className="block text-xs font-semibold mb-1 text-slate-600 dark:text-slate-300"
                          htmlFor="account-email"
                        >
                          {t("account.labels.email")}
                        </label>
                        <input
                          id="account-email"
                          className="w-full rounded-lg border px-3 py-2 text-sm outline-none transition
                                     border-slate-200 bg-white text-slate-900
                                     focus:border-sky-400 focus:ring-2 focus:ring-sky-100
                                     dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100
                                     dark:focus:border-sky-500 dark:focus:ring-sky-900/40"
                          value={editEmail}
                          onChange={(e) => setEditEmail(e.target.value)}
                        />
                      </div>

                      <div>
                        <label
                          className="block text-xs font-semibold mb-1 text-slate-600 dark:text-slate-300"
                          htmlFor="account-phone"
                        >
                          {t("account.labels.phone")}
                        </label>
                        <input
                          id="account-phone"
                          className="w-full rounded-lg border px-3 py-2 text-sm outline-none transition
                                     border-slate-200 bg-white text-slate-900
                                     focus:border-sky-400 focus:ring-2 focus:ring-sky-100
                                     dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100
                                     dark:focus:border-sky-500 dark:focus:ring-sky-900/40"
                          value={editPhone}
                          onChange={(e) => setEditPhone(e.target.value)}
                        />
                      </div>

                      <div className="col-span-full flex gap-2 justify-end pt-1">
                        <button
                          type="button"
                          className="px-3 py-1.5 text-xs rounded-lg border transition
                                     border-slate-200 text-slate-600 hover:bg-slate-50
                                     dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800/50"
                          onClick={() => {
                            setEditFirstName(user.firstName);
                            setEditLastName(user.lastName);
                            setEditPhone(user.phone);
                            setEditEmail(user.email);
                            setIsEditingProfile(false);
                          }}
                        >
                          {t("account.edit.cancel")}
                        </button>

                        <button
                          type="button"
                          className="px-3 py-1.5 text-xs rounded-lg bg-sky-500 text-white font-semibold hover:bg-sky-600 transition"
                          onClick={handleProfileSave}
                        >
                          {t("account.edit.save")}
                        </button>
                      </div>
                    </div>
                  )}

                  <div
                    className="mt-4 rounded-lg border px-3 py-2 text-xs
                                  bg-slate-50 border-slate-100 text-slate-500
                                  dark:bg-slate-950/40 dark:border-slate-800 dark:text-slate-400"
                  >
                    {t("account.demo_note")}
                  </div>
                </div>
              )}

              {activeTab === "trips" && (
                <div className="space-y-3">
                  <h2 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white mb-1">
                    {t("account.trips.title")}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                    {t("account.trips.subtitle")}
                  </p>

                  <div className="space-y-2">
                    {mockTrips.map((trip) => (
                      <div
                        key={trip.id}
                        className="flex items-center justify-between rounded-lg border px-3 py-2 text-xs sm:text-sm
                                   border-slate-100 bg-slate-50
                                   dark:border-slate-800 dark:bg-slate-950/40"
                      >
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">
                            {trip.destination}
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            {trip.dates}
                          </p>
                        </div>

                        <span
                          className={`px-2 py-1 rounded-full text-[11px] font-semibold border ${trip.status === "Booked"
                              ? "bg-sky-50 text-sky-700 border-sky-100 dark:bg-sky-950/30 dark:text-sky-200 dark:border-sky-900/50"
                              : trip.status === "Completed"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/25 dark:text-emerald-200 dark:border-emerald-900/50"
                                : "bg-red-50 text-red-600 border-red-100 dark:bg-red-950/25 dark:text-red-200 dark:border-red-900/50"
                            }`}
                        >
                          {trip.status === "Booked"
                            ? t("account.trips.status.booked")
                            : trip.status === "Completed"
                              ? t("account.trips.status.completed")
                              : trip.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "security" && (
                <div className="space-y-4">
                  <div>
                    <h2 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
                      {t("account.security.title")}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {t("account.security.subtitle")}
                    </p>
                  </div>

                  {securityError && (
                    <div
                      className="rounded-lg border px-3 py-2 text-xs
                                    border-red-200 bg-red-50 text-red-700
                                    dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200"
                    >
                      {securityError}
                    </div>
                  )}

                  {securityMessage && (
                    <div
                      className="rounded-lg border px-3 py-2 text-xs
                                    border-emerald-200 bg-emerald-50 text-emerald-700
                                    dark:border-emerald-900/60 dark:bg-emerald-950/35 dark:text-emerald-200"
                    >
                      {securityMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div>
                      <label
                        className="block text-xs font-semibold mb-1 text-slate-600 dark:text-slate-300"
                        htmlFor="account-current-password"
                      >
                        {t("account.security.current_password")}
                      </label>
                      <input
                        id="account-current-password"
                        type="password"
                        className="w-full rounded-lg border px-3 py-2 text-sm outline-none transition
                                   border-slate-200 bg-white text-slate-900
                                   focus:border-sky-400 focus:ring-2 focus:ring-sky-100
                                   dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100
                                   dark:focus:border-sky-500 dark:focus:ring-sky-900/40"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                    </div>

                    <div>
                      <label
                        className="block text-xs font-semibold mb-1 text-slate-600 dark:text-slate-300"
                        htmlFor="account-new-password"
                      >
                        {t("account.security.new_password")}
                      </label>
                      <input
                        id="account-new-password"
                        type="password"
                        className="w-full rounded-lg border px-3 py-2 text-sm outline-none transition
                                   border-slate-200 bg-white text-slate-900
                                   focus:border-sky-400 focus:ring-2 focus:ring-sky-100
                                   dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100
                                   dark:focus:border-sky-500 dark:focus:ring-sky-900/40"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>

                    <div>
                      <label
                        className="block text-xs font-semibold mb-1 text-slate-600 dark:text-slate-300"
                        htmlFor="account-confirm-password"
                      >
                        {t("account.security.confirm_new_password")}
                      </label>
                      <input
                        id="account-confirm-password"
                        type="password"
                        className="w-full rounded-lg border px-3 py-2 text-sm outline-none transition
                                   border-slate-200 bg-white text-slate-900
                                   focus:border-sky-400 focus:ring-2 focus:ring-sky-100
                                   dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100
                                   dark:focus:border-sky-500 dark:focus:ring-sky-900/40"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleChangePassword}
                    className="inline-flex items-center justify-center rounded-lg bg-sky-500 px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-sky-600 transition"
                  >
                    {t("account.security.update_password")}
                  </button>
                </div>
              )}

              {activeTab === "settings" && (
                <div className="space-y-4">
                  <div>
                    <h2 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
                      {t("account.settings.title")}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {t("account.settings.subtitle")}
                    </p>
                  </div>

                  <div
                    className="rounded-lg border px-4 py-3 text-xs sm:text-sm
                                  border-slate-100 bg-slate-50
                                  dark:border-slate-800 dark:bg-slate-950/40"
                  >
                    <p className="font-semibold mb-2 text-slate-800 dark:text-slate-100">
                      {t("account.newsletter.title")}
                    </p>

                    <div className="space-y-2 text-slate-700 dark:text-slate-200">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="rounded border-slate-300 dark:border-slate-600"
                          checked={newsletter.deals}
                          onChange={() => handleNewsletterChange("deals")}
                        />
                        <span>{t("account.newsletter.deals")}</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="rounded border-slate-300 dark:border-slate-600"
                          checked={newsletter.flights}
                          onChange={() => handleNewsletterChange("flights")}
                        />
                        <span>{t("account.newsletter.flights")}</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="rounded border-slate-300 dark:border-slate-600"
                          checked={newsletter.hotels}
                          onChange={() => handleNewsletterChange("hotels")}
                        />
                        <span>{t("account.newsletter.hotels")}</span>
                      </label>
                    </div>
                  </div>

                  <div
                    className="rounded-lg border px-4 py-3 text-xs sm:text-sm
                                  border-red-100 bg-red-50
                                  dark:border-red-900/60 dark:bg-red-950/40"
                  >
                    <p className="font-semibold mb-1 text-red-700 dark:text-red-200">
                      {t("account.delete.title")}
                    </p>
                    <p className="text-xs mb-2 text-slate-600 dark:text-slate-300">
                      {t("account.delete.text")}
                    </p>
                    <button
                      onClick={handleDeleteAccount}
                      className="inline-flex items-center justify-center rounded-lg border px-3 py-1.5 text-xs font-semibold transition
                                 border-red-200 bg-white text-red-600 hover:bg-red-50
                                 dark:border-red-900/60 dark:bg-slate-950 dark:text-red-200 dark:hover:bg-red-900/30"
                    >
                      {t("account.delete.button")}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
