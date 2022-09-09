import { IStudyBoardContent } from "types/board";
import { ILikeRes } from "types/like";
import "./ContentBody.scss";

interface IProps {
  likeData: ILikeRes | undefined;
  contentData: IStudyBoardContent | undefined;
  userId: number;
  onJoinStudy: () => void;
  onJoinCancel: () => void;
  onLike: (isLike: boolean) => Promise<void>;
  isMember: boolean;
}
export default function ContentBody({
  likeData,
  contentData,
  userId,
  onJoinStudy,
  onJoinCancel,
  onLike,
  isMember,
}: IProps) {
  return (
    <div className="study__content__body">
      {likeData?.isLike ? (
        <button className="study__like__btn" onClick={() => onLike(false)}>
          안좋아요
        </button>
      ) : (
        <button className="study__like__btn" onClick={() => onLike(true)}>
          좋아요
        </button>
      )}

      {contentData &&
        contentData?.writer.id !== userId &&
        (!isMember ? (
          <button className="study__join__btn" onClick={onJoinStudy}>
            함께하기
          </button>
        ) : (
          <button className="study__join__btn" onClick={onJoinCancel}>
            함께취소
          </button>
        ))}

      <h3>소개</h3>

      <div className="content__desc">{contentData?.content || ""}</div>

      <h3>현재 멤버</h3>

      <div className="row member__list">
        {contentData?.member.map((val: any, i: number) => (
          <div key={i} className="member__box">
            <div className="row member__info">
              <img />
              <p>{val?.nickname || ""}</p>
            </div>

            <div className="row skill__taglist">
              <span># JS</span>
              <span># REACT</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
