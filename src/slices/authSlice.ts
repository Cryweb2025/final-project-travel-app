import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

/**
 * Состояние авторизации пользователя.
 * Хранит идентификатор пользователя (например, email или username)
 * либо null, если пользователь не авторизован.
 */
interface AuthState {
  user: string | null;
}

/**
 * Ключ для хранения данных авторизации в localStorage.
 * Используется для сохранения сессии между перезагрузками страницы.
 */
const STORAGE_KEY = "auth_user";

/**
 * Начальное состояние.
 * При инициализации берёт данные пользователя из localStorage,
 * если они там есть.
 */
const initialState: AuthState = {
  user: localStorage.getItem(STORAGE_KEY),
};

/**
 * Redux-slice для управления авторизацией.
 */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /**
     * Логин пользователя.
     * Сохраняет пользователя в Redux state и localStorage.
     */
    login: (state, action: PayloadAction<string>) => {
      state.user = action.payload;
      localStorage.setItem(STORAGE_KEY, action.payload);
    },

    /**
     * Логаут пользователя.
     * Очищает Redux state и удаляет данные из localStorage.
     */
    logout: (state) => {
      state.user = null;
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem("logged_user");
    },
  },
});

// Экспорт действий (actions)
export const { login, logout } = authSlice.actions;

// Экспорт редьюсера для подключения к store
export default authSlice.reducer;
