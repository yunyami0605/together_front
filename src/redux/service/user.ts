import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "common/tool";
import { responseInterceptor } from "http-proxy-middleware";
import { tUserFormData } from "page/register/userRegister/common/constant";
import { commonBaseQueryOption } from "redux/common";
import { IDataDate, IRes } from "types/response";

export interface IUserPostBody {
  email: string;
  password: string;
}
/*
{
    "id": 1,
    "email": "test1@test.com",
    "nickname": "test1",
    "location1": 1,
    "location2": 1,
    "careerList": [
        [
            1,
            0
        ]
    ],
    "imgPath": "files\\userImg\\f2d8c751c103b8aaa15db490f77d3a338.png",
}
*/
export interface IGetUser extends IDataDate {
  id: number;
  email: string;
  nickname: string;
  location1: number;
  careerList: [number, number][];
  location2: number;
  imgPath: string;
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
  baseQuery: fetchBaseQuery(commonBaseQueryOption("")),
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
      invalidatesTags: ["user"],
    }),

    postLogoutUser: builder.mutation<IRes<string>, undefined>({
      query: () => {
        return {
          url: "/auth/logout",
          method: "POST",
        };
      },
      invalidatesTags: ["user"],
    }),

    getUser: builder.query<IGetUser, number | undefined>({
      query: (id) => `/user/${id}`,
      transformResponse: (response: IRes<IGetUser>) => response.data,
    }),

    postRegisterUser: builder.mutation<string, FormData>({
      query: (body) => {
        return {
          url: "/user",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["user"],

      transformResponse: (response: IRes<string>) => response.data,
    }),

    kakaoLogin: builder.mutation<string, any>({
      query: (body) => {
        return {
          url: "/auth/login/kakao",
          method: "POST",
          body,
        };
      },

      invalidatesTags: ["user"],
      transformResponse: (response: IRes<string>) => response.data,
    }),

    patchUser: builder.mutation<IRes<string>, { body: FormData; id: string }>({
      query: ({ body, id }) => {
        return {
          url: `/user/${id}`,
          method: "PATCH",
          body,
        };
      },
      invalidatesTags: ["user"],
    }),

    //
  }),
});

export const {
  useGetUserQuery,
  usePostLoginUserMutation,
  usePostLogoutUserMutation,
  usePostRegisterUserMutation,
  usePatchUserMutation,
  useKakaoLoginMutation,
} = userApi;
