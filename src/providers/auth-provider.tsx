"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { AuthContextType, SignInData, User } from "@/types/authenticate";
import { api } from "@/lib/api";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;
const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isCadastrating, setIsCadastrating] = React.useState(false);
  const isAuthenticated = !!user;
  const router = useRouter();

  React.useEffect(() => {
    const cookies = parseCookies();
    const { "nextauth.userId": userId, "nextauth.accessToken": accessToken } =
      cookies;

    if (!userId || !accessToken) {
      destroyCookie(null, "nextauth.accessToken");
      destroyCookie(null, "nextauth.userId");
      router.replace("/sign-in");
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await api.get(`/user/${userId}`);

        if (response) {
          setUser({
            userId: response.data.userId,
            name: response.data.name,
            email: response.data.email,
          });
        }
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        router.replace("/sign-in");
      }
    };

    fetchUser();
  }, [router, isAuthenticated]);

  async function signIn({
    email,
    password,
  }: SignInData): Promise<string | null> {
    try {
      setIsSubmitting(true);
      const response = await axios.post(`${API_URL}/auth`, {
        email,
        password,
      });

      if (response.status !== 200) {
        throw new Error("Erro ao autenticar");
      }

      const { authCode, userId } = response.data.data;

      setCookie(null, "nextauth.accessToken", authCode, {
        path: "/",
        maxAge: 60 * 60 * 1 - 60, // 59 minutos
      });

      setCookie(null, "nextauth.userId", userId, {
        path: "/",
      });

      setUser({
        userId,
      });
      router.replace("/");
      setIsSubmitting(false);
      return null;
    } catch (error) {
      setIsSubmitting(false);
      if (axios.isAxiosError(error)) {
        return error.response?.data?.message || "Erro ao autenticar";
      }
      console.error("Erro inesperado:", error);
      return "Erro inesperado ao autenticar";
    }
  }

  async function signUp({
    email,
    password,
    name,
  }: SignInData): Promise<void | null> {
    setIsCadastrating(true);
    const response = await axios.post(`${API_URL}/user`, {
      email,
      password,
      name,
    });

    if (response.status !== 200) {
      console.error("Erro ao cadastrar", response.data);
    }

    setIsCadastrating(false);
    return null;
  }

  const signOut = () => {
    destroyCookie(null, "nextauth.accessToken");
    destroyCookie(null, "nextauth.userId");
    setUser(null);
    router.replace("/sign-in");
  };

  return (
    <AuthContext.Provider
      value={{
        session: {
          isAuthenticated,
          user,
        },
        signIn,
        signUp,
        signOut,
        isSubmitting,
        isCadastrating,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro do AuthProvider");
  }
  return context;
}
