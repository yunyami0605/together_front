import { toDate, toNumber } from "common/tool";
import { type_date_obj } from "types/common";

export const devideDate = (date?: string) => {
  if (!date) return null;

  return {
    y: toNumber(toDate(date, "YYYY")),
    m: toNumber(toDate(date, "MM")),
    d: toNumber(toDate(date, "DD")),
  };
};

/**
 * @description : curDate에 따른 달력 일 수 계산 함수
 * @param {number} calendarFirstDate : 캘린더 첫번째 날짜
 * @param {number} lastMonthLastDate : 캘린더 지난달 마지막 날짜
 * @param {number} thisMonthLastDate : 캘린더 이번달 마지막 날짜
 * @param {number} curSelectedYear : 캘린더 이번달 마지막 날짜
 * @param {number} curSelectedMonth : 캘린더 이번달 마지막 날짜
 * @param {string | undefined} refStartDate: calendar에서 해당 value 이전 date는 '-' 처리함
 * @param {string | undefined} refEndDate: calendar에서 해당 value 이후 date는 '-' 처리함
 */
export const setCalendarDate = (
  calendarFirstDate: number,
  lastMonthLastDate: number,
  thisMonthLastDate: number,
  curSelectedYear: number,
  curSelectedMonth: number,
  refStartDate?: string,
  refEndDate?: string
) => {
  const refStart = devideDate(refStartDate);
  const refEnd = devideDate(refEndDate);

  const binArray = [[""], [""], [""], [""], [""]];

  // # refStart 연도보다 낮을 경우 표시 안함
  if (refStart && curSelectedYear < refStart.y) return binArray;

  // # 현재 연도가 refStart 연도이고 현재 달이 refStart 달보다 낮을 경우 표시 안함
  if (
    refStart &&
    curSelectedYear === refStart.y &&
    curSelectedMonth < refStart.m
  ) {
    return binArray;
  }

  // # 선택 날짜 기준 refEnd 연도보다 크거나
  // # ref연도와 같지만 refEnd 달보다 높을 경우 표시 안함
  if (refEnd && curSelectedYear > refEnd.y) return binArray;
  if (refEnd && curSelectedYear === refEnd.y && curSelectedMonth > refEnd.m) {
    return binArray;
  }

  // # resposne calendat data list
  let calendarDataList = [];

  // # 일주일치 날짜 data list
  let _calendarDataList = [];

  // # 선택된 날짜가 refStart y, m과 같은지 여부
  const isCurRefStartEqual =
    refStart &&
    curSelectedYear === refStart.y &&
    curSelectedMonth === refStart.m;

  const isCurRefEndEqual =
    refEnd && curSelectedYear === refEnd.y && curSelectedMonth === refEnd.m;

  const calRowValue = (isTrue: boolean, i: number) => {
    if (isTrue) {
      // # IsTrue를 만족할 경우 공백 처리
      return "";
    } else if (i > 0) {
      // # isTrue를 만족하지 않고 현재 달 일자 넣을 경우
      return i.toString();
    } else {
      // # 이전 달 중 현재 달에 표기되지 않을 날짜들 (회색분으로 표시)
      return "";
    }
  };

  // # set calendar date list on shown month
  /**
   * ex)
   * 2022-07-07 기준
   * calendarFirstDate : 26
   * lastMonthLastDate: 30
   * thisMonthLastDate: 31
   * 26 ~ 61
   */
  for (
    let i = calendarFirstDate - lastMonthLastDate;
    i < thisMonthLastDate + 1;
    i++
  ) {
    let cellValue = null;
    if (isCurRefStartEqual && isCurRefEndEqual) {
      // # 현재 달이 refStart, refEnd와 같은 연도, 같은 달일 경우
      // # ref 조건에 맞지 않은 날짜는 공백 처리
      cellValue = calRowValue(i < refStart.d || i > refEnd.d, i);
    } else if (isCurRefStartEqual && !isCurRefEndEqual) {
      // # 현재 달이 refStart와 같은 연도, 같은 달일 경우
      cellValue = calRowValue(i < refStart.d, i);
    } else if (!isCurRefStartEqual && isCurRefEndEqual) {
      // # 현재 달이 refEnd와 같은 연도, 같은 달일 경우
      cellValue = calRowValue(i > refEnd.d, i);
    } else {
      // # 조건 상관없는 달인 경우
      cellValue = calRowValue(false, i);
    }
    _calendarDataList.push(cellValue);

    // 다음 주로 넘어가면 tmp 배열 초기화
    if (_calendarDataList.length === 7) {
      calendarDataList.push(_calendarDataList);
      _calendarDataList = [];
    }
  }

  // # 마지막 주 표시되지 않는 날들, 회색 글자로 로직 추가하지 않을 경우 빼도 됨
  const calLastWeekLength = _calendarDataList.length;
  if (calLastWeekLength !== 0) {
    for (let i = 0; i < 7 - calLastWeekLength; i++) {
      _calendarDataList.push("");
    }
    calendarDataList.push(_calendarDataList);
    _calendarDataList = [];
  }

  return calendarDataList;
};

