import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IDataDate, IRes } from "types/response";

export interface IUserPostBody {
  email: string;
  password: string;
}

export interface IGetUser extends IDataDate {
  id: number;
  email: string;
  nickname: string;
}

export interface IUserRegisterBody {
  email: string;
  password: string;
  nickname: string;
}

export interface IUserPatchBody {
  email?: string;
  nickname?: string;
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

    patchUser: builder.mutation<
      IRes<string>,
      { body: IUserPatchBody; id: string }
    >({
      query: ({ body, id }) => {
        return {
          url: `/user/${id}`,
          credentials: "include",
          method: "PATCH",
          body,
        };
      },
    }),

    getUser: builder.query<IGetUser, number>({
      query: (id) => `/user/${id}`,
      transformResponse: (response: IRes<IGetUser>) => response.data,
    }),
    //
  }),
});

export const {
  useGetUserQuery,
  usePostLoginUserMutation,
  usePostRegisterUserMutation,
  usePatchUserMutation,
} = userApi;
