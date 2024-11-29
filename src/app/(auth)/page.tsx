"use client";

import { ChatBot } from "@/components/chatbot";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/auth-provider";

export default function Home() {
  const { session, signOut } = useAuth();
  return (
    <div className="bg-bento w-full h-screen flex flex-col items-center">
      <Header />
      <main className="flex-1 flex items-center justify-center w-2/3  ">
        <ChatBot />
      </main>
      <footer className="w-full h-[10%]  px-3 py-1 flex items-center justify-between">
        <Button onClick={signOut}>sair</Button>
      </footer>
    </div>
  );
}
