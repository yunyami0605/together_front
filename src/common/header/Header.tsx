import { apiCall } from "common/api";
import { getUserInfo } from "common/tool";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.scss";

export default function Header() {
  const { pathname } = useLocation() as { pathname: string };
  const navi = useNavigate();

  const sub = getUserInfo("sub");

  // const sub = 9;

  const onMoveLoginPage = () => {
    if (!sub) navi("login", { replace: true });
  };
  const onMovePage = (url: string) => {
    navi(url);
  };
  return (
    <section className="header__container">
      <section className="w100 between main__header">
        <h1>
          <span>To</span>gether
        </h1>

        <article className="header__btnlist">
          {/* <Link to={"together/register"} className="sub__header__btn">
        글쓰기
        </Link> */}
          <button onClick={() => onMovePage("together/register")}>
            글쓰기
          </button>
          <button>알림</button>
          <button onClick={onMoveLoginPage}>{!sub ? "로그인" : "메뉴"}</button>
        </article>
      </section>

      <section className="w100 row sub__header"></section>
    </section>
  );
}
