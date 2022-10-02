import PageTitle from "common/title/PageTitle";
import { getUserInfo } from "common/tool";
import { useNavigate } from "react-router-dom";
import { useGetUserQuery } from "redux/service/user";
import "./UserInfo.scss";

// 사진, 이름, 스킬, 서브 스킬, 직업, 지역, 연차, 소개,
export default function UserInfo() {
  const sub = getUserInfo("sub");
  const { data, isLoading, isSuccess, isError } = useGetUserQuery(sub);

  const navi = useNavigate();

  const onMoveUserModify = () => {
    navi(`/user/info/modify/${sub}`);
  };

  return (
    <section className="page">
      {isLoading && <h1 className="loading__txt">LOADING...</h1>}

      <PageTitle title="내정보" />

      <section className="page__body">
        <section className="page__body__upper">
          <section className="user__info__container">
            <div className="end user__info__feature__line">
              <button onClick={onMoveUserModify}>수정하기</button>
            </div>

            <div className="row user__info__line">
              <p className="bold user__info__txt">이메일</p>

              <p className="user__info__txt">{data?.email}</p>
            </div>

            <div className="row user__info__line">
              <p className="bold user__info__txt">별명</p>

              <p className="user__info__txt">{data?.nickname}</p>
            </div>
          </section>
        </section>
      </section>
    </section>
  );
}
