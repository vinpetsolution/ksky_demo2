"use client";

import { useCallback, useState } from "react";
import Modal from "@/components/ui/Modal";
import { cn } from "@/utils/classNames";
import { INBOX_MESSAGE_SEED } from "@/data/inboxMessages";

export type MessageModalProps = {
  open: boolean;
  onClose: () => void;
};

export function MessageModal({ open, onClose }: MessageModalProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = INBOX_MESSAGE_SEED.find((item) => item.id === selectedId) ?? null;

  const handleClose = useCallback(() => {
    setSelectedId(null);
    onClose();
  }, [onClose]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      showCloseButton
      className="w-full border-[#e2b85666]"
      contentClassName="!p-0 flex flex-col min-h-0 flex-1 overflow-y-auto"
      headerClassName="px-5 py-4 items-start justify-start bg-[radial-gradient(circle_at_top,#ffd2692e,#0000_58%)]"
      title={
        <>
          <div className="w-full flex flex-col gap-1">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-[#d4b168]">
              KSKY SOLUTION MESSAGE
            </p>
            <h2 className="text-xl font-bold text-[#f7e7ba]">쪽지함</h2>
            <p className="text-xs text-[#a88f61]">받은 쪽지를 확인하고 관리할 수 있습니다.</p>
          </div>
        </>
      }
    >
      <div className="p-5 min-w-[95vw] md:min-w-md lg:min-w-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex h-150 min-h-0 flex-col overflow-hidden rounded-xl border border-[#caa24a33] bg-[#00000047] p-4 md:col-span-1">
            <h2 className="shrink-0 border-b border-[#c9a227]/20 bg-[#111] pb-2 text-xl font-semibold text-[#ffd700]">
              받은 쪽지
            </h2>
            {INBOX_MESSAGE_SEED.length === 0 ? (
              <p className="flex flex-1 items-center justify-center text-center text-sm text-gray-500">
                받은 쪽지가 없습니다.
              </p>
            ) : (
              <div className="min-h-0 flex-1 space-y-2 overflow-y-auto p-2 scrollbar">
                {INBOX_MESSAGE_SEED.map((thread) => {
                  const isActive = selectedId === thread.id;
                  return (
                    <div
                      key={thread.id}
                      className={cn(
                        "p-3 rounded cursor-pointer transition-colors",
                        isActive
                          ? "border border-[#ffd700] bg-[#ffd700]/10"
                          : "border border-[#2f2f2f] bg-[#1a1a1a] hover:bg-[#202020]"
                      )}
                      onClick={() => setSelectedId(thread.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelectedId(thread.id);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                    >
                      <div className="mb-1 flex items-start justify-between">
                        <span className="truncate pr-2 text-sm font-medium text-gray-200">
                          {thread.title}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>{thread.receivedAt || thread.date}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="bg-[#00000047] border border-[#caa24a33] rounded-xl md:col-span-2 flex h-150 flex-col p-6">
            {!selected ? (
              <div className="h-full flex flex-1 items-center justify-center text-gray-500">
                쪽지를 선택해주세요.
              </div>
            ) : (
              <>
                <div className="mb-4 border-b border-[#c9a227]/20 pb-4">
                  <h2 className="text-2xl font-bold mb-2">{selected.title}</h2>
                  <div className="flex items-center text-sm text-gray-400">
                    <span>받은시간: {selected.receivedAt || selected.date}</span>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto text-gray-200 leading-relaxed">
                  {selected.body}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
