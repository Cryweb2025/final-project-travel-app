import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import searchReducer from "./slices/searchSlice";
import { destinationsApi } from "./services/destinationsApi";
import { weatherApi } from "./services/weatherApi";
import { currencyApi } from "./services/currencyApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
    [destinationsApi.reducerPath]: destinationsApi.reducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
    [currencyApi.reducerPath]: currencyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      destinationsApi.middleware,
      weatherApi.middleware,
      currencyApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
