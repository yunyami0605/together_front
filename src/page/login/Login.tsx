import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { usePostLoginUserMutation } from "redux/service/user";
import * as yup from "yup";
import { Resolver, yupResolver } from "@hookform/resolvers/yup"; //*
import { useForm } from "react-hook-form"; //*
import "./Login.scss";

type TFormValues = {
  email: string;
  password: string;
};

export const Login: FC = () => {
  const [postCredentials, { isSuccess, isLoading, isError }] =
    usePostLoginUserMutation();

  const navi = useNavigate();

  // # login form yup
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).max(20).required(),
  });

  /**
   *@description : call login api event handler
   */
  const onLogin = (data: TFormValues) => {
    const body = data;

    const res = postCredentials(body)
      .unwrap()
      .then((payload) => {
        if (payload.statusCode === 204 && payload.data) {
          navi("/study");
        }
      })
      .catch((error) => console.error("rejected", error));
  };

  function onLoginKakao() {
    /**
     * `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
     */

    window.location.href = "http://localhost:3000/api/auth/login/kakao";

    // window.Kakao.Auth.authorize({
    //   redirectUri: `${process.env.REACT_APP_HOST_BASE_URL}/login/kakao/redirect`,
    // });
  }

  /**
   *@description : move to register page
   */
  const onUserRegister = () => {
    navi("/user/register");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  }); //*

  return (
    <section className="center__v page login__page">
      {isLoading && <h1 className="loading__txt">LOADING...</h1>}

      <form className="login__box" onSubmit={handleSubmit(onLogin)}>
        <p className="login__title">로그인</p>

        <label htmlFor="email">이메일</label>
        <input type="email" {...register("email")} />
        <span className="error_span">
          {errors.email && "이메일 형식이 맞지 않습니다."}
        </span>

        <label htmlFor="password">비밀번호</label>
        <input type="password" {...register("password")} />
        <span className="error_span">
          {errors.password && "비밀번호 형식이 맞지 않습니다. (* 8~20 글자 ) "}
        </span>

        <button type="submit" className="w100 login__btn">
          로그인
        </button>

        <button className="w100 login__btn" onClick={onLoginKakao}>
          카카오 로그인
        </button>

        <div className="login__subline">
          <button onClick={onUserRegister}>회원가입</button>
          <button>비밀번호 찾기</button>
        </div>
      </form>
    </section>
  );
};
