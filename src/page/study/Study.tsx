import React, { FC, useEffect } from "react";
import "./Study.scss";
import { StudyBox } from "./components/StudyBox";
import { useGetStudyBoardListQuery } from "redux/service/study/board";
import { typeStudyBoardItem } from "types/board";
import SearchContainer from "./components/SearchContainer";

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

      {/* // */}
      <div className="w100 row page__title">
        <h2>스터디</h2>
      </div>

      <section className="page__body">
        <section className="page__body__upper">
          {/* # 검색 */}

          <SearchContainer />
        </section>

        <section className="page__body__lower">
          {/* # 내용 */}
          <section className="study__list__container">
            {data?.list.map((val: typeStudyBoardItem, i) => (
              <React.Fragment key={i}>
                <StudyBox data={val} />
              </React.Fragment>
            ))}
          </section>
        </section>
      </section>
      {/* # Body */}
      {/* # Ads */}
      {/* # Putter */}
    </section>
  );
};
