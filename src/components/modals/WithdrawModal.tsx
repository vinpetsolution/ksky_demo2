"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import { formatNumber } from "@/utils/format";
import { useAuth } from "@/contexts/AuthContext";

export type WithdrawModalProps = {
  open: boolean;
  onClose: () => void;
};

const PRESET_AMOUNTS = [30_000, 50_000, 100_000, 300_000, 500_000, 1_000_000] as const;
const PRESET_LABELS = ["3만원", "5만원", "10만원", "30만원", "50만원", "100만원"] as const;

const PRECAUTIONS = [
  "출금 전 등록된 계좌, 예금주, 은행명을 꼭 확인하시길 바랍니다.",
  "출금은 30,000 이상이며, 만원 단위로 신청 가능합니다.",
  "잦은 출금 요청 시 출금에 제한이 될 수 있습니다.",
  "입금후 바로 환전은 불가하며, 최소 100% 롤링 후 출금 가능합니다.",
  "출금은 등록된 계좌로만 가능하며, 타명의 이체 요청은 허용되지 않습니다.",
] as const;

export function WithdrawModal({ open, onClose }: WithdrawModalProps) {
  const { user } = useAuth();
  const [amount, setAmount] = useState(0);
  const [amountInput, setAmountInput] = useState("");
  const [withdrawPassword, setWithdrawPassword] = useState("");

  const handlePresetClick = (value: number) => {
    const next = amount + value;
    setAmount(next);
    setAmountInput(String(next));
  };

  const handleReset = () => {
    setAmount(0);
    setAmountInput("");
  };

  const handleSubmit = () => {
    if (!user || amount < 30000) return;
    if (!withdrawPassword) {
      alert("환전 비밀번호를 입력해주세요.");
      return;
    }
    alert("데모 모드에서는 신청할 수 없습니다.");
    handleReset();
    setWithdrawPassword("");
  };

  const bankName = user?.bank_name || "-";
  const bankNo = user?.bank_no || "-";
  const bankHolder = user?.bank_holder || "-";

  return (
    <Modal
      open={open}
      onClose={onClose}
      showCloseButton
      className="w-full border-[#e2b85666]"
      contentClassName="!p-0 flex min-h-0 max-h-[min(88vh,860px)] flex-col"
      headerClassName="px-5 py-4 items-start justify-start bg-[radial-gradient(circle_at_top,#ffd2692e,#0000_58%)]"
      title={
        <>
          <div className="w-full flex flex-col gap-1">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-[#d4b168]">
              KSKY SOLUTION CASH
            </p>
            <h2 className="text-xl font-bold text-[#f7e7ba]">출금 신청</h2>
            <p className="text-xs text-[#a88f61]">
              보유머니와 출금 계좌를 확인하고 출금을 신청해주세요.
            </p>
          </div>
        </>
      }
    >
      <div className="min-h-0 flex-1 space-y-5 overflow-y-auto p-5 scrollbar">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="border border-[#caa24a33] rounded-xl bg-[#00000047] overflow-hidden">
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-[#c9a227]/20">
                  <td className="w-32.5 bg-[#171717] px-4 py-3 text-gray-300">출금정보</td>
                  <td className="px-4 py-3 text-left text-gray-200 font-bold">
                    은행명 [{bankName}], 계좌번호 [{bankNo}], 예금주 [{bankHolder}]
                  </td>
                </tr>
                <tr className="border-b border-[#c9a227]/20">
                  <td className="w-32.5 bg-[#171717] px-4 py-3 text-gray-300">보유금액</td>
                  <td className="px-4 py-3 text-left text-[#ffd700] font-bold">
                    {formatNumber(user?.balanceMoney ?? 0)}원
                  </td>
                </tr>
                <tr className="border-b border-[#c9a227]/20">
                  <td className="w-32.5 bg-[#171717] px-4 py-3 text-gray-300">환전비번</td>
                  <td className="px-4 py-3 text-left font-bold">
                    <Input
                      placeholder="가입 시 기재한 환전 비밀번호 입력"
                      type="password"
                      value={withdrawPassword}
                      onChange={(e) => setWithdrawPassword(e.target.value)}
                      className="h-11 text-sm max-w-md"
                      aria-label="환전비밀번호"
                    />
                  </td>
                </tr>
                <tr className="border-b border-[#c9a227]/20">
                  <td className="w-32.5 bg-[#171717] px-4 py-3 text-gray-300">출금금액</td>
                  <td className="px-4 py-3 text-left font-bold">
                    <Input
                      placeholder="출금금액을 입력하세요"
                      type="text"
                      value={amount === 0 ? "" : formatNumber(Number(amountInput))}
                      onChange={(e) => {
                        const v = e.target.value.replace(/[^0-9]/g, "");
                        setAmountInput(v);
                        setAmount(v ? Number(v) : 0);
                      }}
                      className="h-11 text-sm max-w-md text-right"
                      inputMode="decimal"
                      aria-label="출금금액"
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="px-4 py-4">
                    <div className="flex flex-wrap gap-2">
                      {PRESET_AMOUNTS.map((n, i) => (
                        <Button key={n} type="button" variant="third" className="h-9 md:h-11 rounded-full px-3 py-1.5 text-xs font-bold hover:opacity-90" onClick={() => handlePresetClick(n)}>
                          {PRESET_LABELS[i]}
                        </Button>
                      ))}
                      <Button type="button" variant="transparent" className="h-9 md:h-11 rounded-full px-3 py-1.5 text-xs font-bold bg-[#2a2a2a] hover:bg-[#343434] text-white border border-[#555] hover:text-gray-500" onClick={handleReset}>
                        금액정정
                      </Button>
                      <Button type="button" variant="third" className="h-9 md:h-11 rounded-full px-4 py-1.5 text-xs font-bold hover:opacity-90" onClick={handleSubmit} disabled={amount < 30000}>
                        출금신청
                      </Button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </form>

        <div className="border border-[#caa24a33] rounded-xl bg-[#00000047] text-sm text-gray-300 p-4">
          <h3 className="mb-3 text-lg font-bold text-[#ffd700]">환전시 주의사항</h3>
          <ul className="list-inside list-disc leading-relaxed">
            {PRECAUTIONS.map((line) => (
              <li key={line} className="pl-0.5">{line}</li>
            ))}
          </ul>
        </div>

        <div className="border border-[#caa24a33] rounded-xl bg-[#00000047] overflow-hidden">
          <div className="border-b border-[#c9a227]/20 px-4 py-3 text-lg font-bold text-[#ffd700]">출금내역</div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-175 text-sm">
              <thead>
                <tr className="bg-[#171717] text-gray-300">
                  <th className="px-3 py-2 text-left">신청일시</th>
                  <th className="px-3 py-2 text-right">금액</th>
                  <th className="px-3 py-2 text-center">상태</th>
                  <th className="px-3 py-2 text-left">처리일시</th>
                  <th className="px-3 py-2 text-left">비고</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-[#c9a227]/10 text-gray-400">
                  <td colSpan={5} className="px-3 py-4 text-center">출금내역이 없습니다.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Modal>
  );
}
