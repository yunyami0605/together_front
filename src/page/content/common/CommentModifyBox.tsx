import { FC, useState } from "react";
import { usePatchCommentBoardMutation } from "redux/service/comment";
import { usePatchStudyBoardMutation } from "redux/service/study/board";
import { typeCommentItem } from "types/comment";
import "./CommentModifyBox.scss";

interface IProps {
  comment?: typeCommentItem;
  setIsShow: (isShow: boolean) => void;
  onRefetchCommentList: () => void;
}
export default function CommentModifyBox({
  comment,
  setIsShow,
  onRefetchCommentList,
}: IProps) {
  const [content, setContent] = useState(comment?.content || "");
  const [postCredentials, { isSuccess, isLoading, isError }] =
    usePatchCommentBoardMutation();

  const onModify = () => {
    if (!content.length) return alert("4자 이상 입력해주세요");

    postCredentials({ id: comment?.id, body: { content: content } })
      .unwrap()
      .then((payload) => {
        if (payload) {
          onRefetchCommentList();
          setIsShow(false);
        }
      })
      .catch((error) => console.error("rejected", error));
    // test[0](15);
  };

  return (
    <div className="comment__modify__box">
      <div className="between comment__modify__header">
        <p className="bold">수정</p>

        <button
          className="bold modal__close__btn"
          onClick={() => setIsShow(false)}
        >
          X
        </button>
      </div>

      <div className="comment__modify__body">
        <textarea
          className="comment__modify__input"
          value={content}
          onChange={(e: any) => setContent(e.target.value)}
        />
      </div>

      <div className="end comment__modify__putter">
        <button className="modal__ok__btn" onClick={onModify}>
          수정하기
        </button>
      </div>
    </div>
  );
}
