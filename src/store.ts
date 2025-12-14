import { configureStore } from "@reduxjs/toolkit";

// Редьюсер аутентификации пользователя
import authReducer from "./slices/authSlice";

// Редьюсер поискового состояния (строка поиска, фильтры и т.п.)
import searchReducer from "./slices/searchSlice";

// RTK Query API для работы с направлениями
import { destinationsApi } from "./services/api/destinationsApi";

// RTK Query API для получения данных о погоде
import { weatherApi } from "./services/api/weaterApi";

// Создание Redux-хранилища приложения
export const store = configureStore({
  reducer: {
    // Состояние аутентификации
    auth: authReducer,

    // Состояние поиска
    search: searchReducer,

    // Редьюсер RTK Query для направлений
    [destinationsApi.reducerPath]: destinationsApi.reducer,

    // Редьюсер RTK Query для погоды
    [weatherApi.reducerPath]: weatherApi.reducer,
  },

  // Подключение middleware RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      destinationsApi.middleware,
      weatherApi.middleware
    ),
});

// Тип глобального состояния Redux
export type RootState = ReturnType<typeof store.getState>;

// Тип dispatch для корректной типизации useDispatch
export type AppDispatch = typeof store.dispatch;
