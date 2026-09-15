"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCallback, useState } from "react";
import Modal from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import {
  type SupportInquiryFormValues,
  supportInquirySchema,
} from "@/schemas/support.schemas";
import { cn } from "@/utils/classNames";
import { useAuth } from "@/contexts/AuthContext";
import type { QnA } from "@/models/qna";

const STATUS_LABEL: Record<string, string> = {
  pending: "답변대기",
  answered: "답변완료",
  closed: "종료",
};

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleString("ko-KR");
  } catch {
    return dateStr;
  }
}

export type SupportModalProps = {
  open: boolean;
  onClose: () => void;
};

export function SupportModal({ open, onClose }: SupportModalProps) {
  const { user } = useAuth();
  const [inquiries, setInquiries] = useState<QnA[]>([]);
  const [viewing, setViewing] = useState<QnA | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SupportInquiryFormValues>({
    resolver: zodResolver(supportInquirySchema),
    defaultValues: { title: "", content: "" },
  });

  const handleModalClose = useCallback(() => {
    setViewing(null);
    reset({ title: "", content: "" });
    onClose();
  }, [onClose, reset]);

  const handleView = useCallback((qna: QnA) => {
    setViewing(qna);
    setInquiries((prev) =>
      prev.map((item) => (item.id === qna.id ? { ...item, isRead: true } : item)),
    );
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    if (!user) return;
    const now = new Date().toISOString();
    setInquiries((prev) => {
      const ticket: QnA = {
        id: `demo-qna-${prev.length + 1}`,
        title: data.title.trim(),
        message: data.content.trim(),
        status: "pending",
        userId: user.id,
        userName: user.userName,
        createdAt: now,
        updatedAt: now,
        isRead: true,
      };
      return [ticket, ...prev];
    });
    reset();
    alert("문의가 등록되었습니다.");
  });

  return (
    <Modal
      open={open}
      onClose={handleModalClose}
      showCloseButton
      className="w-full border-[#e2b85666]"
      contentClassName="!p-0 flex flex-col"
      headerClassName="px-5 py-4 items-start justify-start bg-[radial-gradient(circle_at_top,#ffd2692e,#0000_58%)]"
      title={
        <>
          <div className="w-full flex flex-col gap-1">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-[#d4b168]">
              KSKY SOLUTION SUPPORT
            </p>
            <h2 className="text-xl font-bold text-[#f7e7ba]">고객센터</h2>
            <p className="text-xs text-[#a88f61]">
              문의 등록과 답변 확인을 한 곳에서 관리할 수 있습니다.
            </p>
          </div>
        </>
      }
    >
      <div className="p-5">
        <div className="p-6 mb-8 rounded-xl bg-[#00000047] border border-[#caa24a33]">
          <h2 className="mb-4 text-xl font-semibold text-[#ffd700]">문의 작성</h2>
          <form className="space-y-4" onSubmit={onSubmit} noValidate>
            <Input
              label="제목"
              placeholder="제목을 입력하세요"
              fullWidth
              error={errors.title?.message}
              autoComplete="off"
              {...register("title")}
            />
            <Textarea
              label="내용"
              placeholder="내용을 입력하세요"
              fullWidth
              rows={5}
              resize="vertical"
              className="min-h-25 max-h-50"
              error={errors.content?.message}
              {...register("content")}
            />
            <Button
              type="submit"
              variant="third"
              fullWidth
              loading={isSubmitting}
              className="rounded-full text-base font-semibold hover:opacity-90"
            >
              등록하기
            </Button>
          </form>
        </div>

        {viewing ? (
          <div className="mb-4 rounded-xl border border-[#c9a227]/40 bg-[#0a0a0a]/80 p-4 text-left">
            <div className="mb-2 flex items-start justify-between gap-3">
              <div>
                <p className="text-xs text-[#a88f61]">제목</p>
                <p className="text-sm font-semibold text-[#f7e7ba]">{viewing.title}</p>
              </div>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setViewing(null)}
                className="shrink-0"
              >
                닫기
              </Button>
            </div>
            <p className="text-xs text-[#a88f61]">내용</p>
            <p className="mt-1 whitespace-pre-wrap text-sm text-[#e8dcc4]">
              {viewing.message}
            </p>
            {viewing.answer && (
              <div className="mt-4 border-t border-[#c9a227]/20 pt-3">
                <p className="text-xs text-[#a88f61]">답변</p>
                <p className="mt-1 whitespace-pre-wrap text-sm text-emerald-300">
                  {viewing.answer}
                </p>
                {viewing.answeredAt && (
                  <p className="mt-1 text-xs text-[#6b5c45]">
                    답변일 {formatDate(viewing.answeredAt)}
                  </p>
                )}
              </div>
            )}
            <p className="mt-3 text-xs text-[#6b5c45]">작성일 {formatDate(viewing.createdAt)}</p>
          </div>
        ) : null}

        <div className="rounded-xl bg-[#00000047] border border-[#caa24a33] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="text-sm w-175">
              <thead>
                <tr className="bg-linear-to-r from-[#c9a227] to-[#ffd700] text-black">
                  <th className="hidden w-17.5 px-3 py-2 text-center sm:table-cell">No.</th>
                  <th className="px-3 py-2 text-left min-w-0">제목</th>
                  <th className="w-27.5 px-3 py-2 text-center">상태</th>
                  <th className="w-42.5 px-3 py-2 text-center">작성일</th>
                  <th className="w-22.5 px-3 py-2 text-center">보기</th>
                </tr>
              </thead>
              <tbody className="text-[#d4c4a8]">
                {inquiries.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-4 text-center text-gray-500">
                      문의가 없습니다.
                    </td>
                  </tr>
                ) : (
                  inquiries.map((row, index) => (
                    <tr key={row.id} className="border-t border-[#c9a227]/10 text-gray-200">
                      <td className="hidden px-3 py-2 text-center sm:table-cell">
                        {inquiries.length - index}
                      </td>
                      <td className="px-3 py-2 truncate max-w-0" title={row.title}>
                        {!row.isRead && (
                          <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#ffd700]" />
                        )}
                        {row.title}
                      </td>
                      <td className="px-3 py-2 text-center">
                        <span
                          className={cn(
                            "inline-block rounded px-1.5 py-0.5 text-xs font-medium",
                            row.status === "answered"
                              ? "bg-emerald-900/50 text-emerald-300"
                              : "bg-amber-900/50 text-amber-200"
                          )}
                        >
                          {STATUS_LABEL[row.status] || row.status}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-center text-xs">
                        {formatDate(row.createdAt)}
                      </td>
                      <td className="px-3 py-2 text-center">
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          onClick={() => handleView(row)}
                          className="h-7 min-w-0 px-2 text-xs"
                        >
                          보기
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Modal>
  );
}
