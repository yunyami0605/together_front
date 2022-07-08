import "./DoubleDatepicker.scss";
import Datepicker from "./Datepicker";
import { type_date } from "types/common";

interface IProps {
  startDate: string;
  setStartDate: (startDate: string) => void;
  endDate: string;
  setEndDate: (endDate: string) => void;
  onSearch: () => void;
  showType?: type_date;
  showValueType?: string;
  refStartDate?: string;
}

/*
 * @def : DoubleDatepicker
 * @param
 * {string} - startDate: 시작날짜 state
 * {string} - setStartDate: 시작날짜 state
 * {string} - endDate: 시작날짜 state
 * {string} - setEndDate: 시작날짜 state
 * {()=>void)} - onSearch: 검색 handler
 * {type_date} - showType: calendar 일/월/연도 타입별 검색 설정값
 */
function DoubleDatepicker({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  onSearch,
  showType,
  showValueType,
  refStartDate,
}: IProps) {
  return (
    <div className="double__date__picker">
      <Datepicker
        defaultDate={startDate}
        setDate={(_date: string) => {
          setStartDate(_date);
        }}
        showType={showType}
        showValueType={showValueType}
        refStartDate={refStartDate}
        // openBtnStyle={datepickerBtnStyle}
      />

      <Datepicker
        defaultDate={endDate}
        setDate={(_date: string) => {
          setEndDate(_date);
        }}
        showType={showType}
        showValueType={showValueType}
        refStartDate={refStartDate}

        // openBtnStyle={datepickerBtnStyle}
      />

      <button className="btn btn-dark active" onClick={onSearch}>
        검색
      </button>
    </div>
  );
}
export default DoubleDatepicker;
