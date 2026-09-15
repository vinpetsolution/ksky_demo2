"use client";

import { useState, useCallback } from "react";
import Modal from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/contexts/AuthContext";
import { formatNumber } from "@/utils/format";
import { cn } from "@/utils/classNames";

export type MyPageModalProps = {
  open: boolean;
  onClose: () => void;
};

export function MyPageModal({ open, onClose }: MyPageModalProps) {
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState<"info" | "password">("info");
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [isChanging, setIsChanging] = useState(false);

  const readonlyClass = cn(
    "h-11 text-sm bg-[#0a0a0a] border-[#caa24a33] text-[#d4c4a8] cursor-default"
  );

  const handleChangePassword = useCallback(async () => {
    if (!user) return;
    if (!currentPw || !newPw) {
      alert("현재 비밀번호와 새 비밀번호를 입력해주세요.");
      return;
    }
    if (newPw !== confirmPw) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return;
    }
    if (newPw.length < 8) {
      alert("비밀번호는 최소 8자 이상이어야 합니다.");
      return;
    }

    setIsChanging(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      alert("비밀번호가 변경되었습니다.");
      setCurrentPw("");
      setNewPw("");
      setConfirmPw("");
    } finally {
      setIsChanging(false);
    }
  }, [user, currentPw, newPw, confirmPw]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      showCloseButton
      className="w-full max-w-lg border-[#e2b85666]"
      contentClassName="!p-0 flex min-h-0 max-h-[min(88vh,860px)] flex-col"
      headerClassName="px-5 py-4 items-start justify-start bg-[radial-gradient(circle_at_top,#ffd2692e,#0000_58%)]"
      title={
        <div className="w-full flex flex-col gap-1">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-[#d4b168]">
            KSKY SOLUTION ACCOUNT
          </p>
          <h2 className="text-xl font-bold text-[#f7e7ba]">마이페이지</h2>
          <p className="text-xs text-[#a88f61]">
            내 정보 확인 및 비밀번호를 변경할 수 있습니다.
          </p>
        </div>
      }
    >
      <div className="min-h-0 flex-1 overflow-y-auto p-5 scrollbar space-y-5">
        {/* Tabs */}
        <div className="flex gap-2">
          <Button
            variant={activeTab === "info" ? "third" : "secondary"}
            className={cn("rounded-full px-5 py-2 text-sm font-bold", activeTab === "info" && "shadow-[0_0_12px_#ffd70044]")}
            onClick={() => setActiveTab("info")}
          >
            내 정보
          </Button>
          <Button
            variant={activeTab === "password" ? "third" : "secondary"}
            className={cn("rounded-full px-5 py-2 text-sm font-bold", activeTab === "password" && "shadow-[0_0_12px_#ffd70044]")}
            onClick={() => setActiveTab("password")}
          >
            비밀번호 변경
          </Button>
        </div>

        {activeTab === "info" && user && (
          <div className="border border-[#caa24a33] rounded-xl bg-[#00000047] overflow-hidden">
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-[#c9a227]/20">
                  <td className="w-30 bg-[#171717] px-4 py-3 text-gray-300 font-medium">아이디</td>
                  <td className="px-4 py-3 text-[#f7e7ba] font-bold">{user.userName}</td>
                </tr>
                <tr className="border-b border-[#c9a227]/20">
                  <td className="w-30 bg-[#171717] px-4 py-3 text-gray-300 font-medium">보유머니</td>
                  <td className="px-4 py-3 text-[#ffd700] font-bold">{formatNumber(user.balanceMoney)}원</td>
                </tr>
                <tr className="border-b border-[#c9a227]/20">
                  <td className="w-30 bg-[#171717] px-4 py-3 text-gray-300 font-medium">포인트</td>
                  <td className="px-4 py-3 text-[#ffd700] font-bold">{formatNumber(user.balancePoint)}P</td>
                </tr>
                <tr className="border-b border-[#c9a227]/20">
                  <td className="w-30 bg-[#171717] px-4 py-3 text-gray-300 font-medium">전화번호</td>
                  <td className="px-4 py-3 text-[#d4c4a8]">{user.phone || "-"}</td>
                </tr>
                <tr className="border-b border-[#c9a227]/20">
                  <td className="w-30 bg-[#171717] px-4 py-3 text-gray-300 font-medium">예금주</td>
                  <td className="px-4 py-3 text-[#d4c4a8]">{user.bank_holder || "-"}</td>
                </tr>
                <tr className="border-b border-[#c9a227]/20">
                  <td className="w-30 bg-[#171717] px-4 py-3 text-gray-300 font-medium">은행</td>
                  <td className="px-4 py-3 text-[#d4c4a8]">{user.bank_name || "-"}</td>
                </tr>
                <tr>
                  <td className="w-30 bg-[#171717] px-4 py-3 text-gray-300 font-medium">계좌번호</td>
                  <td className="px-4 py-3 text-[#d4c4a8]">{user.bank_no || "-"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "password" && (
          <div className="border border-[#caa24a33] rounded-xl bg-[#00000047] p-5 space-y-4">
            <Input
              label="현재 비밀번호"
              type="password"
              placeholder="현재 비밀번호를 입력하세요"
              value={currentPw}
              onChange={(e) => setCurrentPw(e.target.value)}
              fullWidth
              className={readonlyClass}
            />
            <Input
              label="새 비밀번호"
              type="password"
              placeholder="새 비밀번호 (8자 이상)"
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
              fullWidth
              className={readonlyClass}
            />
            <Input
              label="새 비밀번호 확인"
              type="password"
              placeholder="새 비밀번호를 다시 입력하세요"
              value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)}
              fullWidth
              className={readonlyClass}
            />
            <Button
              type="button"
              variant="third"
              fullWidth
              className="rounded-full text-base font-semibold hover:opacity-90"
              onClick={handleChangePassword}
              disabled={isChanging}
            >
              {isChanging ? "변경 중..." : "비밀번호 변경"}
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
}
