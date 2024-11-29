"use client";

import { useAuth } from "@/providers/auth-provider";
import { Avatar, AvatarFallback } from "./ui/avatar";
import Image from "next/image";
import { UserRound } from "lucide-react";

export const Header = () => {
  const { session } = useAuth();
  return (
    <>
      <header className="w-full px-3 py-1 flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-background font-bold">Bento.IA</h1>
        </div>
        <div className="w-auto h-10 flex gap-2 items-center">
          <p className="text-background font-bold text-3xl">
            {session?.user?.name}
          </p>
          <Avatar>
            <AvatarFallback>
              <UserRound />
            </AvatarFallback>
          </Avatar>
        </div>
      </header>
      {/* <div>{session.user?.name}</div>
      <div>{session?.user?.userId}</div>
      <div>{session?.isAuthenticated ? "Logado" : "Não logado"}</div> */}
    </>
  );
};
