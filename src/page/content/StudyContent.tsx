import { getUserInfo } from "common/tool";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCommentListQuery } from "redux/service/comment";
import { themeActions, ThemeSlice } from "redux/service/counter/theme";
import { useGetLikeListQuery, usePostLikeMutation } from "redux/service/like";
import {
  useDeleteBoardMemberMutation,
  useDeleteStudyBoardMutation,
  useGetStudyBoardQuery,
  usePatchBoardMemberMutation,
} from "redux/service/study/board";
import CommentContainer from "./common/comment/CommentContainer";
import CommentModifyBox from "./common/CommentModifyBox";
import ContentBody from "./common/info/ContentBody";
import ContentHeader from "./common/info/ContentHeader";
import "./StudyContent.scss";

export const StudyContent: FC = () => {
  const param = useParams() as { id: string };
  const sub = getUserInfo("sub");

  const theme = useSelector((state: ThemeSlice) => state.theme);
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const getStudyBoard = useGetStudyBoardQuery(+param.id);

  const [userId, setUserId] = useState(-1);

  const getLikeList = useGetLikeListQuery({
    board_id: param.id,
    user_id: userId,
  });

  const [isMember, setIsMember] = useState(false);

  const navi = useNavigate();

  const deleteStudyBoard = useDeleteStudyBoardMutation();

  const [isModalShow, setIsModalShow] = useState(false);

  const { data, refetch } = useGetCommentListQuery({
    boardId: +param.id,
    page,
  });

  const patchBoardMember = usePatchBoardMemberMutation();
  const deleteBoardMember = useDeleteBoardMemberMutation();
  const postLike = usePostLikeMutation();

  const onCommentModify = (index: number) => {
    setIsModalShow(true);
    setSelectedIndex(index);
  };

  const onMoreCommentList = () => {
    if (data && data?.lastPage <= page) return;
    setPage((prev: number) => prev + 1);
  };

  const onDeleteContent = () => {
    if (!window.confirm("게시글을 삭제하시겠습니까?")) return;

    deleteStudyBoard[0](+param.id)
      .unwrap()
      .then((payload) => {
        console.log(payload);
        alert("게시글이 삭제되었습니다.");

        navi("/study", { replace: true });
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  const onModifyContent = () => {
    navi(`/together/modify/${param.id}`, { state: { id: param.id } });
  };

  const onJoinStudy = () => {
    if (!param?.id) return;

    const [patch, { isLoading }] = patchBoardMember;
    if (isLoading) return;

    patch(param?.id)
      .unwrap()
      .then((payload) => {
        getStudyBoard.refetch();
        console.log(payload);
      })
      .catch((error) => console.error("rejected", error));
  };

  /**
   *@description : join cancel eventhandler
   */
  const onJoinCancel = () => {
    if (!param?.id) return;

    const [patch, { isLoading }] = deleteBoardMember;
    if (isLoading) return;

    patch(param?.id)
      .unwrap()
      .then((payload) => {
        getStudyBoard.refetch();
        console.log(payload);
      })
      .catch((error) => console.error("rejected", error));
  };

  /**
   *@description : board like patch event handler
   *@param {boolean} isLike - like or dislike
   */
  const onLike = async (isLike: boolean) => {
    //
    if (!param?.id) return;

    // const body = new FormData();
    // body.append("boardId", param?.id);
    const [patch, { isLoading }] = postLike;

    if (isLoading) return;

    const body = {
      boardId: param?.id,
      isLike,
    };

    await patch(body)
      .unwrap()
      .then((payload) => {
        getLikeList.refetch();
        console.log(payload);
      })
      .catch((error) => {
        if (error.data?.data?.message === "Unauthorized") {
          navi("/login");
        }
      });
  };

  useEffect(() => {
    // 해당 유저가 모임 유저인지 판별
    let _isMember = false;
    getStudyBoard.data?.member.forEach((val) => {
      if (val.id === userId) {
        _isMember = true;
      }
    });
    setIsMember(_isMember);
  }, [getStudyBoard.data]);

  useEffect(() => {
    // user id 조회
    if (sub && sub !== userId) setUserId(sub);
  }, [sub]);

  return (
    <section className="page">
      <section className="page__body">
        {isModalShow && (
          <CommentModifyBox
            comment={data?.list[selectedIndex]}
            setIsShow={setIsModalShow}
            onRefetchCommentList={refetch}
          />
        )}

        <section className="page__body__upper" />

        <section className="page__body__lower">
          <section className="study__content">
            {/* @ header */}
            <ContentHeader
              userId={userId}
              data={getStudyBoard.data}
              onModifyContent={onModifyContent}
              onDeleteContent={onDeleteContent}
            />

            {/* @ des, member */}
            <ContentBody
              likeData={getLikeList.data}
              contentData={getStudyBoard.data}
              userId={userId}
              onJoinStudy={onJoinStudy}
              onJoinCancel={onJoinCancel}
              onLike={onLike}
              isMember={isMember}
            />

            {/* @ comment */}
            <CommentContainer
              data={data}
              boardId={param.id}
              onCommentModify={onCommentModify}
              onRefetchCommentList={refetch}
              onMoreCommentList={onMoreCommentList}
            />
          </section>
        </section>
      </section>
    </section>
  );
};
