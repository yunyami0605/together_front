import { FC, useState } from "react";
import "./BoardCommentInput.scss";
import { usePostCommentMutation } from "redux/service/comment";
import { ICommentBody } from "types/comment";

interface IProps {
  id: number;
}
export default function BoardCommentInput({ id }: IProps) {
  const [postCredentials, { isSuccess, isLoading, isError }] =
    usePostCommentMutation();

  const [content, setContent] = useState("");

  const onEnrollComment = async () => {
    const body: ICommentBody = { content, boardId: id };
    const res = await postCredentials(body)
      .unwrap()
      .then((payload) => console.log("fulfilled", payload))
      .catch((error) => console.error("rejected", error));
  };

  return (
    <div className="row comment__input__box">
      <textarea
        value={content}
        onChange={(e: any) => setContent(e.target.value)}
      />
      <button onClick={onEnrollComment} className="bold">
        {isLoading ? "등록 중.." : "등록"}
      </button>
    </div>
  );
}
