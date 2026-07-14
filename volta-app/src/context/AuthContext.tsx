"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  isDealer: boolean;
  discountRate: number; // e.g. 0.10 for 10%
  loginDealer: () => void;
  logoutDealer: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isDealer, setIsDealer] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const savedStatus = localStorage.getItem("volta_is_dealer");
      if (savedStatus === "true") {
        setIsDealer(true);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const loginDealer = () => {
    setIsDealer(true);
    localStorage.setItem("volta_is_dealer", "true");
  };

  const logoutDealer = () => {
    setIsDealer(false);
    localStorage.setItem("volta_is_dealer", "false");
  };

  // 10% discount if dealer
  const discountRate = isDealer ? 0.10 : 0;

  return (
    <AuthContext.Provider value={{ isDealer, discountRate, loginDealer, logoutDealer }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
