// src/store.ts
import { configureStore } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";
import { studyBoardApi } from "redux/service/study/board";
import { userApi } from "redux/service/user";

export const store = configureStore({
  reducer: {
    // 특정 top-level slice에서 생성된 리듀서를 추가
    [studyBoardApi.reducerPath]: studyBoardApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  // 캐싱, 요청 취소, 폴링 등등 유용한 rtk-query의 기능들을 위한 api 미들웨어 추가
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(studyBoardApi.middleware, userApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

// 옵셔널, refetchOnFocus/refetchOnReconnect 기능을 위해 필요함
// setupListeners 문서를 참고 - 커스텀을 위한 옵셔널 콜백을 2번째 인자로 받음
setupListeners(store.dispatch);