/**
 * @description : curSelectedYear 따른 달력 월 수 계산 함수
 * @param {number} curSelectedYear : 캘린더 현재 선택된 year
 * @param {string | undefined} refStartDate: calendar에서 해당 value 이전 date는 '-' 처리함
 * @param {string | undefined} refEndDate: calendar에서 해당 value 이후 date는 '-' 처리함
 */
export const setCalendarMonth = (
  curSelectedYear: number,
  refStartDate?: string,
  refEndDate?: string
) => {
  let calendarDataList = [];
  let _calendarDataList: string[] = [];
  const refStart = devideDate(refStartDate);
  const refEnd = devideDate(refEndDate);

  let next = 0;
  for (let i = 0; i <= 12; i++) {
    let value = null;
    if (
      (refStart && refStart.y === curSelectedYear && refStart.m > i + 1) ||
      (refEnd && refEnd.y === curSelectedYear && refEnd.m < i + 1)
    ) {
      value = "";
    } else if (refStart && refStart.y > curSelectedYear) {
      value = "";
    } else {
      value = (i + 1).toString();
    }

    if (next === Math.floor(i / 3)) {
      _calendarDataList.push(value);
    } else {
      next += 1;
      calendarDataList.push(_calendarDataList);
      _calendarDataList = [value];
    }
  }

  return calendarDataList;
};

/**
 * @description : curSelectedYear 따른 달력 연 수 계산 함수
 * @param {number} curSelectedYear : 캘린더 현재 선택된 year
 * @param {string | undefined} refStartDate: calendar에서 해당 value 이전 date는 '-' 처리함
 * @param {string | undefined} refEndDate: calendar에서 해당 value 이후 date는 '-' 처리함
 */
export const setCalendarYear = (
  curSelectedYear: number,
  refStartDate?: string,
  refEndDate?: string
) => {
  let calendarDataList = [];
  let _calendarDataList: string[] = [];
  const refStart = devideDate(refStartDate);
  const refEnd = devideDate(refEndDate);

  // # 연 달력에 한 줄에 표시할 item 갯수
  let next = 3;
  for (let i = 11; i >= -1; i--) {
    let value = null;

    // # 현재 list에 넣은 year data
    const curItem = curSelectedYear - i;

    if (refStart && refEnd) {
      //# ref start, end가 둘다 있을 경우
      if (refStart.y <= curItem && refEnd.y >= curItem) {
        value = curItem.toString();
      } else {
        value = "";
      }
    } else if (refStart && !refEnd) {
      //# ref start만 있을 경우

      if (refStart.y <= curItem) {
        value = curItem.toString();
      } else {
        value = "";
      }
    } else if (!refStart && refEnd) {
      //# ref end만 있을 경우

      if (refEnd.y >= curItem) {
        value = curItem.toString();
      } else {
        value = "";
      }
    } else {
      //# ref start, end가 둘다 없을 경우

      value = curItem.toString();
    }

    // # callendar row를 다 채우면, 다음 줄로 넘김
    if (next === Math.floor(i / 3)) {
      _calendarDataList.push(value);
    } else {
      next -= 1;
      calendarDataList.push(_calendarDataList);
      _calendarDataList = [value];
    }
  }

  return calendarDataList;
};

/**
 *@description: cal 지난 달 마지막 날짜, 이번달 첫 및 마지막 날짜 as current calendar month
 *@param {number} y - year
 *@param {number} m - month
 *@param {number} d - date
 */
export const processDate = ({ y, m, d }: type_date_obj) => {
  return {
    lastMonthLastDate: new Date(y, m - 1, 0).getDate(),
    thisMonthFirstDate: new Date(y, m - 1, 1),
    thisMonthLastDate: new Date(y, m, 0).getDate(),
  };
};
