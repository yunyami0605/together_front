import { FetchBaseQueryArgs } from "@reduxjs/toolkit/dist/query/fetchBaseQuery";

import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

import { deleteCookie, getCookie } from "common/tool";
import { IErrorData } from "types/response";

/**
 *@description common base query option in rtk createApi
 *@param {string} url - api url
 */
export const commonBaseQueryOption = (url: string): FetchBaseQueryArgs => {
  return {
    baseUrl: process.env.REACT_APP_API_BASE_URL + url,
    prepareHeaders(headers: Headers) {
      const token = getCookie(process.env.REACT_APP_ACCESS_TOKEN);

      headers.set("Authorization", `Bearer ${token}`);
      headers.set("Accept", `application/json`);

      return headers;
    },

    credentials: "include",
  };
};

const baseUrl = `${process.env.REACT_APP_API_BASE_URL}`;

// 중첩 함수로 만들기 bearer 이랑, api 주소 받게끔
export const customFetchBase: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  // await mutex.waitForUnlock();

  const accessToken = getCookie(process.env.REACT_APP_ACCESS_TOKEN);
  const refreshToken = getCookie(process.env.REACT_APP_REFRESH_TOKEN);

  // 일반적인 api 쿼리
  const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${accessToken}`);

      return headers;
    },
  });

  // 토큰 리프래쉬 요청 쿼리
  const refreshTokenQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${refreshToken}`);

      return headers;
    },
  });

  let result = await baseQuery(args, api, extraOptions);

  // auth 쪽 에러 처리
  if (result.error) {
    const data = result.error.data as IErrorData;

    // access token이 만료되었을 경우
    if (data.data.message === "access token expired") {
      const refreshResult = await refreshTokenQuery(
        {
          credentials: "include",
          url: "auth/refresh",
          method: "POST",
        },
        api,
        extraOptions
      );

      // access 토큰을 재발급 받으면 기존 요청 다시
      if (refreshResult.data) {
        const reAccessToken = getCookie(process.env.REACT_APP_ACCESS_TOKEN);

        const reBaseQuery = fetchBaseQuery({
          baseUrl,
          prepareHeaders: (headers) => {
            headers.set("Authorization", `Bearer ${reAccessToken}`);

            return headers;
          },
        });

        result = await reBaseQuery(args, api, extraOptions);
      } else {
        deleteCookie(process.env.REACT_APP_ACCESS_TOKEN as string);
        deleteCookie(process.env.REACT_APP_REFRESH_TOKEN as string);
        window.alert("회원정보가 만료되었습니다. 다시 로그인 해주세요.");
        setTimeout(() => (window.location.href = "/login"), 300);
      }
    } else if (data.data.message === "access token malformed") {
      deleteCookie(process.env.REACT_APP_ACCESS_TOKEN as string);
      deleteCookie(process.env.REACT_APP_REFRESH_TOKEN as string);
      window.alert("회원정보가 만료되었습니다. 다시 로그인 해주세요.");
      setTimeout(() => (window.location.href = "/login"), 300);
    }
  }

  return result;
};
