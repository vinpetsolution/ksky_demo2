"use client";
import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import { Button } from "@/components/ui/Button";
import GameCard from "@/components/ui/GameCard";

import { CASINO_GAMES, SLOT_GAMES } from "@/constants";
import { useModal } from "@/contexts/ModalContext";
import { useGameLauncher } from "@/hooks/useGameLauncher";
import Image from "next/image";
import { useCallback } from "react";

export default function Home() {
  const { requireAuth } = useModal();
  const { launchCasinoGame, launchSlotGame, isProcessing } = useGameLauncher();

  const handleCasinoPlay = useCallback((vendorId?: string) => {
    if (!vendorId) return;
    requireAuth(() => {
      void launchCasinoGame(vendorId);
    });
  }, [requireAuth, launchCasinoGame]);

  const handleSlotVendorClick = useCallback((vendorId?: string) => {
    if (!vendorId) return;
    requireAuth(() => {
      void launchSlotGame(vendorId);
    });
  }, [requireAuth, launchSlotGame]);

  return (
    <>
      <Header />
      <main className="pt-16 lg:pt-0 flex flex-col flex-1 bg-black">
        {/* Slide */}
        <section className="w-full lg:h-125 md:h-75 h-60 overflow-hidden border-b border-yellow-500/30">

          <div className="w-full h-full flex flex-col items-center justify-center relative">
            <Image
              src="/images/slide/slbg01.webp"
              alt="banner"
              width={1920}
              height={1080}
              priority
              className="absolute top-0 left-0 inset-0 h-full w-full object-cover "
            />

            {/* Content */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-5">

              <h1 className="flex justify-center">
                <Image
                  src="/images/slide/slide_title.webp"
                  alt="slide title"
                  width={500}
                  height={61}
                  className="h-auto w-full max-w-55 md:max-w-75 lg:max-w-125 object-cover"
                />
              </h1>
              <Button
                variant="third"
                className="hover:scale-105 h-auto font-bold rounded-[30px] text-[13px] md:text-sm lg:text-base py-2 px-5 md:px-7 md:py-2.5 hover:shadow-[0px_5px_20px_#ffd70099] transition-all duration-300"
              >
                게임하러 가기
              </Button>
            </div>
          </div>
        </section>

        {/* Casino */}
        <section className="max-w-7xl mx-auto px-4 md:px-5 py-12">
          <div className="mb-6 flex items-center justify-center">
            <Image
              src="/images/casino/casino_title.webp"
              alt="casino title"
              width={200}
              height={200}
              className="h-10 w-auto md:h-12 object-contain"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {CASINO_GAMES.map((game) => (
              <GameCard
                key={game.id}
                image={game.image}
                title={game.title}
                logo={game.logo}
                onClick={() => handleCasinoPlay(game.vendorId)}
                disabled={isProcessing}
              />
            ))}
          </div>
        </section>
        {/* Slot */}
        <section
          style={{ background: "url('/images/slot/slot_Bg.webp') 50% / cover no-repeat fixed" }}
        >
          <div className="max-w-7xl mx-auto px-4 md:px-5 py-12">
            <div className="mb-6 flex items-center justify-center">
              <Image
                src="/images/slot/slot_title.webp"
                alt="casino title"
                width={200}
                height={200}
                className="h-10 w-auto md:h-12 object-contain"
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {SLOT_GAMES.map((game) => (
                <GameCard
                  key={game.id}
                  image={game.image}
                  title={game.title}
                  logo={game.logo}
                  onClick={() => handleSlotVendorClick(game.vendorId)}
                  disabled={isProcessing}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
