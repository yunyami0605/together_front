import { typeCommentItem } from "types/comment";
import { IGetListResData } from "types/response";

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
  writer: {
    nickname: string;
  };
  comment: typeCommentItem[];
  tagList: string[] | null;
};

export interface IBoardBody {
  title: string;
  content: string;
  type: string;
  location: string;
  persons: number;
  period: string;
  tagList: string[];
}
