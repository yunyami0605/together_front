import { FC, useState } from "react";
import "./CommentItem.scss";
import { typeCommentItem } from "types/comment";
import { toDate } from "common/tool";
import { useDeleteCommentMutation } from "redux/service/comment";

interface IProps {
  comment: typeCommentItem;
  onCommentModify: (index: number) => void;
  index: number;
  id: number;
  onRefetchCommentList: () => void;
}
export default function CommentItem({
  comment,
  onCommentModify,
  index,
  id,
  onRefetchCommentList,
}: IProps) {
  const [deleteMutation, {}] = useDeleteCommentMutation();

  const onDeleteComment = () => {
    deleteMutation(id)
      .unwrap()
      .then((success) => {
        if (success) {
          onRefetchCommentList();
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="comment__list__item">
      <div className="between list__item__header">
        <div className="row">
          <p className="bold comment__item__writer">{comment.id}</p>
          <p className="">{toDate(comment.createdAt)}</p>
        </div>

        <div className="comment__sub__btnline">
          <button
            onClick={() => onCommentModify(index)}
            className="comment__modify__btn"
          >
            수정
          </button>
          <button onClick={onDeleteComment} className="comment__delete__btn">
            삭제
          </button>
        </div>
      </div>

      <div className="row list__item__body">
        <p>{comment?.content || ""}</p>
      </div>
    </div>
  );
}
