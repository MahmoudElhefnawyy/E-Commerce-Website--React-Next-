import { Link, useLocation } from "wouter";
import { ShoppingCart, Menu, Search, UserCircle } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { cart } = useCart();
  const [location] = useLocation();
  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <Link href="/">
            <a className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <svg
                viewBox="0 0 24 24"
                className="w-8 h-8 text-primary"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 22V12h6v10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Shopey
              </span>
            </a>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {[
              { href: "/", label: "Home" },
              { href: "/products", label: "Products" },
              { href: "/about", label: "About" },
              { href: "/contact", label: "Contact" },
            ].map((link) => (
              <Link key={link.href} href={link.href}>
                <a
                  className={cn(
                    "relative py-1 text-sm transition-colors",
                    location === link.href
                      ? "text-white font-medium"
                      : "text-muted-foreground hover:text-white",
                    "after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-white after:transition-transform hover:after:scale-x-100"
                  )}
                >
                  {link.label}
                </a>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex relative w-64">
            <Input
              type="search"
              placeholder="Search products..."
              className="pr-8"
            />
            <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          <SignedOut>
            <Link href="/sign-up">
              <Button variant="secondary" className="gap-2">
                <UserCircle className="h-4 w-4" />
                Sign Up
              </Button>
            </Link>
          </SignedOut>

          <Link href="/cart">
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-primary/10 transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full text-xs w-4 h-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}