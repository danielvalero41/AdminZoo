import { GET, POST } from "./request";

export const createComment = async (
  body: string,
  author: string,
  animalId: string
) => {
  const response = await POST(`/comment`, { body, author, animalId });
  return response;
};

export const replyComment = async (
  body: string,
  author: string,
  commentId: string
) => {
  const response = await POST(`/${commentId}/reply`, { body, author });
  return response;
};

type ResponseComment = Array<{
  _id: string;
  animal: string;
  author: string;
  body: string;
  date: string;
  replies: Array<string>;
}>;
export const getComments = async () => {
  const response = await GET<ResponseComment>(`/comment`);
  return response;
};

export const getResponsePercentage = async () => {
  const response = await GET(`/comment/percentage`);
  return response;
};

export const getReplayByCommentId = async (commentId: string) => {
  const response = await GET(`/comment/${commentId}/replies`);
  return response;
};
