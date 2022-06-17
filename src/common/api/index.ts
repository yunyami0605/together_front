/* eslint-disable no-useless-concat */
/* eslint-disable no-fallthrough */
import axios from "axios";

const baseURL = `${process.env.REACT_APP_API_BASE_URL}`;
// const baseURL = "http://localhost:3000";

interface IApiCall {
  url: string;
  headers?: any;
  data?: any;
  method: "GET" | "POST" | "DELETE" | "OPTIONS" | "PUT" | "PATCH";
}

/* api 호출 함수 셋팅 및 호출
 * @param
 * rest : 서버로 보낼 데이터 && HTTP 메소드
 * headers : api 설정 객체
 * baseURL : 기본 url
 * url : 요청 url
 */
export async function apiCall(payload: IApiCall) {
  const { url, headers = {}, ...rest } = payload;
  //   const accessToken = getCookie(ACCESS_TOKEN_NAME) || "";
  const accessToken = "";

  console.log(baseURL);

  const options = {
    ...rest,
    headers,
    // baseURL,
    url,
  };

  // axios 설정
  const api = axios.create();
  api.defaults.baseURL = baseURL;
  api.defaults.headers.common = { "X-Requested-With": "XMLHttpRequest" };
  options.headers = {
    ...options.headers,
    "Content-Type": "application/json;charset=utf-8;",
    // "Cache-Control": "no-cache",
    // Pragma: "no-cache",
    // Expires: "0",
    Accept: "application/json",
    // Authorization: "bearer" + ` ${noAuthorization ? "" : accessToken}`,
  };

  try {
    const res = await api(options);

    console.log(res);

    if (
      res.status === 201 ||
      res.status === 200 ||
      res.status === 204 ||
      res.status === 205
    ) {
      return {
        status: res.status,
        data: res.data,
      };
    } else {
      return {
        status: res.status,
        data: null,
      };
    }
  } catch (e: any) {
    const res = e.response;

    if (process.env.NODE_ENV !== "production") {
      console.log("ERROR : ");
      console.log(res);
      console.log(res.data.message);
    }

    return {
      status: res.status,
      data: {},
    };
  }
}
