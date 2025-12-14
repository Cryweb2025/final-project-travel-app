import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const destinationsApi = createApi({
  reducerPath: "destinationsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://example.com/api/" }),
  endpoints: (builder) => ({
    getDestinations: builder.query<{ id: number; name: string; image: string }[], void>({
      query: () => "destinations"
    })
  })
});

export const { useGetDestinationsQuery } = destinationsApi;
