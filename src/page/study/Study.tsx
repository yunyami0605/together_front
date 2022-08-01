import React, { FC, useEffect, useState } from "react";
import "./Study.scss";
import { StudyBox } from "./components/StudyBox";
import { useGetStudyBoardListQuery } from "redux/service/study/board";
import { typeStudyBoardItem } from "types/board";
import SearchContainer from "./components/SearchContainer";
import PageTitle from "common/title/PageTitle";

export const Study: FC = () => {
  const [location, setLocation] = useState([0, 0, 0]);
  const [contentType, setContentType] = useState([0, 0]);
  const [page, setPage] = useState(1);
  const [searchTxt, setSearchTxt] = useState("");

  const { data, isLoading, isSuccess, error, refetch } =
    useGetStudyBoardListQuery({
      page,
      location1: location[0],
      location2: location[1],
      location3: location[2],
      contentType1: contentType[0],
      contentType2: contentType[1],
      searchTxt,
    });

  // 현재 모집 인원, 전체 모집 인원, view, taglist

  return (
    <section className="page">
      {isLoading && <h1 className="loading__txt">LOADING...</h1>}

      <PageTitle title="스터디" />

      <section className="page__body">
        <section className="page__body__upper">
          {/* # 검색 */}

          <SearchContainer
            page={page}
            setPage={setPage}
            location={location}
            setLocation={setLocation}
            contentType={contentType}
            setContentType={setContentType}
            searchTxt={searchTxt}
            setSearchTxt={setSearchTxt}
          />
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
