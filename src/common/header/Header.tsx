import { apiCall } from "common/api";

import { getUserInfo } from "common/tool";

import { Link, useLocation, useNavigate } from "react-router-dom";
import HeaderMenu from "./components/HeaderMenu";
import "./Header.scss";

export default function Header() {
  const { pathname } = useLocation() as { pathname: string };
  const navi = useNavigate();

  // const [sub, _] = useState(getUserInfo("sub"));
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

        <article className="row header__btnlist">
          <button onClick={() => onMovePage("together/register")}>
            글쓰기
          </button>
          <button>알림</button>
          {!sub ? (
            <button onClick={onMoveLoginPage}>{"로그인"}</button>
          ) : (
            <HeaderMenu />
          )}
        </article>
      </section>

      <section className="w100 row sub__header"></section>
    </section>
  );
}
