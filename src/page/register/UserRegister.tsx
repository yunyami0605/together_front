import { apiCall } from "common/api";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { usePostStudyBoardMutation } from "redux/service/study/board";
import {
  IUserRegisterBody,
  usePostRegisterUserMutation,
} from "redux/service/user";
import "./UserRegister.scss";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"; //*

type tFormValues = {
  email: string;
  password: string;
  password2: string;
  nickname: string;
};

function UserRegister() {
  const [postCredentials, { isSuccess, isLoading, isError }] =
    usePostRegisterUserMutation();

  const navi = useNavigate();

  // # login form yup
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).max(20).required(),
    password2: yup
      .string()
      .min(8, "비밀번호는 8~20글자 사이로 정해주세요.")
      .max(20, "비밀번호는 8~20글자 사이로 정해주세요.")
      .required()
      .oneOf(
        [yup.ref("password")],
        "비밀번호와 비밀번호 확인이 일치하지 않습니다."
      ),

    nickname: yup
      .string()
      .min(4, "닉네임은 4~12글자 사이로 정해주세요.")
      .max(12, "닉네임은 4~12글자 사이로 정해주세요.")
      .required("닉네임은 필수사항입니다."),
  });

  const onSubmit = async (data: tFormValues) => {
    const { email, nickname, password } = data;
    const res = await postCredentials({ email, nickname, password })
      .unwrap()
      .then((payload) => {
        console.log(payload);
      })
      .catch((error) => console.error("rejected", error));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<tFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      password2: "",
    },
  }); //*

  useEffect(() => {
    if (isSuccess) {
      navi("/study");
    }

    if (isError) {
      alert("잘못된 폼");
    }
  }, [isSuccess, isError]);
  return (
    <section className="page">
      {isLoading && <h1 className="loading__txt">LOADING...</h1>}

      <section className="page__body">
        <form className="register__form" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="register__field"># 이메일</h3>

          <input type="email" {...register("email")} />
          <span className="error_span">
            {errors.email && "이메일 형식이 맞지 않습니다."}
          </span>

          <h3 className="register__field"># 비밀번호</h3>

          <input type="password" {...register("password")} />
          <span className="error_span">
            {errors.password && "비밀번호는 8~20글자 사이로 정해주세요."}
          </span>

          <h3 className="register__field"># 비밀번호 확인</h3>
          <input type="password" {...register("password2")} />

          {errors.password2 && (
            <span className="error_span">{errors.password2.message}</span>
          )}

          <h3 className="register__field"># 닉네임</h3>
          <input type="text" {...register("nickname")} />

          {errors.nickname && (
            <span className="error_span">{errors.nickname.message}</span>
          )}

          <div className="center register__btnlist">
            <button className="positive__btn" type="submit">
              {isLoading ? "등록중" : "회원가입"}
            </button>
            <button className="negative__btn">취소하기</button>
          </div>
        </form>
      </section>
    </section>
  );
}

export default UserRegister;
