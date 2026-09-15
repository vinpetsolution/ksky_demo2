// ═══════════════════════════════════════
// Transaction types
// ═══════════════════════════════════════

export type TransactionType = "deposit" | "withdrawal";

export interface TransactionRequest {
  userId: string;
  amount: number;
  type: TransactionType;
  transaction_password?: string;
}

export interface TransactionListItem {
  id: string;
  userId: string;
  amount: number;
  type: "Deposit" | "Withdrawal" | "Transfer";
  status: "PENDING" | "COMPLETED" | "CANCELLED";
  note: string;
  createdAt: string;
  updatedAt: string;
}

export interface TransactionListQuery {
  page: number;
  pageSize: number;
  type?: "Deposit" | "Withdrawal" | "Transfer";
  userId?: string;
}

export interface TransactionListResponse {
  success: boolean;
  message: string;
  data: {
    transactions: TransactionListItem[];
    totalCount: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
  errors: string[];
}

export interface TransferPointRequest {
  userId: string;
  balancePoint: number;
}
