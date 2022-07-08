/* eslint-disable react-hooks/exhaustive-deps */
import { CSSProperties, useCallback, useEffect, useState } from "react";

import { calDate, ChangeDoubleDigit, toDate, toNumber } from "common/tool";
import "./Datepicker.scss";
import {
  processDate,
  setCalendarDate,
  setCalendarMonth,
  setCalendarYear,
} from "./component/DatepickerTool";
import moment from "moment";
import CalendarHeaderBtn from "./component/CalendarHeaderBtn";
import { type_date } from "types/common";

interface IProps {
  // setDate: () => void;
  setDate: (date: string) => void;
  inputStyle?: CSSProperties;
  showType?: type_date;
  defaultDate?: string;
  showValueType?: string;
  refStartDate?: string;
  refEndDate?: string;
}

/**
 * @description : calendar component to datepicker
 * @param {(date: string) => void} setDate - set date state
 * @param {string} defaultDate - show default date on datepicker (datepicker 창 열때, 처음 보여질 날짜)
 * @param {string | undefined} refStartDate - calendar에서 해당 value 이전 date는 공백 처리함
 * @param {string | undefined} refEndDate - calendar에서 해당 value 이후 date는 공백 처리함
 * @param {type_date} showType - show calendar date unit type
 * @param {string | undefined} showValueType - show value type on input html tag
 */
