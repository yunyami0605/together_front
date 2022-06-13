import { FC } from "react";
import { useNavigate } from "react-router-dom";
import "./StudyBox.scss";

export const StudyBox: FC = () => {
  const navi = useNavigate();
  return (
    <div className="border study__box" onClick={() => navi("/study/3")}>
      <div className="study__box__header">
        <p>자바스크립트 같이하실 분들 구합니다.</p>
      </div>

      <div className="study__box__body">
        <div className="study__tag__list">
          <span>#JS</span>
          <span>#TS</span>
          <span>#REACT</span>
        </div>
      </div>

      <div className="study__box__putter">
        <div className="row putter__line">
          <div className="user__img"></div>
          <p className="user__nickname">쿠키</p>
        </div>

        <div className="row between putter__line">
          <p className="recruit__count">모집 인원 1/6</p>

          <div className="row sub__line">
            <p className="view__count">14</p>
            <p className="comment__count">4</p>
          </div>
        </div>
      </div>
    </div>
  );
};
