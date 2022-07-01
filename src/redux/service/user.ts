import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IRes } from "types/response";

export interface IUserPostBody {
  email: string;
  password: string;
}

export interface IUserRegisterBody {
  email: string;
  password: string;
  nickname: string;
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE_URL,
  }),
  tagTypes: ["user"],
  endpoints: (builder) => ({
    postLoginUser: builder.mutation<IRes<string>, Partial<IUserPostBody>>({
      query: ({ ...body }) => {
        return {
          url: "/auth/login",
          credentials: "include",
          method: "POST",
          body,
        };
      },
      invalidatesTags: [{ type: "user" as const, id: "LIST" }],
    }),

    postRegisterUser: builder.mutation<
      IRes<string>,
      Partial<IUserRegisterBody>
    >({
      query: ({ ...body }) => {
        return {
          url: "/user",
          credentials: "include",
          method: "POST",
          body,
        };
      },
      invalidatesTags: [{ type: "user" as const, id: "LIST" }],

      // transformResponse: (response: IRes<number>, meta, arg) => response.data,
    }),

    getUser: builder.query<any, number>({
      query: (id) => `/user`,
      transformResponse: (response: any) => response.data,
    }),
    //
  }),
});

export const {
  useGetUserQuery,
  usePostLoginUserMutation,
  usePostRegisterUserMutation,
} = userApi;
