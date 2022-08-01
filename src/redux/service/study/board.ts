import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IGetListResData, IListRes, IRes } from "types/response";
import { IBoardBody, typeStudyBoardItem } from "types/board";
import { commonBaseQueryOption } from "redux/common";
import queryString from "query-string";

// base URL과 엔드포인트들로 서비스 정의
export const studyBoardApi = createApi({
  reducerPath: "studyBoardApi",
  baseQuery: fetchBaseQuery(commonBaseQueryOption("/study/board")),

  refetchOnMountOrArgChange: 0,
  tagTypes: ["board"],
  endpoints: (builder) => ({
    postStudyBoard: builder.mutation<typeStudyBoardItem, Partial<IBoardBody>>({
      query: ({ ...body }) => ({
        url: ``,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "board" as const, id: "LIST" }],

      transformResponse: (response: IRes<typeStudyBoardItem>, meta, arg) =>
        response.data,
    }),

    getStudyBoardList: builder.query<
      IGetListResData<typeStudyBoardItem>,
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
          credentials: "include",
        };
      },
      transformResponse: (response: IListRes<typeStudyBoardItem>, meta, arg) =>
        response.data,
      // providesTags: (result, error, arg) => [{ type: "board", id: arg }],
      providesTags: (result) =>
        result
          ? [
              ...result.list.map(({ id }) => ({ type: "board" as const, id })),
              { type: "board" as const, id: "PARTIAL-LIST" },
            ]
          : [{ type: "board" as const, id: "PARTIAL-LIST" }],
    }),

    getStudyBoard: builder.query<typeStudyBoardItem, number>({
      query: (id) => {
        return { url: `/${id}`, method: "get" };
      },
      transformResponse: (response: IRes<typeStudyBoardItem>, meta, arg) =>
        response.data,
    }),

    patchStudyBoard: builder.mutation<any, number>({
      query: (id) => {
        return {
          url: `/${id}`,
          method: "patch",
          body: { title: "테스트테스트입니다." },
        };
      },
      transformResponse: (response: IRes<number>) => response.data,
    }),

    deleteStudyBoard: builder.mutation<number, number>({
      query: (id) => {
        return { url: `/${id}`, method: "delete" };
      },
      transformResponse: (response: IRes<number>) => response.data,
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
} = studyBoardApi;
