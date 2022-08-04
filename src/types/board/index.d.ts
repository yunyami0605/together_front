import { typeCommentItem } from "types/comment";
import { IGetListResData } from "types/response";

export type typeStudyBoardItem = {
  id: number;
  title: string;
  content: string;
  togetherType: number;
  location1: number;
  location2: number;
  location3: number;
  contentType1: number;
  contentType2: number;
  persons: number;
  period: string;
  like: number;
  dislike: number;
  view: number;
  createdAt: string;
  writer: {
    id: number;
    nickname: string;
  };
  comment: typeCommentItem[];
  tagList: string[] | null;
  imgPath: string | null;
};

export interface IBoardBody {
  title: string;
  content: string;
  togetherType: number;
  contentType1: number;
  contentType2: number;
  location1: number;
  location2: number;
  location3: number;
  persons: number;
  period: string;
  tagList: string[];
  image: string;
}
