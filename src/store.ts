import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import searchReducer from "./slices/searchSlice";
import { destinationsApi } from "./services/destinationsApi";
import { weatherApi } from "./services/weaterApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
    [destinationsApi.reducerPath]: destinationsApi.reducer,
    [weatherApi.reducerPath]: weatherApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(destinationsApi.middleware, weatherApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


