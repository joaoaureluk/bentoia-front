"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/providers/auth-provider";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
  name?: string; // Para o formulário de signup
};

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const { signIn, signUp } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);

  const onSubmitLogin = async (data: FormData) => {
    console.log(data);
    const error = await signIn(data);
    if (error) {
      console.log(error);
    }
  };

  const onSubmitSignUp = async (data: FormData) => {
    setTimeout(() => {}, 5000);
    const error = await signUp(data);
    if (error) {
      console.log(error);
    }
    setIsSignUp(false);
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-bento">
      <Card className="w-1/3 justify-center px-4">
        <form
          onSubmit={handleSubmit(isSignUp ? onSubmitSignUp : onSubmitLogin)}
          className="grid gap-4"
        >
          <CardHeader className="flex flex-col items-center justify-center">
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxF3KzzSLmohGQJM0U61TvXyDqQbtJyyI4ZQ&s"
              alt="Logo"
              width={100}
              height={100}
            />
            <CardTitle className="text-3xl text-center">
              {isSignUp ? "Cadastrar-se" : "Bento.IA"}
            </CardTitle>
            <CardDescription className="text-center">
              {isSignUp
                ? "Cadastre-se para acessar o Bento.IA"
                : "Seja bem-vindo ao Bento.IA, seu professor personalizado para os estudos."}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {isSignUp && (
              <div>
                <label htmlFor="name">Nome e Sobrenome</label>
                <Input
                  placeholder="Ex: July Bruno"
                  type="text"
                  id="name"
                  {...register("name", { required: "Nome é obrigatório" })}
                />
              </div>
            )}
            <div>
              <label htmlFor="email">Email</label>
              <Input
                placeholder="Ex: july@gmail.com"
                type="email"
                id="email"
                {...register("email", { required: "O email é obrigatório" })}
              />
            </div>
            <div>
              <label htmlFor="password">Senha</label>
              <Input
                placeholder="Ex: 123456"
                type="password"
                id="password"
                {...register("password", { required: "A senha é obrigatória" })}
              />
            </div>
            <p>
              {isSignUp ? (
                <>
                  Já tem uma conta?
                  <span
                    onClick={() => setIsSignUp(false)}
                    className="text-blue-600 hover:text-blue-500 cursor-pointer"
                  >
                    Fazer Login
                  </span>
                </>
              ) : (
                <>
                  Não tem uma conta?
                  <span
                    onClick={() => setIsSignUp(true)}
                    className="text-blue-600 hover:text-blue-500 cursor-pointer"
                  >
                    Cadastrar
                  </span>
                </>
              )}
            </p>
          </CardContent>
          <CardFooter className="w-full flex justify-center">
            <Button type="submit" className="w-1/3">
              {isSignUp ? "Cadastrar" : "Entrar"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
