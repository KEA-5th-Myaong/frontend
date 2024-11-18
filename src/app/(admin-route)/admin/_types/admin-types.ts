export interface ReportedContents {
  postId: number;
  title: string;
  contentsType: 'POST' | 'COMMENT';
  contentsId: number | string;
  content: string;
  reportCount: number;
  isHidden: boolean;
}
