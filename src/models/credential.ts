import { z } from "zod";

export interface RegisterRequest {
  userName: string;
  nickName?: string;
  password: string;
  phone: string;
  agentId: string;
  role: "USER";
  bankHolder: string;
  bankName: string;
  bankNo: string;
  transactionPassword: string;
}

const REGEX_PASSWORD =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export const credential = z.object({
  accountId: z.string(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(30, { message: "Password must be at most 30 characters" })
    .regex(
      REGEX_PASSWORD,
      "Password must contain at least one number, one letter, and one special character"
    ),
  fcmToken: z.string().optional(),
  deviceId: z.string(),
});

export type Credential = z.infer<typeof credential>;
