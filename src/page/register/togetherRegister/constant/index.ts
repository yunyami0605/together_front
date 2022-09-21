import moment from "moment";

export const initFormDataState = {
  title: "",
  content: "",
  togetherType: 0,
  contentType1: 0,
  contentType2: 0,
  location1: 0,
  location2: 0,
  location3: 0,
  persons: 0,
  tagList: [] as string[],
  period: moment().format("YYYYMMDD"),
  image: undefined as File | undefined,
};

export type tFormData = typeof initFormDataState;
