export interface PostProps {
  postId: number;
  title: string;
  thumbnail: string | null;
  content: string;
  timestamp: string;
  memberId: string | null;
  nickname: string | null;
  profilePicUrl: string | null;
  isBookmarked: boolean;
}

export interface PostDetailProps extends PostProps {
  className?: string;
  isLoved: boolean;
  lovedCount: number;
  userJob: string;

  onUserClick: () => void;
  onContentClick: () => void;
}

export interface PostData {
  lastId: number;
  posts: PostProps[];
}
