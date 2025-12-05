// context/CartContext.tsx
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import type { CartItem } from './AuthContext';

interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  addToCart: (item: CartItem) => { ok: boolean; message?: string };
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const CART_KEY = 'cart';

const CartContext = createContext<CartContextType | undefined>(undefined);

function safeParse<T>(value: string | null, fallback: T): T {
  try {
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    return safeParse<CartItem[]>(localStorage.getItem(CART_KEY), []);
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {}
  }, [cart]);

  const addToCart = (item: CartItem) => {
    const exists = cart.some((c) => c.id === item.id);
    if (exists) return { ok: false, message: 'Item already in cart.' };
    setCart((prev) => [...prev, item]);
    return { ok: true };
  };

  const removeFromCart = (id: string) => setCart((prev) => prev.filter((c) => c.id !== id));

  const clearCart = () => setCart([]);

  const value: CartContextType = {
    cart,
    cartCount: cart.length,
    addToCart,
    removeFromCart,
    clearCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
