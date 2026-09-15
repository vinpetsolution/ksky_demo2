"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import Modal from "@/components/ui/Modal";
import { cn } from "@/utils/classNames";
import { LoginFormValues, loginSchema } from "@/schemas/auth.schemas";
import { useState } from "react";


export type LoginModalProps = {
  open: boolean;
  onClose: () => void;
  onLoginSuccess: (userName: string, password: string) => Promise<{ success: boolean; message: string }>;
  onRequestRegister: () => void;
};

export function LoginModal({
  open,
  onClose,
  onLoginSuccess,
  onRequestRegister,
}: LoginModalProps) {

  const [error, setError] = useState<string | null>("");

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });

  const onSubmit = handleSubmit(async (data) => {
    setError(null);
    const result = await onLoginSuccess(data.username, data.password);
    if (result.success) {
      reset();
    } else {
      setError(result.message);
    }
  });

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="로그인"
      className="w-full min-w-[90vw] md:min-w-md lg:min-w-md"
      contentClassName="min-h-0 scrollbar"
      closeOnOverlayClick={false}
    >
      <form
        onSubmit={onSubmit}
        className="flex flex-col p-5 space-y-4"
        noValidate
      >
        <Input
          label="아이디"
          placeholder="아이디를 입력하세요"
          autoComplete="username"
          fullWidth
          // error={errors.username?.message}
          {...register("username")}
        />
        <PasswordInput
          label="비밀번호"
          placeholder="비밀번호를 입력하세요"
          autoComplete="current-password"
          fullWidth
          // error={errors.password?.message}
          {...register("password")}
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
          className="rounded-xl text-base font-bold"
        >
          로그인
        </Button>

        <div className="pt-1 flex items-center justify-center gap-1 text-center text-sm">
          <span className="text-gray-400">계정이 없으신가요? </span>
          <Button
            variant="transparent"
            type="button"
            onClick={onRequestRegister}
            className={cn(
              "p-0 h-auto",
              "font-semibold text-white hover:text-[#ffd700]",
            )}
          >
            회원가입
          </Button>
        </div>
      </form>
    </Modal>
  );
}
