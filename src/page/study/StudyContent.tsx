import { FC } from "react";
import "./StudyContent.scss";

export const StudyContent: FC = () => {
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
            <h3 className="study__content__title">
              [스터디] 자바스크립트 공부하실분들 구합니다.2
            </h3>

            <div className="between study__content__sub">
              <h2 className="study__content__master">쿠키</h2>

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
              <div>스터디 / IT개발</div>
              <div className="bold">장소</div>
              <div>서울</div>
              <div></div>

              <div className="bold">인원</div>
              <div>4명</div>
              <div className="bold">기간</div>
              <div>미정</div>
              <div></div>
            </div>

            <div className="bold">태그</div>
            <div className="row option__tag__list">
              <span># 4명</span>
              <span># 서울</span>
              <span># 경기</span>
              <span># 온라인</span>
            </div>
          </div>

          {/* @ des, member */}
          <div className="study__content__body">
            <h3>소개</h3>

            <div className="content__desc"></div>

            <h3>현재 멤버</h3>

            <div className="content__desc"></div>
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
