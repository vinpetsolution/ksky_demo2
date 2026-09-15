"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { AUTH_TOKEN_KEY, AUTH_USER_KEY } from "@/constants/general";
import { demoLogin } from "@/app/actions/demo-auth";
import type { RegisterRequest } from "@/models/credential";

const SESSION_MARKER_KEY = "auth_session_active";

export interface User {
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
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userName: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (data: RegisterRequest) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  refreshUserProfile: (userName?: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function readStoredSession(): { token: string; user: User } | null {
  try {
    const savedToken = localStorage.getItem(AUTH_TOKEN_KEY);
    const savedUser = localStorage.getItem(AUTH_USER_KEY);
    const sessionMarker = sessionStorage.getItem(SESSION_MARKER_KEY);

    if (savedToken && savedUser && sessionMarker) {
      return { token: savedToken, user: JSON.parse(savedUser) as User };
    }

    if (savedToken || savedUser) {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_USER_KEY);
    }
  } catch {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
    sessionStorage.removeItem(SESSION_MARKER_KEY);
  }
  return null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = readStoredSession();
      if (stored) {
        setToken(stored.token);
        setUser(stored.user);
      }
      setIsLoading(false);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const refreshUserProfile = useCallback(async () => {
    // Demo mode: no backend profile to refresh.
  }, []);

  const login = useCallback(
    async (userName: string, password: string): Promise<{ success: boolean; message: string }> => {
      try {
        const res = await demoLogin(userName, password);

        if (res.success) {
          setUser(res.user);
          setToken(res.token);
          localStorage.setItem(AUTH_TOKEN_KEY, res.token);
          localStorage.setItem(AUTH_USER_KEY, JSON.stringify(res.user));
          sessionStorage.setItem(SESSION_MARKER_KEY, "true");
          return { success: true, message: res.message };
        }

        return { success: false, message: res.message };
      } catch {
        return { success: false, message: "잘못된 로그인 정보" };
      }
    },
    [],
  );

  const register = useCallback(
    async (): Promise<{ success: boolean; message: string }> => {
      return {
        success: false,
        message: "데모 사이트에서는 회원가입이 불가합니다.",
      };
    },
    [],
  );

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
    sessionStorage.removeItem(SESSION_MARKER_KEY);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        isLoading,
        login,
        register,
        logout,
        refreshUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
