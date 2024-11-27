"use client";

import { Button } from "@/components/ui/button";
import { signInWithGoogle, signOut } from "@/lib/auth";
import { useAuth } from "@/contexts/auth-context";
import { LogIn, LogOut } from "lucide-react";

export function LoginButton() {
  const { user } = useAuth();

  const handleAuth = async () => {
    try {
      if (user) {
        await signOut();
      } else {
        await signInWithGoogle();
      }
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  return (
    <Button
      onClick={handleAuth}
      variant="outline"
      className="flex items-center gap-2"
    >
      {user ? (
        <>
          <LogOut className="h-4 w-4" />
          Sign Out
        </>
      ) : (
        <>
          <LogIn className="h-4 w-4" />
          Sign In
        </>
      )}
    </Button>
  );
}