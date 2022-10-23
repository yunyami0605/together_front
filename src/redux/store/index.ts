// src/store.ts
import { configureStore } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "redux/service/auth";
import { commentApi } from "redux/service/comment";
import { counterSlice } from "redux/service/counter/slice";
import { themeSlice } from "redux/service/counter/theme";
import { likeApi } from "redux/service/like";
import { studyBoardApi } from "redux/service/study/board";
import { userApi } from "redux/service/user";

export const store = configureStore({
  reducer: {
    // 리듀서 추가
    [studyBoardApi.reducerPath]: studyBoardApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [likeApi.reducerPath]: likeApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [counterSlice.name]: counterSlice.reducer,
    [themeSlice.name]: themeSlice.reducer,
  },
  // rtk-query의 기능, api 미들웨어 추가
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      studyBoardApi.middleware,
      userApi.middleware,
      commentApi.middleware,
      likeApi.middleware,
      authApi.middleware
    ),
  devTools: process.env.NODE_ENV !== "production",

  // 위 reducer 객체에 설정된 propery의 타입을 받아온다. store 초기 상태 값
  preloadedState: {},

  /**
   * redux에서 middleware처럼 고차함수로 구성된 store creator임
   * 이 프로퍼티에서 enhancer 순서롤 변경할 수 있다
   * ex) [applyMiddleware, offline]
   * ex) enhancers: (defaultEnhancers) => [ ...defaultEnhancers],
   */
  // enhancers: [],
  enhancers: (defaultEnhancers) => [...defaultEnhancers],
});

setupListeners(store.dispatch);
