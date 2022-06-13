import { Link } from "react-router-dom";
import "./SubBtn.scss";

interface IProps {
  url: string;
  txt: string;
}

export default function SubBtn({ txt, url }: IProps) {
  return (
    <Link to={url} className="sub__header__btn">
      {txt}
    </Link>
  );
}
