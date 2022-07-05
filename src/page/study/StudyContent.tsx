import { toDate } from "common/tool";
import { FC, Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetCommentListQuery } from "redux/service/comment";
import { useGetStudyBoardQuery } from "redux/service/study/board";
import BoardCommentInput from "./components/BoardCommentInput";
import CommentItem from "./components/CommentItem";
import CommentModifyBox from "./components/CommentModifyBox";
import SearchContainer from "./components/SearchContainer";
import "./StudyContent.scss";

export const StudyContent: FC = () => {
  // const tmp = queryString();
  const param = useParams() as { id: string };

  const [page, setPage] = useState(1);

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const { data, isLoading, isSuccess, error, refetch } = useGetStudyBoardQuery(
    +param.id
    // { refetchOnMountOrArgChange: true }
  );

  const [isModalShow, setIsModalShow] = useState(false);

  const listData = useGetCommentListQuery({ boardId: +param.id, page });

  const onCommentModify = (index: number) => {
    setIsModalShow(true);
    setSelectedIndex(index);
  };

  const onMoreCommentList = () => {
    if (listData.data && listData.data?.lastPage <= page) return;
    setPage((prev: number) => prev + 1);
    // listData.;
  };

  const onRefetchCommentList = () => {
    listData.refetch();
  };

  return (
    <section className="page">
      <section className="page__body">
        {isModalShow && (
          <CommentModifyBox
            comment={listData?.data?.list[selectedIndex]}
            setIsShow={setIsModalShow}
            onRefetchCommentList={onRefetchCommentList}
          />
        )}

        <section className="page__body__upper">
          <SearchContainer />
        </section>

        <section className="page__body__lower">
          <section className="study__content">
            <div className="study__content__header">
              <h2 className="study__content__title">{data?.title || ""}</h2>

              <div className="end study__content__sub">
                <div className="row study__content__sub__info">
                  <span className="study__content__view">
                    작성자 ({data?.writer?.nickname || ""})
                  </span>
                  <span className="study__content__view">
                    뷰 {data?.view || 0}
                  </span>
                  <span className="study__content__like">
                    추천 {data?.like || 0}
                  </span>
                  <span className="study__content__dislike">
                    비추천 {data?.dislike || 0}
                  </span>
                </div>
              </div>

              <p className="bold w100 study__content__dateline">
                {toDate(data?.createdAt, "YYYY.MM.DD")}
              </p>
            </div>

            <div className="study__content__sub__header">
              <div className="option__box">
                <div className="option__box__type">종류</div>
                <div>{data?.type || ""}</div>
                <div className="option__box__type">장소</div>
                <div>{data?.location || ""}</div>
                <div></div>

                <div className="option__box__type">인원</div>
                <div>{data?.persons || 0}명</div>
                <div className="option__box__type">기간</div>
                <div>{toDate(data?.period) || "미정"}</div>
                <div></div>
              </div>

              <div className="bold">태그</div>
              <div className="row option__tag__list">
                {/* // @ 추후 */}
                <span># 4명</span>
                <span># 서울</span>
                <span># 경기</span>
                <span># 온라인</span>
              </div>
            </div>

            {/* @ des, member */}
            <div className="study__content__body">
              <h3>소개</h3>

              <div className="content__desc">{data?.content || ""}</div>

              <h3>현재 멤버</h3>

              <div className="row member__list">
                <div className="member__box">
                  <div className="row member__info">
                    <img />
                    <p>동동이</p>
                  </div>
                  <div className="row skill__taglist">
                    <span># JS</span>
                    <span># REACT</span>
                  </div>
                </div>
                <div></div>
              </div>
            </div>

            {/* @ comment */}
            <div className="study__content__comment">
              <h3>댓글 ({listData.data?.total || 0})</h3>

              <BoardCommentInput id={+param.id} />

              <div className="comment__list">
                {listData?.data?.list.map((val, i: number) => (
                  <Fragment key={i}>
                    <CommentItem
                      comment={val}
                      onCommentModify={onCommentModify}
                      index={i}
                      id={val.id}
                      onRefetchCommentList={onRefetchCommentList}
                    />
                  </Fragment>
                ))}
              </div>

              <button
                onClick={onMoreCommentList}
                className="w100 comment__list__more__btn"
              >
                더보기
              </button>
            </div>
          </section>
        </section>
      </section>
    </section>
  );
};
