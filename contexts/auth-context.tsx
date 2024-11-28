"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { onAuthStateChange, handleGoogleSignInRedirect } from "@/lib/auth";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
  
      try {
        await handleGoogleSignInRedirect(); // Handle redirect result first
        const unsubscribe = onAuthStateChange((user) => {
          setUser(user);
  
          const adminEmail = "strevor948@gmail.com";
          const userEmail = user?.email?.toLowerCase();
          const isAdminUser = userEmail === adminEmail;
  
          setIsAdmin(isAdminUser);
  
          if (isAdminUser) {
            router.push("/admin");
          } else if (!user) {
            router.push("/");
          }
          setLoading(false);
        });
  
        return unsubscribe;
      } catch (error) {
        console.error('Error during initialization:', error);
        setLoading(false);
      }
    };
  
    initializeAuth();
  }, [router]);
  
  return (
    <AuthContext.Provider value={{ user, isAdmin, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);