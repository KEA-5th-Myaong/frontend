export interface Inquiry {
  inquiryId: number;
  title: string;
  isSecret: boolean;
  userName: string;
  timestamp: string;
}

export interface InquiryResponse {
  pageSize: number;
  nextPage: number;
  inquiries: Inquiry[];
}
