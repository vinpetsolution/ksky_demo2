"use client";

import { Fragment, useCallback, useState } from "react";
import Modal from "@/components/ui/Modal";
import { cn } from "@/utils/classNames";
import { NOTICE_LIST } from "@/data/notices";

export type NoticeModalProps = {
  open: boolean;
  onClose: () => void;
};

export function NoticeModal({ open, onClose }: NoticeModalProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleRow = useCallback((id: string) => {
    setExpandedId((cur) => (cur === id ? null : id));
  }, []);

  const handleClose = useCallback(() => {
    setExpandedId(null);
    onClose();
  }, [onClose]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      showCloseButton
      className="w-full border-[#e2b85666]"
      contentClassName="!p-0 flex min-h-0 flex-col"
      headerClassName="px-5 py-4 items-start justify-start bg-[radial-gradient(circle_at_top,#ffd2692e,#0000_58%)]"
      title={
        <>
          <div className="w-full flex flex-col gap-1">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-[#d4b168]">
              KSKY SOLUTION NOTICE
            </p>
            <h2 className="text-xl font-bold text-[#f7e7ba]">공지사항</h2>
            <p className="text-xs text-[#a88f61]">중요 공지와 업데이트 안내를 확인하세요.</p>
          </div>
        </>
      }
    >
      <div className="p-5">
        <div className="overflow-hidden rounded-xl border border-[#caa24a33] bg-[#00000047]">
          {NOTICE_LIST.length === 0 ? (
            <div className="py-8 text-center text-gray-400">공지사항이 없습니다.</div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="hidden w-full min-w-150 text-sm md:table">
                  <thead>
                    <tr className="bg-linear-to-r from-[#c9a227] to-[#ffd700] text-black">
                      <th className="w-17.5 px-3 py-2 text-center">No.</th>
                      <th className="px-3 py-2 text-left">제목</th>
                      <th className="w-35 px-3 py-2 text-center">작성일</th>
                    </tr>
                  </thead>
                  <tbody>
                    {NOTICE_LIST.map((row) => {
                      const isOpen = expandedId === row.id;
                      return (
                        <Fragment key={row.id}>
                          <tr
                            role="button"
                            tabIndex={0}
                            onClick={() => toggleRow(row.id)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                toggleRow(row.id);
                              }
                            }}
                            className={cn(
                              "cursor-pointer border-t border-[#c9a227]/20 transition",
                              isOpen ? "bg-black/20" : "hover:bg-white/3"
                            )}
                          >
                            <td className="px-3 py-3 text-center text-gray-300">
                              {row.no}
                            </td>
                            <td className="px-3 py-3 text-left">
                              <div className="flex items-center justify-between gap-3">
                                <div className="font-semibold text-gray-100">
                                  {row.title}
                                </div>
                                <span className="text-xs text-[#c9a227]">
                                  {isOpen ? "닫기" : "보기"}
                                </span>
                              </div>
                            </td>
                            <td className="px-3 py-3 text-center text-gray-400">
                              {row.date}
                            </td>
                          </tr>
                          {isOpen ? (
                            <tr
                              className="border-t border-[#c9a227]/10 bg-black/20"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <td colSpan={3} className="px-4 py-4">
                                <div className="text-sm text-gray-200 leading-relaxed">
                                  {row.content}
                                </div>
                              </td>
                            </tr>
                          ) : null}
                        </Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <ul className="md:hidden min-w-75">
                {NOTICE_LIST.map((row) => {
                  const isOpen = expandedId === row.id;
                  return (
                    <li key={row.id} className="border-t border-[#c9a227]/20 first:border-t-0">
                      <button
                        type="button"
                        onClick={() => toggleRow(row.id)}
                        className="flex w-full items-start justify-between gap-2 px-3 py-3 text-left transition hover:bg-white/3"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">No. {row.no}</span>
                            <p className="text-xs text-gray-500">{row.date}</p>
                          </div>
                          <div className="mt-0.5 text-sm font-medium text-gray-100">
                            {row.title}
                          </div>
                        </div>
                        <span className="shrink-0 text-xs text-[#c9a227]">
                          {isOpen ? "닫기" : "보기"}
                        </span>
                      </button>
                      {isOpen ? (
                        <div className="border-t border-[#c9a227]/10 bg-black/20 px-4 py-4">
                          <div className="text-sm text-gray-200 leading-relaxed">
                            {row.content}
                          </div>
                        </div>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}
