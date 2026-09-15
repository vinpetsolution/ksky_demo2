"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Select } from "@/components/ui/Select";
import Modal from "@/components/ui/Modal";
import {
  type RegisterFormValues,
  registerSchema,
} from "@/schemas/auth.schemas";
import { cn } from "@/utils/classNames";
import { useState, useMemo } from "react";
import type { RegisterRequest } from "@/models/credential";
import { bankOptions, phoneCarriers } from "@/data/banks";


export type RegisterModalProps = {
  open: boolean;
  onClose: () => void;
  onRegisterSuccess?: (data: RegisterRequest) => Promise<{ success: boolean; message: string }>;
  onRequestLogin: () => void;
};

export function RegisterModal({
  open,
  onClose,
  onRegisterSuccess,
  onRequestLogin,
}: RegisterModalProps) {
  const [error, setError] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      nickname: "",
      phoneCarrier: "010",
      phoneMiddle: "",
      phoneLast: "",
      bankCode: "",
      accountHolder: "",
      accountNumber: "",
      transactionPassword: "",
      referralCode: "",
    },
  });

  const password = useWatch({ control, name: "password" });
  const confirmPassword = useWatch({ control, name: "confirmPassword" });
  const bankCode = useWatch({ control, name: "bankCode" });
  const phoneCarrier = useWatch({ control, name: "phoneCarrier" });

  const isPasswordMismatch = useMemo(() => {
    if (!confirmPassword) return false;
    return password !== confirmPassword;
  }, [password, confirmPassword]);

  const isSubmitDisabled = isPasswordMismatch || isSubmitting;

  const phoneCarrierOptions = phoneCarriers.map((c) => ({ value: c, label: c }));

  const onSubmit = handleSubmit(async (data) => {
    setError(null);
    
    if (onRegisterSuccess) {
      const selectedBank = bankOptions.find(b => b.value === data.bankCode);
      const bankNameKorean = selectedBank?.label || data.bankCode;
      const fullPhone = `${data.phoneCarrier}${data.phoneMiddle}${data.phoneLast}`;

      const registerData: RegisterRequest = {
        userName: data.username,
        nickName: data.nickname,
        password: data.password,
        phone: fullPhone,
        agentId: data.referralCode || "",
        role: "USER",
        bankHolder: data.accountHolder,
        bankName: bankNameKorean,
        bankNo: data.accountNumber,
        transactionPassword: data.transactionPassword,
      };
      
      const result = await onRegisterSuccess(registerData);
      if (result.success) {
        reset();
      } else {
        setError(result.message);
      }
    } else {
      reset();
      onClose();
    }
  });


  return (
    <Modal
      open={open}
      onClose={onClose}
      title="회원가입"
      className="w-full min-w-[90vw] md:min-w-md lg:min-w-md"
      contentClassName="min-h-0 scrollbar overflow-y-auto"
      closeOnOverlayClick={false}
    >
      <form
        onSubmit={onSubmit}
        className="flex flex-col p-5 gap-4"
        noValidate
      >
        <Input
          label="아이디"
          placeholder="아이디를 입력하세요"
          autoComplete="username"
          fullWidth
          error={errors.username?.message}
          {...register("username")}
        />
        <Input
          label="닉네임"
          placeholder="닉네임을 입력하세요"
          autoComplete="nickname"
          fullWidth
          error={errors.nickname?.message}
          {...register("nickname")}
        />
        <PasswordInput
          label="비밀번호"
          placeholder="비밀번호를 입력하세요"
          autoComplete="new-password"
          fullWidth
          error={errors.password?.message}
          {...register("password")}
        />
        <PasswordInput
          label="비밀번호 확인"
          placeholder="비밀번호를 재입력하세요"
          autoComplete="new-password"
          fullWidth
          error={isPasswordMismatch ? "비밀번호가 일치하지 않습니다" : errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />
        
        {/* Phone Number - Split into 3 parts */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[#c9a227] font-semibold text-xs">휴대폰번호</label>
          <div className="flex gap-2 items-start">
            <Select
              options={phoneCarrierOptions}
              containerClassName="w-24 shrink-0"
              value={phoneCarrier}
              onChange={(e) => setValue("phoneCarrier", e.target.value)}
            />
            <Input
              placeholder="중간번호"
              maxLength={4}
              inputMode="numeric"
              containerClassName="flex-1"
              error={errors.phoneMiddle?.message}
              {...register("phoneMiddle")}
            />
            <Input
              placeholder="마지막번호"
              maxLength={4}
              inputMode="numeric"
              containerClassName="flex-1"
              error={errors.phoneLast?.message}
              {...register("phoneLast")}
            />
          </div>
        </div>

        {/* Bank Selection */}
        <Select
          label="은행명"
          options={bankOptions}
          fullWidth
          error={errors.bankCode?.message}
          value={bankCode}
          onChange={(e) => setValue("bankCode", e.target.value)}
        />

        <Input
          label="예금주"
          placeholder="예금주 성명"
          fullWidth
          error={errors.accountHolder?.message}
          {...register("accountHolder")}
        />
        <Input
          label="계좌번호"
          placeholder="계좌번호(- 없이 입력)"
          fullWidth
          inputMode="numeric"
          error={errors.accountNumber?.message}
          {...register("accountNumber")}
        />
        <PasswordInput
          label="출금 비밀번호"
          placeholder="출금 비밀번호 입력 (영문/숫자)"
          fullWidth
          error={errors.transactionPassword?.message}
          {...register("transactionPassword")}
        />
        <Input
          label="추천인 코드(선택)"
          placeholder="추천인 ID(있는 경우)"
          fullWidth
          error={errors.referralCode?.message}
          {...register("referralCode")}
        />

        {error && (
          <div className="pt-1 text-center text-sm font-medium text-red-400">
            {error}
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          fullWidth
          loading={isSubmitting}
          disabled={isSubmitDisabled}
          className=" rounded-xl text-base font-bold"
        >
          회원가입
        </Button>

        <div className="pt-1 flex items-center justify-center gap-1 text-center text-sm">
          <span className="text-gray-400">이미 계정이 있으신가요? </span>
          <Button
            variant="transparent"
            type="button"
            onClick={onRequestLogin}
            className={cn(
              "p-0 h-auto",
              "font-semibold text-white hover:text-[#ffd700]",
            )}
          >
            로그인
          </Button>
        </div>
      </form>
    </Modal>
  );
}
