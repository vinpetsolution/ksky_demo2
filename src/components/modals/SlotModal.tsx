"use client";

import { useMemo } from "react";
import GameCard from "@/components/ui/GameCard";
import Modal from "@/components/ui/Modal";
import { SLOT_GAMES } from "@/constants";
import { useGameLauncher } from "@/hooks/useGameLauncher";
import { type GameCardItem } from "@/constants/game-card-item";

export type SlotModalProps = {
  open: boolean;
  onClose: () => void;
};

const PRIORITY_SLOT_IDS = [
  "PragmaticPlay_Slot",
  "Booongo",
  "Habanero",
  "PGSoft",
];

export function SlotModal({ open, onClose }: SlotModalProps) {
  const { launchSlotGame, isProcessing } = useGameLauncher();

  const sortedSlotGames = useMemo(() => {
    const priority: GameCardItem[] = [];
    const rest: GameCardItem[] = [];
    const prioritySet = new Set(PRIORITY_SLOT_IDS);

    for (const id of PRIORITY_SLOT_IDS) {
      const found = SLOT_GAMES.find((g) => g.vendorId === id);
      if (found) priority.push(found);
    }
    for (const g of SLOT_GAMES) {
      if (!prioritySet.has(g.vendorId ?? "")) rest.push(g);
    }

    return [...priority, ...rest];
  }, []);

  const handleVendorClick = (game: GameCardItem) => {
    if (!game.vendorId || isProcessing) return;
    void launchSlotGame(game.vendorId);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      showCloseButton
      className="w-full max-w-5xl border-[#e2b85666]"
      contentClassName="!p-0 flex min-h-0 max-h-[min(88vh,860px)] flex-col"
      headerClassName="px-5 py-4 items-start justify-start bg-[radial-gradient(circle_at_top,#ffd2692e,#0000_58%)]"
      title={
        <>
          <div className="w-full flex flex-col gap-1">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-[#d4b168]">
              KSKY SOLUTION SLOT
            </p>
            <h2 className="text-xl font-bold text-[#f7e7ba]">슬롯</h2>
            <p className="text-xs text-[#a88f61]">
              원하는 슬롯 게임사를 선택하고 바로 게임 목록으로 이동하세요.
            </p>
          </div>
        </>
      }
    >
      <div className="grid grid-cols-2 p-5 gap-3 md:grid-cols-4 lg:grid-cols-6 min-h-0 flex-1 overflow-y-auto scrollbar">
        {sortedSlotGames.map((game) => (
          <GameCard
            key={game.id}
            image={game.image}
            title={game.title}
            logo={game.logo}
            onClick={() => handleVendorClick(game)}
            disabled={isProcessing}
          />
        ))}
      </div>
    </Modal>
  );
}
