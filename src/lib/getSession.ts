import { cookies } from "next/headers";

interface SessionData {
  isAuthenticated: boolean;
}

export async function getSession(): Promise<SessionData> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("nextauth.accessToken")?.value;

    if (!token) {
      return {
        isAuthenticated: false,
      };
    }

    return {
      isAuthenticated: true,
    };
  } catch (error) {
    console.error("Sessão inválida. " + error);
    return {
      isAuthenticated: false,
    };
  }
}
