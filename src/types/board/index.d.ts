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
  updatedAt: string;
  deletedAt?: string;
  writer: {
    nickname: string;
  };
  comment: IGetListResData<typeCommentItem>;
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
