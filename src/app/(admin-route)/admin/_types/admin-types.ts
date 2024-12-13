export interface ReportedContents {
  postId: number;
  title: string;
  contentsType: 'POST' | 'COMMENT';
  contentsId: number | string;
  content: string;
  reportCount: number;
}

export interface AdminContents {
  lastId: string;
  contents: ReportedContents[];
}
