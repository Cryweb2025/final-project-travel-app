import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type CurrencyResponse = {
  rates: Record<string, number>;
};

export const currencyApi = createApi({
  reducerPath: "currencyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.frankfurter.app/",
  }),
  endpoints: (builder) => ({
    getCurrency: builder.query<number, string>({
      query: (currency) => `latest?from=EUR&to=${currency}`,
      transformResponse: (response: CurrencyResponse, _, currency) =>
        response.rates[currency],
    }),
  }),
});

export const { useGetCurrencyQuery } = currencyApi;
