import PageTitle from "common/title/PageTitle";
import { getUserInfo } from "common/tool";
import { FC, useState } from "react";
import { useGetUserQuery } from "redux/service/user";
import "./UserInfo.scss";

interface IProps {}
export default function UserInfo() {
  const sub = getUserInfo("sub");
  const { data, isLoading, isSuccess, isError } = useGetUserQuery(sub);

  console.log(data);

  return (
    <section className="page">
      {/* {isLoading && <h1 className="loading__txt">LOADING...</h1>} */}

      <PageTitle title="내정보" />

      <section className="page__body">
        <section className="page__body__upper">
          <h3 className="register__field">이미지</h3>
          <div className="user__info__txt"></div>

          <h3 className="register__field">이메일</h3>

          <div className="user__info__txt">{data?.email}</div>

          <h3 className="register__field">별명</h3>
          <div className="user__info__txt">{data?.nickname}</div>

          <h3 className="register__field">연령대</h3>
          <div className="user__info__txt"></div>

          <h3 className="register__field">직업</h3>
          <div className="user__info__txt"></div>

          <h3 className="register__field">메인</h3>
          <div className="user__info__txt"></div>

          <h3 className="register__field">서브</h3>
          <div className="user__info__txt"></div>
        </section>
      </section>
    </section>
  );
}
