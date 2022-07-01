export type typeCommentItem = {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export interface ICommentBody {
  boardId: number;
  content: string;
}

export type typePostCommentRes = {
  content: string;
  writerId: number;
  boardId: number;
  deletedAt: string | null;
  id: number;
  createdAt: string;
  updatedAt: string;
};
