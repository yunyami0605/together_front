import { FetchBaseQueryArgs } from "@reduxjs/toolkit/dist/query/fetchBaseQuery";
import { getCookie } from "common/tool";

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
      // headers.set("Access-Control-Allow-Origin", "*");
      // headers.set("Access-Control-Allow-Methods", "*");

      return headers;
    },

    credentials: "include",
  };
};
