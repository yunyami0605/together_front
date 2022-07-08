import moment from "moment";
import queryString from "query-string";
import jwt from "jsonwebtoken";
import { type_date } from "types/common";

export const getUserInfo = (token?: string | null, _key?: string) => {
  if (!token) return;

  if (!process.env.REACT_APP_COOKIE_KYE) return;
  var userObj = jwt.verify(token, process.env.REACT_APP_COOKIE_KYE);

  return _key && typeof userObj !== "string" ? userObj[_key] : userObj;
};

export const toDate = (
  date?: string,
  type = "YYYY.MM.DD",
  isNodateNoRes = false
) => {
  if (date) return moment(date).format(type);
  return isNodateNoRes ? "-" : moment().format(type);
};

/**
 * @description : get cookie using name
 * @param {string} cookie_name
 */
export function getCookie(cookieName: string) {
  const cookieList = document.cookie.split(";");

  for (let i = 0; i < cookieList.length; i++) {
    const cookie = cookieList[i].split("=");
    if (cookie[0] === cookieName) {
      return cookie[1];
    }
  }
}

/**
 * @description : set cookie
 * @param {}
 */
export function setCookie(
  name: string,
  value: string,
  day: number,
  domain: string
) {
  var date = new Date();
  date.setTime(date.getTime() + day * 60 * 60 * 24 * 1000);
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/;domain=${domain};`;
}

export function deleteCookie(cookie_name: string) {
  setCookie(cookie_name, "", -1, `${process.env.REACT_APP_HOST}`);
}

/**
 * @description : get query value
 */
export const getQuery = () => {
  return queryString.parse(window.location.search);
};

/**
*@description num param가 maxCount보다 클 경우 +maxCount로 표시함
*@param {number} num - 표시할 숫자
*@param {number} maxCount - 최대 수를 표시할 조건

*/
export const maxCountTxt = (num?: number, maxCount = 99) => {
  if (!num) return "0";

  return num > maxCount ? `+${maxCount}` : `${num}`;
};

/**
 * @description : date calculate func
 * @param {string} _date
 * @param {number} cal - calculate value
 * @param {"y" | "m" | "d"} type - date type
 * @param {} format - date format type to return
 */
export const calDate = (
  _date: string,
  cal: number,
  type: type_date = "d",
  format: string = "YYYYMMDD"
) => {
  let tmp = null;

  // tmp = moment(_date).add(cal, type);
  tmp = moment(_date).add(cal, type).format(format);

  return tmp;
};

/**
 * @description Text of number change lenth one to two:
 * @param {number} tmp: value
 */
export const ChangeDoubleDigit = (tmp: number): string => {
  return tmp >= 10 ? `${tmp}` : `0${tmp}`;
};

/**
 * @description : get num if value is falsy
 */
export const toNumber = <T>(val: T): number => {
  if (!val) return 0;

  return Number(val);
};
