import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "common/tool";
import { customFetchBase } from "redux/common";
import { IRes } from "types/response";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: customFetchBase,

  tagTypes: ["auth"],
  endpoints: (builder) => ({
    postRefreshToken: builder.mutation<IRes<number>, undefined>({
      query: () => {
        const token = getCookie(process.env.REACT_APP_REFRESH_TOKEN);

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
