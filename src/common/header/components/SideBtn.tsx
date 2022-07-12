import { Link } from "react-router-dom";
import "./SideBtn.scss";

interface IProps {
  src: string;
  url?: string;
  txt: string;
}

export default function SideBtn({ src, url, txt }: IProps) {
  return (
    <Link to={url || src} className="sub__header__btn">
      <div>
        <img src={`/img/icon/img__${src}__icon.svg`} alt="ic" />
        <p>{txt}</p>
      </div>
    </Link>
  );
}
