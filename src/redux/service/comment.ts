import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { responseInterceptor } from "http-proxy-middleware";
import { commonBaseQueryOption } from "redux/common";
import {
  ICommentBody,
  typeCommentItem,
  typePostCommentRes,
} from "types/comment";
import { IGetListResData, IListRes, IRes } from "types/response";

// comment api
export const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: fetchBaseQuery(commonBaseQueryOption("/comment")),

  refetchOnMountOrArgChange: 0,
  tagTypes: ["comment"],
  endpoints: (builder) => ({
    // api post comment
    postComment: builder.mutation<typePostCommentRes, ICommentBody>({
      query: ({ ...body }) => ({
        url: "",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "comment" as const, id: "LIST" }],

      transformResponse: (response: IRes<any>, meta, arg) => response.data,
    }),

    // api get comment list
    getCommentList: builder.query<
      IGetListResData<typeCommentItem>,
      { page: number; boardId: number }
    >({
      query: ({ page, boardId }) => {
        return {
          url: `/list?page=${page}&boardId=${boardId}`,
        };
      },
      transformResponse: (response: IListRes<typeCommentItem>) => response.data,

      providesTags: (result) =>
        result
          ? [
              ...result.list.map(({ id }) => ({
                type: "comment" as const,
                id,
              })),
              { type: "comment" as const, id: "PARTIAL-LIST" },
            ]
          : [{ type: "comment" as const, id: "PARTIAL-LIST" }],
    }),

    // api get comment content
    getComment: builder.query<typeCommentItem, number>({
      query: (id) => {
        return { url: `/${id}`, method: "GET" };
      },
      transformResponse: (response: IRes<any>) => response.data,
    }),

    // api patch comment content
    patchCommentBoard: builder.mutation<
      number,
      { id?: number; body: { content: string } }
    >({
      query: ({ id, body }) => ({
        url: `/${id}`,
        method: "PATCH",
        body,
        credentials: "include",
      }),
      transformResponse: (response: IRes<number>) => response.data,
    }),

    // api delete comment content
    deleteComment: builder.mutation<number, number>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      transformResponse: (response: IRes<number>) => response.data,
    }),
  }),
});

export const {
  usePostCommentMutation,
  useGetCommentQuery,
  useGetCommentListQuery,
  usePatchCommentBoardMutation,
  useDeleteCommentMutation,
} = commentApi;
