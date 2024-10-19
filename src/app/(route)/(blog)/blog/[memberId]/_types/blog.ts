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
