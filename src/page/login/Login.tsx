import { FC, useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePostLoginUserMutation } from "reudx/service/study/user";
import "./Login.scss";

export const Login: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [postCredentials, { isSuccess, isLoading, isError }] =
    usePostLoginUserMutation();

  const navi = useNavigate();

  const onLogin = () => {
    const body = {
      email,
      password,
    };
    const res = postCredentials(body)
      .unwrap()
      .then((payload) => {
        if (payload.statusCode === 204 && payload.data) {
          console.log(payload);
          navi("/study");
        }
        // if (payload) document.cookie = `toat=${payload}; max-age=3600`;
      })
      .catch((error) => console.error("rejected", error));
  };

  const onUserRegister = () => {
    navi("/user/register");
  };

  return (
    <section className="center page login__page">
      {isLoading && <h1 className="loading__txt">LOADING...</h1>}

      <section className="login__box">
        <p className="login__title">로그인</p>

        <input
          type="text"
          className="login__input"
          onChange={(e: any) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          className="login__input"
          onChange={(e: any) => setPassword(e.target.value)}
          value={password}
        />

        <button className="w100 login__btn" onClick={onLogin}>
          로그인
        </button>

        <div className="login__subline">
          <button onClick={onUserRegister}>회원가입</button>
          <button>패스워드 찾기</button>
        </div>
      </section>
    </section>
  );
};
