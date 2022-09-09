import { IGetListResData, IListRes, IRes } from "types/response";
import { IBoardBody, IStudyBoardContent, IStudyBoardItem } from "types/board";
import queryString from "query-string";

import { commonBaseQueryOption } from "redux/common";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// base URL과 엔드포인트들로 서비스 정의
export const studyBoardApi = createApi({
  reducerPath: "studyBoardApi",
  baseQuery: fetchBaseQuery(commonBaseQueryOption("/study/board")),
  keepUnusedDataFor: 60,
  // refetchOnMountOrArgChange: 10,

  refetchOnFocus: true,
  tagTypes: ["board"],
  endpoints: (builder) => ({
    postStudyBoard: builder.mutation<IStudyBoardItem, FormData>({
      query: (body) => {
        return {
          url: ``,
          method: "POST",
          body,
          // headers: {
          //   "content-type": "multipart/form-data",
          // },
        };
      },

      invalidatesTags: ["board"],
      transformResponse: (response: IRes<IStudyBoardItem>, meta, arg) =>
        response.data,

      // query결과를 받아서 서버에 요청하여 결과를 받기 전에 캐쉬를 update하거나 다른 처리로 가공할 수 있다
      // onQueryStarted는 optimistic 업데이트에 유용합니다.
      // 이때 queryFulfilled(Promise) 을 실행하여 쿼리 확정한 후 에러면 1)redo 2) 전체 refetching
      async onQueryStarted(
        arg,
        { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }
      ) {},

      async onCacheEntryAdded(
        arg,
        {
          dispatch,
          getState,
          extra,
          requestId,
          cacheEntryRemoved,
          cacheDataLoaded,
          getCacheEntry,
        }
      ) {},
    }),

    /**
     *@description add board member, usePatchBoardMemberMutation
     *@param {string} id - board id
     */
    patchBoardMember: builder.mutation<any, string>({
      query: (id) => {
        return {
          url: `/${id}/member`,
          method: "PATCH",
        };
      },
      transformResponse: (response: IRes<number>) => response.data,
    }),

    /**
     *@description cancel board member, useDeleteBoardMemberMutation
     *@param {string} id - board id
     */
    deleteBoardMember: builder.mutation<any, string>({
      query: (id) => {
        return {
          url: `/${id}/member`,
          method: "DELETE",
        };
      },
      transformResponse: (response: IRes<number>) => response.data,
    }),

    getStudyBoardList: builder.query<
      IGetListResData<IStudyBoardItem>,
      {
        page: number;
        location1?: number;
        location2?: number;
        location3?: number;
        contentType1?: number;
        contentType2?: number;
        searchTxt?: string;
      }
    >({
      query: (queryData) => {
        return {
          url: `/list?${queryString.stringify(queryData)}`,
        };
      },
      // keepUnusedDataFor: 60,
      providesTags: ["board"],
      transformResponse: (response: IListRes<IStudyBoardItem>, meta, arg) => {
        return response.data;
      },

      onQueryStarted: () => {
        return;
      },

      onCacheEntryAdded: () => {
        return;
      },
    }),

    getStudyBoard: builder.query<IStudyBoardContent, number>({
      query: (id) => {
        return { url: `/${id}`, method: "GET" };
      },
      providesTags: ["board"],
      transformResponse: (response: IRes<IStudyBoardContent>, meta, arg) =>
        response.data,
    }),

    patchStudyBoard: builder.mutation<any, number>({
      query: (id) => {
        return {
          url: `/${id}`,
          method: "PATCH",
          body: { title: "테스트테스트입니다." },
        };
      },
      transformResponse: (response: IRes<number>) => response.data,
    }),

    deleteStudyBoard: builder.mutation<number, number>({
      query: (id) => {
        return { url: `/${id}`, method: "DELETE" };
      },
      transformResponse: (response: IRes<number>) => response.data,
    }),

    uploadTmpImage: builder.mutation<string, FormData>({
      query: (body) => {
        return {
          url: `/upload/tmp_image`,
          method: "POST",
          body,
        };
      },
      transformResponse: (response: IRes<string>) => response.data,
    }),
  }),
});

// 정의된 엔드포인트에서 자동으로 생성된 훅을 함수형 컴포넌트에서 사용하기 위해 export
export const {
  useGetStudyBoardListQuery,
  usePostStudyBoardMutation,
  useGetStudyBoardQuery,
  usePatchStudyBoardMutation,
  useDeleteStudyBoardMutation,
  usePatchBoardMemberMutation,
  useDeleteBoardMemberMutation,
  useUploadTmpImageMutation,
} = studyBoardApi;
