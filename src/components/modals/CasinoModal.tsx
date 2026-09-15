"use client";

import Image from "next/image";
import Modal from "@/components/ui/Modal";
import { useGameLauncher } from "@/hooks/useGameLauncher";
import { CASINO_GAMES } from "@/constants";
import { cn } from "@/utils/classNames";

export type CasinoModalProps = {
  open: boolean;
  onClose: () => void;
};

export function CasinoModal({ open, onClose }: CasinoModalProps) {
  const { launchCasinoGame, isProcessing } = useGameLauncher();

  return (
    <Modal
      open={open}
      onClose={onClose}
      showCloseButton
      className="w-full max-w-5xl border-[#e2b85666]"
      contentClassName="!p-0 flex min-h-0 max-h-[min(88vh,860px)] flex-col"
      headerClassName="px-5 py-4 items-start justify-start bg-[radial-gradient(circle_at_top,#ffd2692e,#0000_58%)]"
      title={
        <div className="w-full flex flex-col gap-1">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-[#d4b168]">
            KSKY SOLUTION
          </p>
          <h2 className="text-xl font-bold text-[#f7e7ba]">카지노</h2>
          <p className="text-xs text-[#a88f61]">
            원하는 카지노 게임사를 선택해 바로 입장할 수 있습니다.
          </p>
        </div>
      }
    >
      <div className="min-h-0 flex-1 overflow-y-auto scrollbar p-5">
        {CASINO_GAMES.length === 0 ? (
          <div className="text-center py-16 text-[#aaa] text-sm">
            카지노 게임사가 없습니다.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {CASINO_GAMES.map((game) => (
              <div
                key={game.id}
                className={cn(
                  "relative cursor-pointer group overflow-hidden rounded-xl",
                  "border border-[#caa24a33] bg-black",
                  "transition-all duration-300 hover:border-[#ffd700] hover:shadow-[0_0_20px_#ffd70033]",
                  isProcessing && "opacity-50 pointer-events-none"
                )}
                onClick={() => {
                  if (isProcessing || !game.vendorId) return;
                  void launchCasinoGame(game.vendorId);
                }}
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={game.image}
                    alt={game.title}
                    width={400}
                    height={400}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div
                    className={cn(
                      "absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent",
                      "opacity-60 group-hover:opacity-90 transition-opacity duration-300"
                    )}
                  />
                  <div
                    className={cn(
                      "absolute inset-0 flex flex-col items-center justify-center gap-2",
                      "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    )}
                  >
                    <Image
                      src="/images/play.webp"
                      alt="play"
                      width={60}
                      height={60}
                      className="w-12 h-12 object-contain drop-shadow-lg"
                    />
                  </div>
                </div>
                <div className="px-3 py-2.5 text-center bg-linear-to-t from-[#0a0800] to-[#151005]">
                  <h3 className="text-sm font-bold text-[#f7e7ba] truncate">
                    {game.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}
