export interface Notice {
  id: string;
  title: string;
  kind: string;
  message: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  isRead: boolean;
}

export interface NoticeListRequest {
  page: number;
  pageSize: number;
  username?: string;
  title?: string;
}

export interface NoticeListResponse {
  success: boolean;
  message: string;
  data: {
    result: Notice[];
    page: number;
    pageSize: number;
    totalPages: number;
    totalCount: number;
  };
  errors: string[];
}
