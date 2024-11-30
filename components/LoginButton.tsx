import { Button } from '@/components/ui/button';
import { signInWithGoogle, signOut } from '@/lib/auth';
import { useAuth } from '@/contexts/auth-context';
import { LogIn, LogOut } from 'lucide-react';

export function LoginButton() {
  const { user } = useAuth();

  const handleAuth = async () => {
    if (user) {
      await signOut();
    } else {
      await signInWithGoogle();
    }
  };

  return (
    <Button 
      onClick={handleAuth}
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
    >
      {user ? (
        <>
          <LogOut className="mr-2 h-4 w-4" /> Sign Out
        </>
      ) : (
        <>
          <LogIn className="mr-2 h-4 w-4" /> Sign In with Google
        </>
      )}
    </Button>
  );
}

