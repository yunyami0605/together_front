import "./CalendarHeaderBtn.scss";

interface IProps {
  onClick: () => void;
  txt: string;
}

function CalendarHeaderBtn({ onClick, txt }: IProps) {
  return (
    <button className="calendar__header__btn" onClick={onClick}>
      <p>{txt}</p>
    </button>
  );
}

export default CalendarHeaderBtn;
