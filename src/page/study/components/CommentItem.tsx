import { FC, useState } from "react";
import "./CommentItem.scss";
import { typeCommentItem } from "types/comment";
import { toDate } from "common/tool";

interface IProps {
  comment: typeCommentItem;
}
export default function CommentItem({ comment }: IProps) {
  return (
    <div className="comment__list__item">
      <div className="row list__item__header">
        <p className="bold">{comment.id}</p>
        <p className="">{toDate(comment.createdAt)}</p>
      </div>

      <div className="row list__item__body">
        <p>{comment?.content || ""}</p>
      </div>
    </div>
  );
}
