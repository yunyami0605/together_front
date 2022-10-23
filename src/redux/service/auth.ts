import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "common/tool";
import { IRes } from "types/response";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE_URL,
    prepareHeaders(headers: Headers) {
      const token = getCookie(process.env.REACT_APP_REFRESH_TOKEN);

      headers.set("Authorization", `Bearer ${token}`);
      headers.set("Accept", `application/json`);

      return headers;
    },

    credentials: "include",
  }),
  tagTypes: ["auth"],
  endpoints: (builder) => ({
    postRefreshToken: builder.mutation<IRes<number>, undefined>({
      query: () => {
        const token = getCookie(process.env.REACT_APP_REFRESH_TOKEN);

        console.log(process.env.REACT_APP_REFRESH_TOKEN);
        console.log(token);

        return {
          url: "/auth/refresh",
          method: "POST",
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
      },
    }),
  }),
});

export const { usePostRefreshTokenMutation } = authApi;
