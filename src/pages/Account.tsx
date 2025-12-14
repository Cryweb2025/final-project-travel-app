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

// ключ такой же, как в AuthTravel
const USERS_KEY = "travel_users";

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

// Очень простая оценка уровня статуса по количеству поездок
const getTierFromTrips = (tripCount: number): "Bronze" | "Silver" | "Gold" => {
  if (tripCount >= 5) return "Gold";
  if (tripCount >= 2) return "Silver";
  return "Bronze";
};

const Account: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = React.useState<AccountUser | null>(null);
  const [isReady, setIsReady] = React.useState(false);

  const [activeTab, setActiveTab] = React.useState<TabKey>("overview");

  // состояние редактирования профиля
  const [isEditingProfile, setIsEditingProfile] = React.useState(false);
  const [editFirstName, setEditFirstName] = React.useState("");
  const [editLastName, setEditLastName] = React.useState("");
  const [editPhone, setEditPhone] = React.useState("");
  const [editEmail, setEditEmail] = React.useState("");

  // newsletter
  const [newsletter, setNewsletter] = React.useState<NewsletterPrefs>({
    deals: true,
    flights: false,
    hotels: false,
  });

  // security – смена пароля
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmNewPassword, setConfirmNewPassword] = React.useState("");
  const [securityMessage, setSecurityMessage] = React.useState<string | null>(
    null
  );
  const [securityError, setSecurityError] = React.useState<string | null>(null);

  // простая статистика
  const tripCount = mockTrips.length;
  const completedTrips = mockTrips.filter(
    (t) => t.status === "Completed"
  ).length;
  const tier = getTierFromTrips(tripCount);
  const rewardPoints = tripCount * 500 + 200;

  // инициализация: читаем пользователя и настройки из localStorage
  React.useEffect(() => {
    try {
      const rawUser = localStorage.getItem("logged_user");
      if (rawUser) {
        const parsedUser = JSON.parse(rawUser) as AccountUser;
        setUser(parsedUser);

        // инициализируем поля редактирования
        setEditFirstName(parsedUser.firstName);
        setEditLastName(parsedUser.lastName);
        setEditPhone(parsedUser.phone);
        setEditEmail(parsedUser.email);

        // newsletter по email
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

  const saveNewsletterPrefs = (prefs: NewsletterPrefs, email: string) => {
    localStorage.setItem(`travel_newsletter_${email}`, JSON.stringify(prefs));
  };

  const handleLogout = () => {
    localStorage.removeItem("logged_user");
    dispatch(logout()); // ✅ сбрасываем Redux user
    setUser(null); // ✅ сбрасываем локальный state
    navigate("/", { replace: true }); // ✅ SPA redirect (без перезагрузки)
  };

  const handleProfileSave = () => {
    if (!user) return;

    const updatedUser: AccountUser = {
      ...user,
      firstName: editFirstName.trim(),
      lastName: editLastName.trim(),
      phone: editPhone.trim(),
      email: editEmail.trim(),
    };

    // обновляем logged_user
    localStorage.setItem("logged_user", JSON.stringify(updatedUser));

    // обновляем в списке всех пользователей
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

  const handleNewsletterChange = (key: keyof NewsletterPrefs) => {
    if (!user) return;
    const updated = { ...newsletter, [key]: !newsletter[key] };
    setNewsletter(updated);
    saveNewsletterPrefs(updated, user.email);
  };

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

    // Обновляем пароль в logged_user
    const updatedUser: AccountUser = { ...user, password: newPassword };
    localStorage.setItem("logged_user", JSON.stringify(updatedUser));

    // Обновляем пароль в общем списке пользователей
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

  const handleDeleteAccount = () => {
    if (!user) return;

    const confirmDelete = window.confirm(t("account.delete.confirm"));
    if (!confirmDelete) return;

    // удалить из общего списка
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

    // удалить logged_user и prefs
    localStorage.removeItem("logged_user");
    localStorage.removeItem(`travel_newsletter_${user.email}`);

    dispatch(logout());
    setUser(null);
    navigate("/", { replace: true });
  };

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-sm text-slate-500">{t("account.loading")}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-xl text-red-500 font-semibold">
          {t("account.access_denied")}
        </p>
      </div>
    );
  }

  const initials =
    (user.firstName?.[0] || "").toUpperCase() +
    (user.lastName?.[0] || "").toUpperCase();

  return (
    <div className="w-full flex items-center mt-20 justify-center px-4 py-8 bg-transparent">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl border border-sky-50 p-6 sm:p-8">
        {/* Верхняя панель: заголовок + logout */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              {t("account.title")}
            </h1>
            <p className="text-sm text-slate-500">{t("account.subtitle")}</p>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center justify-center rounded-lg border border-red-100 bg-red-50 px-3 py-1.5 text-xs sm:text-sm font-semibold text-red-600 hover:bg-red-100 transition"
          >
            {t("account.logout")}
          </button>
        </div>

        {/* Основной layout: слева профиль, справа вкладки */}
        <div className="grid grid-cols-1 md:grid-cols-[260px,1fr] gap-6">
          {/* Левая колонка */}
          <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/40">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-sky-500 to-emerald-500 flex items-center justify-center text-white text-2xl font-bold shadow-md mb-3">
                {initials || "U"}
              </div>
              <h2 className="text-lg font-semibold text-slate-900">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {t("account.travel_client")}
              </p>

              <div className="mt-3 text-xs text-slate-500 space-y-1">
                <p>
                  <span className="font-semibold text-slate-600">
                    {t("account.labels.email")}:
                  </span>{" "}
                  {user.email}
                </p>
                <p>
                  <span className="font-semibold text-slate-600">
                    {t("account.labels.phone")}:
                  </span>{" "}
                  {user.phone}
                </p>
              </div>
            </div>

            {/* Rewards */}
            <div className="mt-5 border-t border-slate-100 pt-4">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                {t("account.rewards.title")}
              </p>

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="rounded-lg bg-white border border-slate-100 py-2 px-1">
                  <div className="text-[10px] text-slate-500">
                    {t("account.rewards.trips")}
                  </div>
                  <div className="text-sm font-semibold text-slate-900">
                    {tripCount}
                  </div>
                </div>
                <div className="rounded-lg bg-white border border-slate-100 py-2 px-1">
                  <div className="text-[10px] text-slate-500">
                    {t("account.rewards.completed")}
                  </div>
                  <div className="text-sm font-semibold text-slate-900">
                    {completedTrips}
                  </div>
                </div>
                <div className="rounded-lg bg-white border border-slate-100 py-2 px-1">
                  <div className="text-[10px] text-slate-500">
                    {t("account.rewards.tier")}
                  </div>
                  <div className="text-sm font-semibold text-slate-900">
                    {tier}
                  </div>
                </div>
              </div>

              <div className="mt-3 rounded-lg bg-gradient-to-r from-sky-50 to-emerald-50 border border-sky-100 px-3 py-2 text-xs">
                <p className="text-[10px] text-slate-500 uppercase tracking-wide">
                  {t("account.rewards.points_title")}
                </p>
                <p className="text-base font-semibold text-slate-900">
                  {rewardPoints.toLocaleString()}{" "}
                  {t("account.rewards.points_suffix")}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {t("account.rewards.points_hint")}
                </p>
              </div>
            </div>
          </div>

          {/* Правая колонка */}
          <div className="flex flex-col">
            <div className="flex flex-wrap gap-2 border-b border-slate-100 mb-4 pb-2 text-xs sm:text-sm">
              <button
                className={`px-3 py-1.5 rounded-full border transition ${
                  activeTab === "overview"
                    ? "bg-sky-500 text-white border-sky-500"
                    : "border-slate-200 text-slate-600 hover:border-sky-400"
                }`}
                onClick={() => setActiveTab("overview")}
              >
                {t("account.tabs.profile")}
              </button>

              <button
                className={`px-3 py-1.5 rounded-full border transition ${
                  activeTab === "trips"
                    ? "bg-sky-500 text-white border-sky-500"
                    : "border-slate-200 text-slate-600 hover:border-sky-400"
                }`}
                onClick={() => setActiveTab("trips")}
              >
                {t("account.tabs.trips")}
              </button>

              <button
                className={`px-3 py-1.5 rounded-full border transition ${
                  activeTab === "security"
                    ? "bg-sky-500 text-white border-sky-500"
                    : "border-slate-200 text-slate-600 hover:border-sky-400"
                }`}
                onClick={() => setActiveTab("security")}
              >
                {t("account.tabs.security")}
              </button>

              <button
                className={`px-3 py-1.5 rounded-full border transition ${
                  activeTab === "settings"
                    ? "bg-sky-500 text-white border-sky-500"
                    : "border-slate-200 text-slate-600 hover:border-sky-400"
                }`}
                onClick={() => setActiveTab("settings")}
              >
                {t("account.tabs.settings")}
              </button>
            </div>

            <div className="flex-1">
              {activeTab === "overview" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm sm:text-base font-semibold text-slate-900">
                      {t("account.profile.title")}
                    </h2>
                    {!isEditingProfile ? (
                      <button
                        onClick={() => setIsEditingProfile(true)}
                        className="text-xs font-semibold text-sky-600 hover:text-sky-700"
                      >
                        {t("account.profile.edit")}
                      </button>
                    ) : null}
                  </div>

                  {!isEditingProfile ? (
                    <div className="text-sm text-slate-600 space-y-1">
                      <p>
                        <span className="font-semibold text-slate-700">
                          {t("account.profile.full_name")}:
                        </span>{" "}
                        {user.firstName} {user.lastName}
                      </p>
                      <p>
                        <span className="font-semibold text-slate-700">
                          {t("account.labels.email")}:
                        </span>{" "}
                        {user.email}
                      </p>
                      <p>
                        <span className="font-semibold text-slate-700">
                          {t("account.labels.phone")}:
                        </span>{" "}
                        {user.phone}
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">
                          {t("account.edit.first_name")}
                        </label>
                        <input
                          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition"
                          value={editFirstName}
                          onChange={(e) => setEditFirstName(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">
                          {t("account.edit.last_name")}
                        </label>
                        <input
                          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition"
                          value={editLastName}
                          onChange={(e) => setEditLastName(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">
                          {t("account.labels.email")}
                        </label>
                        <input
                          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition"
                          value={editEmail}
                          onChange={(e) => setEditEmail(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">
                          {t("account.labels.phone")}
                        </label>
                        <input
                          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition"
                          value={editPhone}
                          onChange={(e) => setEditPhone(e.target.value)}
                        />
                      </div>

                      <div className="col-span-full flex gap-2 justify-end pt-1">
                        <button
                          className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
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
                          className="px-3 py-1.5 text-xs rounded-lg bg-sky-500 text-white font-semibold hover:bg-sky-600"
                          onClick={handleProfileSave}
                        >
                          {t("account.edit.save")}
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="mt-4 rounded-lg bg-slate-50 border border-slate-100 px-3 py-2 text-xs text-slate-500">
                    {t("account.demo_note")}
                  </div>
                </div>
              )}

              {activeTab === "trips" && (
                <div className="space-y-3">
                  <h2 className="text-sm sm:text-base font-semibold text-slate-900 mb-1">
                    {t("account.trips.title")}
                  </h2>
                  <p className="text-xs text-slate-500 mb-2">
                    {t("account.trips.subtitle")}
                  </p>
                  <div className="space-y-2">
                    {mockTrips.map((trip) => (
                      <div
                        key={trip.id}
                        className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-xs sm:text-sm"
                      >
                        <div>
                          <p className="font-semibold text-slate-900">
                            {trip.destination}
                          </p>
                          <p className="text-[11px] text-slate-500">
                            {trip.dates}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-[11px] font-semibold ${
                            trip.status === "Booked"
                              ? "bg-sky-50 text-sky-700 border border-sky-100"
                              : trip.status === "Completed"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                              : "bg-red-50 text-red-600 border border-red-100"
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
                    <h2 className="text-sm sm:text-base font-semibold text-slate-900">
                      {t("account.security.title")}
                    </h2>
                    <p className="text-xs text-slate-500">
                      {t("account.security.subtitle")}
                    </p>
                  </div>

                  {securityError && (
                    <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                      {securityError}
                    </div>
                  )}

                  {securityMessage && (
                    <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
                      {securityMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        {t("account.security.current_password")}
                      </label>
                      <input
                        type="password"
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        {t("account.security.new_password")}
                      </label>
                      <input
                        type="password"
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        {t("account.security.confirm_new_password")}
                      </label>
                      <input
                        type="password"
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition"
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
                    <h2 className="text-sm sm:text-base font-semibold text-slate-900">
                      {t("account.settings.title")}
                    </h2>
                    <p className="text-xs text-slate-500">
                      {t("account.settings.subtitle")}
                    </p>
                  </div>

                  <div className="rounded-lg border border-slate-100 bg-slate-50 px-4 py-3 text-xs sm:text-sm">
                    <p className="font-semibold text-slate-800 mb-2">
                      {t("account.newsletter.title")}
                    </p>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="rounded border-slate-300"
                          checked={newsletter.deals}
                          onChange={() => handleNewsletterChange("deals")}
                        />
                        <span>{t("account.newsletter.deals")}</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="rounded border-slate-300"
                          checked={newsletter.flights}
                          onChange={() => handleNewsletterChange("flights")}
                        />
                        <span>{t("account.newsletter.flights")}</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="rounded border-slate-300"
                          checked={newsletter.hotels}
                          onChange={() => handleNewsletterChange("hotels")}
                        />
                        <span>{t("account.newsletter.hotels")}</span>
                      </label>
                    </div>
                  </div>

                  <div className="rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-xs sm:text-sm">
                    <p className="font-semibold text-red-700 mb-1">
                      {t("account.delete.title")}
                    </p>
                    <p className="text-slate-600 text-xs mb-2">
                      {t("account.delete.text")}
                    </p>
                    <button
                      onClick={handleDeleteAccount}
                      className="inline-flex items-center justify-center rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 transition"
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
