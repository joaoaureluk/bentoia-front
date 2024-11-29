import { getSession } from "@/lib/getSession";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated } = await getSession();

  if (!isAuthenticated) {
    redirect("/sign-in");
  }
  return <>{children}</>;
}
