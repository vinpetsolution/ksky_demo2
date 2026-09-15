"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/classNames";

export type BetHistoryModalProps = {
  open: boolean;
  onClose: () => void;
};

const TABS = [
  { key: "Live Casino", label: "카지노" },
  { key: "Slot", label: "슬롯" },
] as const;

export function BetHistoryModal({ open, onClose }: BetHistoryModalProps) {
  const [tab, setTab] = useState<string>("Live Casino");

  return (
    <Modal
      open={open}
      onClose={onClose}
      showCloseButton
      className="w-full max-w-3xl border-[#e2b85666]"
      contentClassName="!p-0 flex min-h-0 max-h-[min(88vh,860px)] flex-col"
      headerClassName="px-5 py-4 items-start justify-start bg-[radial-gradient(circle_at_top,#ffd2692e,#0000_58%)]"
      title={
        <div className="w-full flex flex-col gap-1">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-[#d4b168]">
            KSKY SOLUTION HISTORY
          </p>
          <h2 className="text-xl font-bold text-[#f7e7ba]">베팅내역</h2>
          <p className="text-xs text-[#a88f61]">
            카지노/슬롯 게임 베팅 내역을 확인하세요.
          </p>
        </div>
      }
    >
      <div className="min-h-0 flex-1 overflow-y-auto p-5 scrollbar space-y-4">
        <div className="flex gap-2">
          {TABS.map((t) => (
            <Button
              key={t.key}
              type="button"
              variant={tab === t.key ? "third" : "secondary"}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-bold",
                tab === t.key && "shadow-[0_0_12px_#ffd70044]"
              )}
              onClick={() => setTab(t.key)}
            >
              {t.label}
            </Button>
          ))}
        </div>

        <div className="border border-[#caa24a33] rounded-xl bg-[#00000047] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-175 text-sm">
              <thead>
                <tr className="bg-[#171717] text-gray-300">
                  <th className="px-3 py-2.5 text-left">일시</th>
                  <th className="px-3 py-2.5 text-left">업체</th>
                  <th className="px-3 py-2.5 text-left">게임</th>
                  <th className="px-3 py-2.5 text-right">베팅액</th>
                  <th className="px-3 py-2.5 text-right">당첨액</th>
                  <th className="px-3 py-2.5 text-center">결과</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={6} className="py-10 text-center text-gray-400">
                    베팅내역이 없습니다.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Modal>
  );
}
