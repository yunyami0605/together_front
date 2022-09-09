import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type ColorScheme = "light" | "dark";

export interface ThemeState {
  colorScheme: ColorScheme;
}

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    colorScheme: "light",
  } as ThemeState,
  reducers: {
    changeColorScheme(state, action: PayloadAction<ColorScheme>) {
      state.colorScheme = action.payload;
    },
  },
});

export type ThemeSlice = {
  [themeSlice.name]: ReturnType<typeof themeSlice["reducer"]>;
};

export const themeActions = themeSlice.actions;
