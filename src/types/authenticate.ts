export type User = {
  userId: number;
  name?: string;
  email?: string;
};

export type Session = {
  isAuthenticated: boolean;
  user: User | null;
};

export type SignInData = {
  email: string;
  password: string;
  name?: string;
};

export type AuthContextType = {
  session: Session;
  signIn: (data: SignInData) => Promise<string | null>;
  signUp: (data: SignInData) => Promise<void | null>;
  signOut: () => void;
  isSubmitting: boolean;
  isCadastrating: boolean;
};
