"use client";

import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import type { User } from '@/lib/types';
import { getSession, logIn, logOut, signUp } from '@/lib/auth';
import type { z } from 'zod';
import type { loginSchema, signupSchema } from '@/lib/schemas';

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (credentials: z.infer<typeof loginSchema>) => Promise<User>;
  signup: (details: z.infer<typeof signupSchema>) => Promise<User>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const session = getSession();
      if (session) {
        setUser(session.user);
      }
    } catch (error) {
      console.error("Failed to load session:", error);
      // If session is corrupt, clear it
      logOut();
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const handleLogin = useCallback(async (credentials: z.infer<typeof loginSchema>) => {
    const loggedInUser = await logIn(credentials);
    setUser(loggedInUser);
    return loggedInUser;
  }, []);

  const handleSignup = useCallback(async (details: z.infer<typeof signupSchema>) => {
    const newUser = await signUp(details);
    setUser(newUser);
    return newUser;
  }, []);

  const handleLogout = useCallback(() => {
    logOut();
    setUser(null);
  }, []);

  const value = {
    user,
    isLoading,
    login: handleLogin,
    signup: handleSignup,
    logout: handleLogout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
