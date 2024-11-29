import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Roboto } from "next/font/google";
import { AuthProvider } from "@/providers/auth-provider";

export const metadata: Metadata = {
  title: "Bento.ia",
  description: "Ia para educação",
};

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <AuthProvider>
        <body className={` ${roboto.className}`}>{children}</body>
      </AuthProvider>
    </html>
  );
}
