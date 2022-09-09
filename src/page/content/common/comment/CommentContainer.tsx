import { toNumber } from "common/tool";
import { FC, Fragment, useState } from "react";
import { typeCommentItem } from "types/comment";
import { IGetListResData } from "types/response";
import BoardCommentInput from "./BoardCommentInput";
import CommentItem from "./CommentItem";
import "./CommentContainer.scss";

interface IProps {
  data: IGetListResData<typeCommentItem> | undefined;
  boardId: string;
  onCommentModify: (index: number) => void;
  onRefetchCommentList: () => void;
  onMoreCommentList: () => void;
}
export default function CommentContainer({
  data,
  boardId,
  onCommentModify,
  onRefetchCommentList,
  onMoreCommentList,
}: IProps) {
  return (
    <div className="study__content__comment">
      <h3>댓글 ({data?.total || 0})</h3>

      <BoardCommentInput id={toNumber(boardId)} />

      <div className="comment__list">
        {data &&
          data?.list.map((val, i: number) => (
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
  );
}
