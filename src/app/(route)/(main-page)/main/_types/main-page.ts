// 각 Post 리스트 개별 박스들
export interface PostProps {
  postId: number;
  title: string;
  thumbnail: string | null;
  content: string | JSX.Element;
  timestamp: string;
  memberId: string | null;
  nickname: string | null;
  username?: string | null;
  profilePicUrl: string | null;
  isBookmarked: boolean;
  isLoved: boolean;
  lovedCount: number;
  userJob: string;

  onLoveClick?: () => void;
  onBookmarkClick?: () => void;
  onUserClick: () => void;
  onContentClick: () => void;

  className?: string;
}

export interface PostFeedProps {
  activeTab: string;
  preJob: string[];
}

export interface PostResponse {
  pages: PostResponse[] | undefined;
  data: {
    lastId: number;
    posts: PostProps[];
  };
}

// 관심 직군(Job, InterestedJobProps, Category, CategoryData)
export interface Job {
  jobId: number;
  jobName: string;
}

export interface InterestedJobProps {
  onClose: () => void;
}

export interface Category {
  categoryName: string;
  jobs: Job[];
}

export interface CategoryData extends Array<Category> {}
