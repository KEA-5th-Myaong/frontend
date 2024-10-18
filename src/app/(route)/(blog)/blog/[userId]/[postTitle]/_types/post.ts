export interface CommentProps {
  id: number;
  parent_comment_id: number | null;
  userName: string;
  comment: string;
  updatedAt: string;
}
