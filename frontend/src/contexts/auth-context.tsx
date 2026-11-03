"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import type {
  AuthUser,
  LoginCredentials,
  RegisterData,
  UserRole,
} from "@/types/auth";
import {
  getAuthToken,
  setAuthToken,
  removeAuthToken,
} from "@/lib/auth-storage";
import {
  loginApi,
  registerApi,
  getCurrentUserApi,
} from "@/lib/api/auth";

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<AuthUser>;
  register: (data: RegisterData) => Promise<AuthUser>;
  logout: () => void;
  refreshUser: () => Promise<AuthUser | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  const logout = useCallback(() => {
    removeAuthToken();
    setUser(null);
    setTokenState(null);
    router.push("/login");
  }, [router]);

  const refreshUser = useCallback(async (): Promise<AuthUser | null> => {
    const existingToken = getAuthToken();
    if (!existingToken) {
      setUser(null);
      setTokenState(null);
      return null;
    }

    try {
      const currentUser = await getCurrentUserApi();
      setUser(currentUser);
      setTokenState(existingToken);
      return currentUser;
    } catch {
      removeAuthToken();
      setUser(null);
      setTokenState(null);
      return null;
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    async function initAuth() {
      const existingToken = getAuthToken();
      if (!existingToken) {
        if (mounted) {
          setIsLoading(false);
        }
        return;
      }

      try {
        const currentUser = await getCurrentUserApi();
        if (mounted) {
          setUser(currentUser);
          setTokenState(existingToken);
        }
      } catch {
        removeAuthToken();
        if (mounted) {
          setUser(null);
          setTokenState(null);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    initAuth();

    return () => {
      mounted = false;
    };
  }, []);

  const login = useCallback(
    async (credentials: LoginCredentials): Promise<AuthUser> => {
      const response = await loginApi(credentials);
      setAuthToken(response.token);
      setTokenState(response.token);
      setUser(response.user);
      return response.user;
    },
    []
  );

  const register = useCallback(
    async (data: RegisterData): Promise<AuthUser> => {
      const response = await registerApi(data);
      setAuthToken(response.token);
      setTokenState(response.token);
      setUser(response.user);
      return response.user;
    },
    []
  );

  const value: AuthContextType = {
    user,
    token,
    role: user?.role ?? null,
    isAuthenticated: !!user && !!token,
    isLoading,
    login,
    register,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

