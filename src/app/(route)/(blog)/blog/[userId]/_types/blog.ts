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
  onUserClick: () => void;
  onContentClick: () => void;
}
