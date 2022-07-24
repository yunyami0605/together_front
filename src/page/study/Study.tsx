import React, { FC, useEffect } from "react";
import "./Study.scss";
import { StudyBox } from "./components/StudyBox";
import { useGetStudyBoardListQuery } from "redux/service/study/board";
import { typeStudyBoardItem } from "types/board";
import SearchContainer from "./components/SearchContainer";
import PageTitle from "common/title/PageTitle";

export const Study: FC = () => {
  const { data, isLoading, isSuccess, error, refetch } =
    useGetStudyBoardListQuery({
      page: 1,
      location1: 0,
      location2: 0,
      location3: 0,
      contentType1: 0,
      contentType2: 0,
    });
  console.log(data);

  // if (error) alert(error);
  // getStudyBoardList();

  useEffect(() => {
    // refetch();
  }, []);

  // 현재 모집 인원, 전체 모집 인원, view, taglist

  return (
    <section className="page">
      {isLoading && <h1 className="loading__txt">LOADING...</h1>}

      <PageTitle title="스터디" />

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
