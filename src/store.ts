import { configureStore } from "@reduxjs/toolkit";

// Редьюсер аутентификации пользователя
import authReducer from "./slices/authSlice";

// Редьюсер поискового состояния (строка поиска, фильтры и т.п.)
import searchReducer from "./slices/searchSlice";
import { destinationsApi } from "./services/api/destinationsApi";
import { weatherApi } from "./services/weatherApi";
import { currencyApi } from "./services/currencyApi";

// Создание Redux-хранилища приложения
export const store = configureStore({
  reducer: {
    // Состояние аутентификации
    auth: authReducer,

    // Состояние поиска
    search: searchReducer,

    // Редьюсер RTK Query для направлений
    [destinationsApi.reducerPath]: destinationsApi.reducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
    [currencyApi.reducerPath]: currencyApi.reducer,
  },

  // Подключение middleware RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      destinationsApi.middleware,
      weatherApi.middleware,
      currencyApi.middleware
    ),
});

// Тип глобального состояния Redux
export type RootState = ReturnType<typeof store.getState>;

// Тип dispatch для корректной типизации useDispatch
export type AppDispatch = typeof store.dispatch;
