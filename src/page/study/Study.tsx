import React, { FC, useEffect } from "react";
import "./Study.scss";
import { StudyBox } from "./components/StudyBox";
import { useGetStudyBoardListQuery } from "redux/service/study/board";
import { typeStudyBoardItem } from "types/board";

export const Study: FC = () => {
  const { data, isLoading, isSuccess, error, refetch } =
    useGetStudyBoardListQuery(1);

  console.log(data);

  useEffect(() => {
    // if (error) alert(error);
    // getStudyBoardList();
  }, [error]);

  useEffect(() => {
    refetch();
  }, []);

  // 현재 모집 인원, 전체 모집 인원, view, taglist

  return (
    <section className="page">
      {isLoading && <h1 className="loading__txt">LOADING...</h1>}
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
          {data?.list.map((val: typeStudyBoardItem, i) => (
            <React.Fragment key={i}>
              <StudyBox data={val} />
            </React.Fragment>
          ))}
        </section>
      </section>
      {/* # Body */}
      {/* # Ads */}
      {/* # Putter */}
    </section>
  );
};
