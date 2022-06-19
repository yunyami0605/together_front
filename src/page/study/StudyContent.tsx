import { FC } from "react";
import { useParams } from "react-router-dom";
import { useGetStudyBoardQuery } from "reudx/service/study/board";
import "./StudyContent.scss";

export const StudyContent: FC = () => {
  // const tmp = queryString();
  const param = useParams() as { id: string };

  const { data, isLoading, isSuccess, error, refetch } = useGetStudyBoardQuery(
    +param.id
  );

  return (
    <section className="page">
      {/* 스터디 */}
      {/* <Header /> */}
      {/* # Header */}
      <section className="center w100 ads__container">
        <h1>이벤트 / 광고</h1>
      </section>
      {/* // */}

      <section className="page__body">
        <section className="study__content">
          <div className="study__content__header">
            <h3 className="study__content__title">{data?.title}</h3>

            <div className="between study__content__sub">
              <h3 className="study__content__master">쿠키</h3>

              <div className="row study__content__sub__info">
                <span className="study__content__view">뷰 24</span>
                <span className="study__content__like">추천 13</span>
                <span className="study__content__dislike">비추천 2</span>
              </div>
            </div>

            <p className="bold w100 study__content__dateline">2022-02-03</p>
          </div>

          <div className="study__content__option">
            <div className="option__box">
              <div className="bold">종류</div>
              <div>{data?.type || ""}</div>
              <div className="bold">장소</div>
              <div>{data?.location || ""}</div>
              <div></div>

              <div className="bold">인원</div>
              <div>{data?.persons || 0}명</div>
              <div className="bold">기간</div>
              <div>미정</div>
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

            <div className="content__desc">
              {data?.content || ""}
              {/* {`스터디 주제 : 팀 프로젝트 스터디\n
              목표 : 결과물 만들어내기! \n(첫 프로젝트는 네이버 웹툰 클론 코딩입니다.) 저희 스터디는 js를
              스터디 일정(횟수) : (평일) 월,수,금 8시~12시, (주말) 일요일 8시~12시 \n
              처음 시작하시는 분들도 있고, 다 같이 공부하려고 모이는 스터디 그룹입니다.\n`} */}
            </div>

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
            <h3>댓글 (10)</h3>

            <div className="row comment__input__box">
              <textarea />
              <button className="bold">등록</button>
            </div>

            <div className="comment__list">
              <div className="comment__list__item">
                <div className="row list__item__header">
                  <p className="bold">다크</p>
                  <p className="">2022-02-02</p>
                </div>

                <div className="row list__item__body">
                  <p>너무 좋아좋아</p>
                </div>
              </div>
            </div>

            <button className="w100 comment__list__more__btn">더보기</button>
          </div>
        </section>
      </section>
    </section>
  );
};
