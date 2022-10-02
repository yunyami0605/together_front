import {
  SELECTOR_RECRUIT_SUB_TYPE,
  SELECTOR_RECRUIT_TYPE,
  SELECTOR_REGION_LIST,
  SELECTOR_SUB_REGION_LIST,
} from "common/constant";
import PageTitle from "common/title/PageTitle";
import { getUserInfo } from "common/tool";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUserQuery } from "redux/service/user";
import "./UserInfo.scss";

// 사진, 이름, 스킬, 서브 스킬, 직업, 지역, 연차, 소개,
export default function UserInfo() {
  const sub = getUserInfo("sub");
  const { data, isLoading, isSuccess, isError } = useGetUserQuery(sub);

  const navi = useNavigate();

  const careerType = useMemo(() => SELECTOR_RECRUIT_TYPE, []);
  const careerSubType = useMemo(() => SELECTOR_RECRUIT_SUB_TYPE, []);

  // 온라인/ 오프라인, 서울, 강서구,
  const regionList = useMemo(() => SELECTOR_REGION_LIST, []);
  const subRegionList = useMemo(() => SELECTOR_SUB_REGION_LIST, []);

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

            <div className="row user__info__line">
              <p className="bold user__info__txt">거주지</p>

              <p className="user__info__txt">
                {careerType[data?.location1 || 0].label}
              </p>
              <p className="user__info__txt">
                {
                  subRegionList[data?.location1 || 0][data?.location2 || 0]
                    .label
                }
              </p>
            </div>

            <div className="user__info__line">
              <p className="bold user__info__txt">경력</p>

              {data?.careerList.map((item, i) => (
                <div className="row">
                  <p className="user__info__txt">
                    {careerType[item[0] || 0].label}
                  </p>
                  <p className="user__info__txt">
                    {careerSubType[item[0] || 0][item[1] || 0].label}
                  </p>
                </div>
              ))}
            </div>

            <div className="user__info__line">
              <p className="bold user__info__txt">프로필 사진</p>

              <div className="img_user_profile_box">
                {!data?.imgPath && <div className="img_no_user_profile"></div>}

                {data?.imgPath && (
                  <img
                    alt="user-img"
                    className="img_user_profile"
                    src={`${process.env.REACT_APP_API_BASE_URL}/${data.imgPath}`}
                  />
                )}
              </div>
            </div>
          </section>
        </section>
      </section>
    </section>
  );
}
