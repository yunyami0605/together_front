import { FC, useState } from "react";
import "./BoardCommentInput.scss";
import {
  useGetCommentListQuery,
  usePostCommentMutation,
} from "redux/service/comment";
import { ICommentBody } from "types/comment";
import { useNavigate, useParams } from "react-router-dom";
import { useGetStudyBoardQuery } from "redux/service/study/board";

interface IProps {
  id: number;
}
export default function BoardCommentInput({ id }: IProps) {
  const [postCredentials, { isSuccess, isLoading, isError }] =
    usePostCommentMutation();
  const param = useParams() as { id: string };

  const navi = useNavigate();

  //   const { refetch } = useGetCommentListQuery({ page: 1, boardId: +param.id });

  const listData = useGetCommentListQuery({ boardId: +param.id, page: 1 });

  const [content, setContent] = useState("");

  const onEnrollComment = async () => {
    const body: ICommentBody = { content, boardId: id };
    const res = await postCredentials(body)
      .unwrap()
      .then((payload) => {
        if (payload) {
          listData.refetch();
          setContent("");
        }
      })
      .catch((error) => {
        if (error?.data?.data?.message === "Unauthorized") {
          navi("/login");
        }
      });
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
