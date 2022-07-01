import { apiCall } from "common/api";
import { getCookie, getUserInfo } from "common/tool";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SubBtn from "./components/SubBtn";
import "./Header.scss";

export default function Header() {
  const { pathname } = useLocation() as { pathname: string };
  const navi = useNavigate();

  const cookie = getCookie("toat");
  const sub = getUserInfo(cookie, "sub");

  // const sub = 9;

  const onMoveLoginPage = () => {
    if (!sub) navi("login", { replace: true });
  };
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
          <button onClick={onMoveLoginPage}>{!sub ? "로그인" : "메뉴"}</button>
        </article>
      </section>

      <section className="w100 row sub__header">
        <SubBtn url="study" txt="스터디" />
        <SubBtn url="sideproject" txt="사이드 프로젝트" />
        <SubBtn url="club" txt="동아리" />
        <SubBtn url="story" txt="이야기" />
        <SubBtn url="together/register" txt="등록하기" />
      </section>
    </section>
  );
}
