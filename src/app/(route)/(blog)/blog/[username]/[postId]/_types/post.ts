export interface CommentProps {
  profilePicUrl: string;
  memberId: number | null;
  nickname: string | null;
  commentId: number;
  parent_comment_id: number | null;
  comment: string;
  timestamp: string;
}

export interface BlogPost {
  title: string;
  content: string;
  timestamp: string;
  memberId: number | null;
  nickname: string | null;
  profilePic: string | null;
  likeCount: number;
  isBookmarked: boolean;
  commentCount: number;
  comments: CommentProps[];
}
