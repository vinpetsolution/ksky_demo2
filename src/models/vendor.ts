export interface Vendor {
  id: string;
  vendor_id: string;
  vendor_name: string;
  vendor_name_local: string;
  vendor_type: string;
  vendor_provider: string;
  original_category: string;
  isShow: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface VendorListResponse {
  message: string;
  success: boolean;
  returnCode: string;
  result: Vendor[];
}

/** Mapping used to resolve CSS classes for each vendor */
export interface VendorCssMapping {
  cssId: string;   // used for casino_logo class
  bgClass: string; // used for background class
}

// ═══════════════════════════════════════
// Game Launch Types
// ═══════════════════════════════════════

export interface GameLaunchRequest {
  playerCode: string;
  providerCode: string;
  countryCode: string;
  localeCode: string;
  gameCode?: string;
}

export interface GameLaunchResponse {
  status: string;
  result: {
    gameUrl: string;
  };
}

export interface GameItem {
  code: string;
  name: string;
  name_en: string;
  category: string;
  iconUrl: string;
  demoGameAvailable: boolean;
}

export interface GameListResponse {
  status: string;
  result: GameItem[];
}
