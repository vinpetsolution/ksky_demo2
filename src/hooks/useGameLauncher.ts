"use client";

import { useCallback } from "react";

const DEMO_GAME_MESSAGE = "데모 모드에서는 게임을 실행할 수 없습니다.";

export function useGameLauncher() {
  const notifyDemo = useCallback(
    async (_vendorId?: string, _gameCode?: string): Promise<boolean> => {
      void _vendorId;
      void _gameCode;
      alert(DEMO_GAME_MESSAGE);
      return false;
    },
    [],
  );

  return {
    isProcessing: false,
    isPopupOpen: false,
    launchCasinoGame: notifyDemo,
    launchRoyalCasino: notifyDemo,
    launchSlotGame: notifyDemo,
  };
}
