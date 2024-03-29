import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { commonBaseQueryOption, customFetchBase } from "redux/common";
import queryString from "query-string";
import { IRes } from "types/response";
import { ILikeRes } from "types/like";

export const likeApi = createApi({
  reducerPath: "likeApi",
  baseQuery: customFetchBase,
  // baseQuery: fetchBaseQuery(commonBaseQueryOption("/like")),
  tagTypes: ["like"],
  endpoints: (builder) => ({
    //
    postLike: builder.mutation<any, { boardId: string; isLike: boolean }>({
      query: (body) => {
        return {
          url: "/like",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["like"],

      transformResponse: (response: any, meta) => response.data,
    }),

    //
    getLikeList: builder.query<ILikeRes, { board_id: string; user_id: number }>(
      {
        query: (queryData) => {
          return {
            url: `/like/list?${queryString.stringify(queryData)}`,
          };
        },
        transformResponse: (response: IRes<ILikeRes>, meta, arg) =>
          response.data,
      }
    ),

    //
  }),
});

export const {
  usePostLikeMutation,
  useGetLikeListQuery,
  //
} = likeApi;
