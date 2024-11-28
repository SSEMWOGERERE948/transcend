"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { LoginButton } from "./auth/login-button";
import { useAuth } from "@/contexts/auth-context";

const routes = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/products",
    label: "Products",
  },
  {
    href: "/about",
    label: "About",
  },
  {
    href: "/contact",
    label: "Contact",
  },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { user, isAdmin, loading } = useAuth();

  return (
    <header className="border-b">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        <Link href="/" className="flex items-center space-x-2">
          <img
            src="/logo.jpg"
            alt="Doda Logo"
            className="h-12 w-12" // Updated size
            />
          <span className="text-xl font-bold text-purple-600">Doda</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`text-sm font-medium transition-colors hover:text-purple-600
                ${pathname === route.href ? "text-purple-600" : "text-gray-700"}`}
            >
              {route.label}
            </Link>
          ))}
          {!loading && isAdmin && (
            <Link
              href="/admin"
              className="text-sm font-medium text-purple-600 hover:text-purple-700"
            >
              Admin Dashboard
            </Link>
          )}
          <LoginButton />
          <Link href="/products">
            <Button variant="default" className="bg-purple-600 hover:bg-purple-700">
              Shop Now
            </Button>
          </Link>

        </nav>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col space-y-4 mt-4">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={`text-sm font-medium transition-colors hover:text-purple-600
                    ${pathname === route.href ? "text-purple-600" : "text-gray-700"}`}
                  onClick={() => setOpen(false)}
                >
                  {route.label}
                </Link>
              ))}
              {!loading && isAdmin && (
                <Link
                  href="/admin"
                  className="text-sm font-medium text-purple-600 hover:text-purple-700"
                  onClick={() => setOpen(false)}
                >
                  Admin Dashboard
                </Link>
              )}
              <LoginButton />
              <Button variant="default" className="bg-purple-600 hover:bg-purple-700">
                Shop Now
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
