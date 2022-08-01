import { FC, useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePostLoginUserMutation } from "redux/service/user";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"; //*
import { useForm, SubmitHandler } from "react-hook-form"; //*

import "./Login.scss";

type FormValues = {
  email: string;
  password: string;
};

export const Login: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [postCredentials, { isSuccess, isLoading, isError }] =
    usePostLoginUserMutation();

  const navi = useNavigate();

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    pw: yup.string().min(8).max(20).required(),
  });

  const onLogin: SubmitHandler<FormValues> = (data) => {
    const body = data;
    console.log(data);

    const res = postCredentials(body)
      .unwrap()
      .then((payload) => {
        if (payload.statusCode === 204 && payload.data) {
          navi("/study");
        }
      })
      .catch((error) => console.error("rejected", error));
  };

  const onUserRegister = () => {
    navi("/user/register");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>(); //*

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<FormValues>({
  //   resolver: yupResolver(schema),
  // }); //*

  return (
    <section className="center page login__page">
      {isLoading && <h1 className="loading__txt">LOADING...</h1>}

      {/* <form className="login__box" onSubmit={handleSubmit(onTest)}> */}
      <form className="login__box" onSubmit={handleSubmit(onLogin)}>
        <p className="login__title">로그인</p>

        <label htmlFor="email">이메일</label>
        <input type="email" {...register("email")} />
        <span className="">
          {errors.email && "이메일 형식이 맞지 않습니다."}
        </span>

        <label htmlFor="password">비밀번호</label>
        <input type="password" {...register("password")} />
        <span className="">
          {errors.password && "비밀번호 형식이 맞지 않습니다."}
        </span>

        <button type="submit" className="w100 login__btn">
          로그인
        </button>

        <div className="login__subline">
          <button onClick={onUserRegister}>회원가입</button>
          <button>패스워드 찾기</button>
        </div>
      </form>
    </section>
  );
};
