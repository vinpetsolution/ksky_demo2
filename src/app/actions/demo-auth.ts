"use server";

import { timingSafeEqual } from "node:crypto";

export type DemoLoginUser = {
  id: string;
  userName: string;
  phone: string;
  agentId: string;
  balancePoint: number;
  balancePot: number;
  balanceMoney: number;
  totaledPlay: number;
  bank_holder: string;
  bank_name: string;
  bank_no: string;
  role: string;
  status: string;
};

export type DemoLoginResult =
  | { success: true; message: string; user: DemoLoginUser; token: string }
  | { success: false; message: string };

function safeEqual(left: string, right: string): boolean {
  const leftBuf = Buffer.from(left);
  const rightBuf = Buffer.from(right);
  const len = Math.max(leftBuf.length, rightBuf.length, 1);
  const paddedLeft = Buffer.alloc(len);
  const paddedRight = Buffer.alloc(len);
  leftBuf.copy(paddedLeft);
  rightBuf.copy(paddedRight);
  return timingSafeEqual(paddedLeft, paddedRight) && leftBuf.length === rightBuf.length;
}

export async function demoLogin(
  userName: string,
  password: string,
): Promise<DemoLoginResult> {
  const expectedUser = process.env.DEMO_USERNAME ?? "";
  const expectedPass = process.env.DEMO_PASSWORD ?? "";

  if (!expectedUser || !expectedPass) {
    return { success: false, message: "잘못된 로그인 정보" };
  }

  const userOk = safeEqual(userName.trim(), expectedUser);
  const passOk = safeEqual(password, expectedPass);

  if (!userOk || !passOk) {
    return { success: false, message: "잘못된 로그인 정보" };
  }

  return {
    success: true,
    message: "로그인 성공",
    token: `demo.${Buffer.from(expectedUser).toString("base64url")}`,
    user: {
      id: "demo-user",
      userName: expectedUser,
      phone: "",
      agentId: "demo",
      balancePoint: 0,
      balancePot: 0,
      balanceMoney: 0,
      totaledPlay: 0,
      bank_holder: "",
      bank_name: "",
      bank_no: "",
      role: "USER",
      status: "ACTIVE",
    },
  };
}
