export interface QnA {
  id: string;
  title: string;
  message: string;
  status: "pending" | "answered" | "closed";
  answer?: string | null;
  userId: string;
  userName: string;
  answeredBy?: string | null;
  answeredByName?: string | null;
  createdAt: string;
  updatedAt: string;
  answeredAt?: string | null;
  isRead?: boolean;
}

export interface QnAQuery {
  page?: number;
  pageSize?: number;
  status?: "pending" | "answered" | "closed";
  search?: string;
}

export interface QnAForm {
  title: string;
  message: string;
}

export interface QnAResponse {
  message: string;
  success: boolean;
  returnCode: string;
  result: {
    qnAs: QnA[];
    totalCount: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

export interface CreateQnARequest {
  title: string;
  message: string;
}

export interface CreateQnAResponse {
  id: string;
  title: string;
  message: string;
  status: "pending";
  createdAt: string;
  userId: string;
}
