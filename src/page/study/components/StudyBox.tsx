import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { typeStudyBoardItem } from "types/board";
import "./StudyBox.scss";

interface IProps {
  data: typeStudyBoardItem;
}

export const StudyBox = ({ data }: IProps) => {
  const navi = useNavigate();

  const onMove = () => {
    if (!data?.id) return alert("No access");
    navi(`/study/${data.id}`);
  };

  return (
    <div className="border study__box" onClick={onMove}>
      <div className="study__box__header">
        <p>{data.title}</p>
      </div>

      <div className="study__box__body">
        <div className="study__tag__list">
          {/* // @ 추후 */}
          <span>#JS</span>
          <span>#TS</span>
          <span>#REACT</span>
        </div>
      </div>

      <div className="study__box__putter">
        <div className="row putter__line">
          {/* // @ 추후 */}
          <div className="user__img"></div>
          <p className="user__nickname">{data?.writer.nickname || ""}</p>
        </div>

        <div className="row between putter__line">
          <p className="recruit__count">{`모집 인원 1/${
            data?.persons || ""
          }`}</p>

          <div className="row sub__line">
            <p className="view__count">{data?.view}</p>
            <p className="comment__count">4</p>
          </div>
        </div>
      </div>
    </div>
  );
};
