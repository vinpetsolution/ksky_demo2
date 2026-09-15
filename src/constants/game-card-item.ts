/**
 * Cấu trúc mỗi thẻ game dùng chung cho Casino / Slot (và `GameCard`).
 */
export type GameCardItem = {
  id: string;
  image: string;
  title: string;
  logo: string;
  /** vendor_id used by TIME API / Royal API to launch the game */
  vendorId?: string;
};

/**
 * Some vendor IDs in our constants differ from the TIME API's providerCode.
 * This mapping converts our vendorId → TIME API providerCode for game list fetching.
 */
export const SLOT_PROVIDER_MAPPING: Record<string, string> = {
  PragmaticPlay_Slot: "PragmaticPlay",
  Skywind_Slot: "Skywind",
  AGAsia_Slot: "AGAsia",
};

export const CASINO_PROVIDER_MAPPING: Record<string, string> = {
  PragmaticPlay_LiveCasino: "PragmaticPlay",
  Skywind_LiveCasino: "Skywind",
};

/** Resolve vendorId → TIME API providerCode for slots */
export function resolveSlotProvider(vendorId: string): string {
  return SLOT_PROVIDER_MAPPING[vendorId] || vendorId;
}

/** Resolve vendorId → TIME API providerCode for casino */
export function resolveCasinoProvider(vendorId: string): string {
  return CASINO_PROVIDER_MAPPING[vendorId] || vendorId;
}
