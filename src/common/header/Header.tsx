import { Link, useNavigate } from "react-router-dom";
import SubBtn from "./components/SubBtn";
import "./Header.scss";

export default function Header() {
  const navi = useNavigate();

  const onMovePage = (url: string) => {
    // navi("/");
    navi(url, { replace: true });
  };
  return (
    <section className="header__container">
      <section className="w100 between main__header">
        <h1>Together</h1>

        <article className="header__btnlist">
          <button>알림</button>
          <button>정보</button>
        </article>
      </section>

      <section className="w100 row sub__header">
        <SubBtn url="study" txt="스터디" />
        <SubBtn url="sideproject" txt="사이드 프로젝트" />
        <SubBtn url="club" txt="동아리" />
        <SubBtn url="story" txt="이야기" />
      </section>
    </section>
  );
}
