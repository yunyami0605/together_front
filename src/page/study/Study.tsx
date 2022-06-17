import { FC, useEffect } from "react";
import "./Study.scss";
import { StudyBox } from "./components/StudyBox";
import { apiCall } from "common/api";

export const Study: FC = () => {
  const tmp = [0, 0, 0, 0];

  const getStudyBoardList = async () => {
    const res = await apiCall({
      url: "/study/board/list?page=1",
      method: "GET",
    });
    console.log(res);
  };

  useEffect(() => {
    getStudyBoardList();
  }, []);
  return (
    <section className="page">
      {/* 스터디 */}
      <section className="center w100 ads__container">
        <h1>이벤트 / 광고</h1>
      </section>
      {/* // */}
      <div className="w100 page__title">
        <h2>스터디</h2>
      </div>
      <section className="page__body">
        <section className="row search__container">
          <button>지역</button>
          <button>태그</button>

          <div className="row search__bar__box">
            <input type="text" placeholder="검색" className="search__bar" />
            <div className="input__btn"></div>
          </div>
        </section>

        <section className="study__list__container">
          {tmp.map(() => (
            <StudyBox />
          ))}
        </section>
      </section>
      {/* # Body */}
      {/* # Ads */}
      {/* # Putter */}
    </section>
  );
};