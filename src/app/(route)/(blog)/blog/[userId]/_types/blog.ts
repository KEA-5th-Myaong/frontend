export interface PostProps {
  id: number;
  userName: string;
  userId: string;
  userJob: string;
  postTitle: string;
  postContent: string;
  postDate: string;
  isLoved: boolean;
  lovedCount: string | number;
  isBookmarked?: boolean;
  onUserClick: () => void;
  onContentClick: () => void;
  className?: string;
}

export interface UserProfileProps {
  userName: string;
  follower: number;
  following: number;
  isFollowed: boolean;
}

export interface FollowProps {
  id: number;
  name: string;
}
