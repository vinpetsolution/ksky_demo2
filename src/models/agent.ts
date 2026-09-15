// ═══════════════════════════════════════
// Sub-user / Agent types
// ═══════════════════════════════════════

export interface SubUser {
  userId: string;
  balanceMoney: number;
  gameCount: number;
  totalIncome: number;
  totalPoint: number;
  agentFeeSlot: number;
  agentFeeCasino: number;
  totalBettingAmount: number;
  parentId?: string;
  children?: SubUser[];
  level?: number;
  isExpanded?: boolean;
  hasChildren?: boolean;
  status?: string;
  phone?: string;
  userName?: string;
}

export interface AgentInfo {
  agentUserId: string;
  remainingPoints: number;
  totalSubMembers: number;
  totalGameCount: number;
  totalBettingAmount: number;
  totalProfitAmount: number;
  totalProfitPoints: number;
  feeCasino: number;
  feeSlot: number;
}

// ─── Transaction History ────────────────────
export interface TransactionHistoryQuery {
  page: number;
  pageSize: number;
  userId: string;
}

// ─── Bet History ────────────────────────────
export interface BetHistoryQuery {
  page: number;
  pageSize: number;
  userId: string;
  startDate?: string;
  endDate?: string;
}

export interface BetHistoryItem {
  _id: string;
  userId: string;
  gameId: string;
  vendorName: string;
  gameName: string;
  betAmount: number;
  agentId: string;
  winAmount: number;
  result: "Win" | "Lose" | "Bet" | "Draw";
  totaledPlay: number;
  createdAt: string;
  updatedAt: string;
}

export interface BetHistoryResponse {
  success: boolean;
  message: string;
  data: {
    gameHistories: BetHistoryItem[];
    totalCount: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
  errors: string[];
}

// ─── Point History ──────────────────────────
export interface PointHistoryQuery {
  page: number;
  pageSize: number;
  userId: string;
}

export interface PointHistoryItem {
  _id: string;
  userId: string;
  gameId: string;
  agentId: string;
  bettingAmount: number;
  gameType: string;
  agentFee: number;
  feeAmount: number;
  createdAt: string;
}

export interface PointHistoryResponse {
  success: boolean;
  message: string;
  data: {
    pointHistories: PointHistoryItem[];
    totalCount: number;
    sumFeeAmount: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
  errors: string[];
}
