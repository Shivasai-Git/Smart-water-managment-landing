// src/state/auth.tsx
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

type Role = 'customer' | 'admin';

interface AuthState {
  role: Role | null;
  signedIn: boolean;
  signIn: () => void;
  switchRole: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthState | null>(null);
const STORAGE_KEY = 'swf.session';

/** The demo session survives a reload for the lifetime of the tab. */
function readStoredRole(): Role | null {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored === 'customer' || stored === 'admin' ? stored : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role | null>(readStoredRole);
  const signedIn = role !== null;

  useEffect(() => {
    try {
      if (role) sessionStorage.setItem(STORAGE_KEY, role);
      else sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* storage unavailable: the session just lasts until reload */
    }
  }, [role]);

  const value = useMemo<AuthState>(
    () => ({
      role,
      signedIn,
      signIn: () => setRole('customer'),
      switchRole: () => setRole((r) => (r === 'admin' ? 'customer' : 'admin')),
      signOut: () => setRole(null),
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
