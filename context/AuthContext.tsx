/* eslint-disable react-hooks/set-state-in-effect */
// context/AuthContext.tsx
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export interface CartItem {
  id: string;
  title: string;
  price: string;
  image?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // Mock only; never store plaintext in production
  plan?: string;
  myCourses: CartItem[];
}

interface AuthContextType {
  users: User[];
  currentUser: User | null;
  login: (email: string, password: string) => { ok: boolean; message?: string };
  register: (payload: Omit<User, 'myCourses' | 'id'> & Partial<Pick<User, 'myCourses'>>) => { ok: boolean; message?: string };
  logout: () => void;
  updateUser: (nextUser: User) => void;
  isAuthenticated: boolean;
}

const USERS_KEY = 'users';
const CURRENT_USER_KEY = 'currentUser';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function safeParse<T>(value: string | null, fallback: T): T {
  try {
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(() => {
    if (typeof window === 'undefined') return [];
    return safeParse<User[]>(localStorage.getItem(USERS_KEY), []);
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    if (typeof window === 'undefined') return null;
    return safeParse<User | null>(localStorage.getItem(CURRENT_USER_KEY), null);
  });

  useEffect(() => {
    try {
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    } catch {}
  }, [users]);

  useEffect(() => {
    try {
      if (currentUser) localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
      else localStorage.removeItem(CURRENT_USER_KEY);
    } catch {}
  }, [currentUser]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const storedUsers = safeParse<User[]>(localStorage.getItem(USERS_KEY), []);
    const storedCurrent = safeParse<User | null>(localStorage.getItem(CURRENT_USER_KEY), null);
    setUsers(storedUsers);
    setCurrentUser(storedCurrent);
  }, []);

  const login = (email: string, password: string) => {
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) return { ok: false, message: 'Invalid email or password.' };
    setCurrentUser(found);
    return { ok: true };
  };

  const register = (payload: Omit<User, 'myCourses' | 'id'> & Partial<Pick<User, 'myCourses'>>) => {
    const exists = users.some((u) => u.email === payload.email);
    if (exists) return { ok: false, message: 'Email already registered.' };
    const newUser: User = {
      id: `user_${Date.now()}`,
      name: payload.name,
      email: payload.email,
      password: payload.password,
      plan: payload.plan ?? 'free',
      myCourses: payload.myCourses ?? []
    };
    const nextUsers = [...users, newUser];
    setUsers(nextUsers);
    setCurrentUser(newUser);
    return { ok: true };
  };

  const logout = () => setCurrentUser(null);

  const updateUser = (nextUser: User) => {
    const nextUsers = users.map((u) => (u.id === nextUser.id ? nextUser : u));
    setUsers(nextUsers);
    if (currentUser?.id === nextUser.id) setCurrentUser(nextUser);
  };

  const value: AuthContextType = {
    users,
    currentUser,
    login,
    register,
    logout,
    updateUser,
    isAuthenticated: !!currentUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
