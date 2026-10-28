"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";

import { getProfile } from "@/lib/api";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => void;
  refreshUser: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async (): Promise<boolean> => {
    if (typeof window === "undefined") {
      return false;
    }

    const token = localStorage.getItem("token");

    console.log(
      "[AUTH] token exists:",
      Boolean(token)
    );

    if (!token) {
      setUser(null);
      return false;
    }

    try {
      console.log("[AUTH] checking profile...");

      const response = await getProfile(token);

      console.log(
        "[AUTH] profile response:",
        response?.data
      );

      if (response?.data) {
        setUser(response.data);
        return true;
      }

      console.error(
        "[AUTH] profile response did not contain user"
      );

      return false;
    } catch (error: any) {
      console.error(
        "[AUTH] profile request failed:",
        error
      );

      const status = error?.response?.status;

      console.error(
        "[AUTH] profile status:",
        status
      );

      /*
       * Only remove the token when the backend explicitly
       * says that authentication is invalid.
       *
       * Do NOT remove it for:
       * - server unavailable
       * - network error
       * - CORS error
       * - 500 error
       */
      if (status === 401 || status === 403) {
        console.warn(
          "[AUTH] token rejected by backend"
        );

        localStorage.removeItem("token");
        setUser(null);
      }

      return false;
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    async function initializeAuth() {
      console.log("[AUTH] initializing...");

      await refreshUser();

      if (mounted) {
        setLoading(false);

        console.log(
          "[AUTH] initialization finished"
        );
      }
    }

    initializeAuth();

    return () => {
      mounted = false;
    };
  }, [refreshUser]);

  function logout() {
    console.log("[AUTH] logout");

    localStorage.removeItem("token");
    setUser(null);

    window.location.replace("/login");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}