function Datepicker({
  setDate,
  inputStyle,
  defaultDate,
  refStartDate,
  refEndDate,
  showType = "d",
  showValueType = "YYYY.MM.DD",
}: IProps) {
  // # type 0 : 날짜 달력 , type 1 : 월 / 년 달력
  const [type, setType] = useState<type_date>(showType);

  const DAY_OF_THE_WEEK = ["일", "월", "화", "수", "목", "금", "토"];

  // # datepicker 모달창 on/off state
  const [open, setOpen] = useState(false);

  //   const d = toNumber(toDate(defaultDate, "DD"));
  //   const m = toNumber(toDate(defaultDate, "MM"));
  //   const y = toNumber(toDate(defaultDate, "YYYY"));

  const [curDate, setCurDate] = useState({
    y: toNumber(toDate(defaultDate, "YYYY")),
    m: toNumber(toDate(defaultDate, "MM")),
    d: toNumber(toDate(defaultDate, "DD")),
  });

  // # curDate가 update되면, 지난달 마지막 날짜/ 이번달 첫째 날짜/ 이번달 마지막 날짜를 갱신
  const { lastMonthLastDate, thisMonthFirstDate, thisMonthLastDate } =
    processDate(curDate);

  // 현재 보여지는 달력 첫 번째 요일 (ex. 일요일 = 0, 월요일 = 1, ... 토요일 = 6)
  const firstDayOfWeek = thisMonthFirstDate.getDay();

  // 현재 달력 기준 보여지는 첫 번째 일자 (* 여기서 첫 번째 날은 지난 달 마지막 주 첫번째 날짜)
  const calendarFirstDate = lastMonthLastDate - firstDayOfWeek + 1;

  const [calendarTxtList, setCalendarTxtList] = useState(
    setCalendarDate(
      calendarFirstDate,
      lastMonthLastDate,
      thisMonthLastDate,
      curDate.y,
      curDate.m,
      refStartDate,
      refEndDate
    )
  );

  const [headerTxt, setHeaderTxt] = useState(
    `${curDate.y}. ${ChangeDoubleDigit(curDate.m)}`
  );

  /**
   * @description : 달력 좌/우 클릭 시, 달 이동 함수
   * @param {number} cal: +/- value
   */
  const onChangeDate = (cal: number) => {
    let calValueYear = 12;
    if (refEndDate && cal === 1) {
      const refEndYear = toNumber(toDate(refEndDate, "YYYY"));
      calValueYear = refEndYear - curDate.y >= 12 ? 12 : refEndYear - curDate.y;
    }

    // # change할 type이 year 단위면 12씩 이동
    const calValue = (type === "y" ? calValueYear : 1) * cal;

    // # 계산 단위
    const calType = type === "d" ? "M" : "y";

    const _date = calDate(
      `${curDate.y}${ChangeDoubleDigit(curDate.m)}${ChangeDoubleDigit(
        curDate.d
      )}`,
      calValue,
      calType,
      "YYYY.MM.DD"
    );

    const formatType = type === "y" ? "YYYY" : "YYYYMM";
    const _chagneFormatDate = moment(_date).format(formatType);

    // 달력에서 월 이동 시, 시작 기준 월 보다 낮으면 이동하지 않는다.
    if (refStartDate) {
      const _refStartDate = moment(refStartDate).format(formatType);

      const refDiff = moment(_chagneFormatDate).diff(
        moment(_refStartDate),
        type === "y" ? "y" : "M"
      );

      if (refDiff < 0) return;
    }

    if (refEndDate) {
      const _refEndDateMon = moment(refEndDate).format(formatType);

      const refEndDiff = moment(_refEndDateMon).diff(
        moment(_chagneFormatDate),
        type === "y" ? "y" : "M"
      );

      if (refEndDiff < 0) return;
    }

    const [_y, _m, _d] = _date.split(".");

    setCurDate({ y: toNumber(_y), m: toNumber(_m), d: toNumber(_d) });
  };

  // @ def : select date state on calendar
  const onSelectDate = (_date: string) => {
    if (_date === "" || _date === "-") {
      return;
    }

    let tmpDate = null;
    if (type === "y") {
      tmpDate = { ...curDate, y: toNumber(_date) };
    } else if (type === "M") {
      tmpDate = { ...curDate, m: toNumber(_date) };
    } else {
      tmpDate = { ...curDate, d: toNumber(_date) };
    }

    const tmpM = showType !== "y" ? ChangeDoubleDigit(tmpDate.m) : "";
    const tmpD = showType === "d" ? ChangeDoubleDigit(tmpDate.d) : "";
    const chageDate = tmpDate.y.toString() + tmpM + tmpD;

    if (refStartDate) {
      const refStartDiff = moment(chageDate).diff(moment(refStartDate), type);

      if (refStartDiff < 0) return;
    }

    if (refEndDate) {
      const refEndDiff = moment(refEndDate).diff(moment(chageDate), type);

      if (refEndDiff < 0) return;
    }

    if (showType === type) {
      setDate(chageDate);
      setOpen(false);
    } else {
      setCurDate(tmpDate);
      onChangeType();
    }
  };

  /**
   * @description : change calendar render type
   */
  const onChangeType = useCallback(() => {
    if (type === "d") setType("y");
    else if (type === "M") {
      if (showType === "M") {
        setType("y");
      } else {
        setType("d");
      }
    } else if (type === "y" && showType !== "y") {
      setType("M");
    }
  }, [type]);

  useEffect(() => {
    const d = toNumber(toDate(defaultDate, "DD"));
    const m = toNumber(toDate(defaultDate, "MM"));
    const y = toNumber(toDate(defaultDate, "YYYY"));

    setCurDate({
      y,
      m,
      d,
    });
  }, [defaultDate]);

  // @ type, curdate 변화에 따른 HeaderTxt와 Calendar render data 업데이트
  useEffect(() => {
    if (type === "d") {
      setHeaderTxt(`${curDate.y}. ${ChangeDoubleDigit(curDate.m)}`);
      setCalendarTxtList(
        setCalendarDate(
          calendarFirstDate,
          lastMonthLastDate,
          thisMonthLastDate,
          curDate.y,
          curDate.m,
          refStartDate,
          refEndDate
        )
      );
    } else if (type === "M") {
      setHeaderTxt(`${curDate.y}년`);

      setCalendarTxtList(setCalendarMonth(curDate.y, refStartDate, refEndDate));
    } else {
      setHeaderTxt(`${curDate.y - 11} ~ ${curDate.y}`);

      setCalendarTxtList(setCalendarYear(curDate.y, refStartDate, refEndDate));
    }
  }, [curDate, type]);

  return (
    <>
      <input
        className="calendar__input"
        onClick={() => setOpen(true)}
        style={inputStyle}
        value={toDate(defaultDate, showValueType)}
        onChange={(e: any) => {}}
      />

      {open && (
        <section className={"calendar__container center"}>
          {/* //@ if click calendar background, calendar modal is closed */}
          <div
            onClick={() => setOpen(false)}
            className="calendar__background"
          ></div>

          <section className="calendar__box">
            <section className="calendar__header">
              <div className="between calendar__header__top">
                <CalendarHeaderBtn onClick={() => onChangeDate(-1)} txt="◁" />

                <button
                  className="calendar__header__date"
                  onClick={onChangeType}
                >
                  <p>{headerTxt}</p>
                </button>

                <CalendarHeaderBtn onClick={() => onChangeDate(1)} txt="▷" />
              </div>

              <div className="row calendar__header__bottom">
                {type === "d" &&
                  DAY_OF_THE_WEEK.map((val, i) => <p key={i}>{val}</p>)}
              </div>
            </section>

            <section className="calendar__body">
              {calendarTxtList.map((val, i) => (
                <div className="calendar__dateline" key={i}>
                  {val.map((_val, _i) => (
                    <button key={_i} onClick={() => onSelectDate(_val)}>
                      {_val}
                    </button>
                  ))}
                </div>
              ))}
            </section>
          </section>
        </section>
      )}
    </>
  );
}

export default Datepicker;
