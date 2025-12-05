"use client";
import React from "react";
import { AuthProvider } from "../contexts/AuthContext";
import { CartProvider } from "../contexts/CartContext";
import { CourseProvider } from "../contexts/CourseContext";

export default function GlobalProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <CourseProvider>{children}</CourseProvider>
      </CartProvider>
    </AuthProvider>
  );
}
