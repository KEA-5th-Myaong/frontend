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
  isLiked: boolean;
  likeCount: number;
  prejob: string;

  onLoveClick?: () => void;
  onBookmarkClick?: () => void;
  onUserClick: () => void;
  onContentClick: () => void;

  className?: string;
}

// 메인 페이지 포스트 피드
export interface PostFeedProps {
  activeTab: string;
  preJob: string[];
}
// API로 불러오는 포스트 데이터
export interface PostResponse {
  pages: PostResponse[] | undefined;
  data: {
    lastId: number;
    posts: PostProps[];
  };
}

// 관심 직군(JobProps, InterestedJobProps, Category, CategoryData)
export interface JobProps {
  jobId: number;
  jobName: string;
}
export interface InterestedJobProps {
  onClose: () => void;
}
export interface Category {
  categoryName: string;
  jobs: JobProps[];
}
export interface CategoryData extends Array<Category> {}
