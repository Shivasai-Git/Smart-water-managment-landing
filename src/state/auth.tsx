// src/state/auth.tsx
import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

type Role = 'customer' | 'admin';

interface AuthState {
  role: Role | null;
  signedIn: boolean;
  signIn: () => void;
  switchRole: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role | null>(null);
  const [signedIn, setSignedIn] = useState(false);

  const value = useMemo<AuthState>(
    () => ({
      role,
      signedIn,
      signIn: () => {
        setRole('customer');
        setSignedIn(true);
      },
      switchRole: () => setRole((r) => (r === 'admin' ? 'customer' : 'admin')),
      signOut: () => {
        setRole(null);
        setSignedIn(false);
      },
    }),
    [role, signedIn],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
