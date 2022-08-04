import { maxCountTxt } from "common/tool";
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

  console.log(data);

  return (
    <div className="border study__box" onClick={onMove}>
      <p className="board__mark">♡</p>

      <div className="study__box__cover__img">
        <img
          src={`${process.env.REACT_APP_API_BASE_URL}/${data?.imgPath}` || ""}
          alt="i"
        />
      </div>

      <div className="study__box__content">
        <div className="study__box__header">
          <p>{data.title}</p>
        </div>

        <div className="study__box__body">
          <div className="study__tag__list">
            {data?.tagList?.map((val, i) => (
              <span key={i}># {val}</span>
            ))}
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
              <p className="view__count">
                뷰 {maxCountTxt(data?.view || 0, 999)}
              </p>
              <p className="comment__count">
                댓글 {maxCountTxt(data?.comment.length || 0, 99)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
