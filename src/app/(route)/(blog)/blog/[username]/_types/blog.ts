export interface UserProfileProps {
  userName: string;
  follower: number;
  following: number;
  isFollowed: boolean;
}

export interface FollowingProps {
  lastId: number;
  following: [
    {
      memberId: number;
      nickname: string;
      profilePicUrl: string;
      isFollowed: boolean;
    },
  ];
}

export interface FollowedProps {
  lastId: number;
  followed: [
    {
      memberId: number;
      nickname: string;
      profilePicUrl: string;
      isFollowed: boolean;
    },
  ];
}

// 포스트 작성 페이지
export interface PostWriteProps {
  title: string;
  content: string;
}
