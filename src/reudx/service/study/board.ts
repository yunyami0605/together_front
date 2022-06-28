import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookieValue } from "common/tool";

export type typeStudyBoardItem = {
  id: number;
  title: string;
  content: string;
  type: string;
  location: string;
  persons: number;
  period: string;
  like: number;
  dislike: number;
  view: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  author: {
    nickname: string;
  };
};

interface IGetListResData<K> {
  curPage: number;
  perPage: number;
  total: number;
  lastPage: number;
  list: K[];
}

interface IListRes<T> {
  data: IGetListResData<T>;
  statusCode: number;
}

interface IRes<T> {
  data: T;
  statusCode: number;
}

interface IPostRes<T> {
  data: T;
  statusCode: number;
}

export interface IBoardBody {
  title: string;
  content: string;
  type: string;
  location: string;
  persons: number;
  period: string;
  tagList: string[];
}

// base URL과 엔드포인트들로 서비스 정의
export const studyBoardApi = createApi({
  reducerPath: "studyBoardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE_URL + "/study/board",
    prepareHeaders(headers) {
      const token = getCookieValue("toat");

      headers.set("Authorization", `Bearer ${token}`);
      headers.set("Accept", `application/json`);

      return headers;
    },

    credentials: "include",
  }),

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

      transformResponse: (response: IPostRes<typeStudyBoardItem>, meta, arg) =>
        response.data,
    }),

    getStudyBoardList: builder.query<
      IGetListResData<typeStudyBoardItem>,
      number
    >({
      query: (page) => {
        return {
          url: `/list?page=${page}`,
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

    patchStudyBoard: builder.mutation<number, number>({
      query: (id) => `/${id}`,
      transformResponse: (response: IRes<number>) => response.data,
    }),

    deleteStudyBoard: builder.mutation<number, number>({
      query: (id) => `/${id}`,
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
