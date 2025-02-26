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
                className="w-8 h-8 text-primary"
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M4.75 3C4.75 2.58579 4.41421 2.25 4 2.25C3.58579 2.25 3.25 2.58579 3.25 3V3.77L2.0368 4.2318C1.96274 4.26236 1.89423 4.30324 1.83301 4.35296C1.77178 4.40269 1.71868 4.46087 1.67569 4.52555C1.63269 4.59023 1.60033 4.66061 1.57996 4.73422C1.55959 4.80784 1.55147 4.88384 1.55586 4.95969L2.25 20.5059C2.27881 21.326 2.4858 22.1227 2.88878 22.8308C3.29176 23.5389 3.87748 24.1355 4.58044 24.5511C5.2834 24.9667 6.07708 25.1876 6.89723 25.1904C7.71738 25.1932 8.51268 24.9778 9.21844 24.5671L10.6875 23.7521V23.75H13.3125V23.7521L14.7816 24.5671C15.4873 24.9778 16.2826 25.1932 17.1028 25.1904C17.9229 25.1876 18.7166 24.9667 19.4196 24.5511C20.1225 24.1355 20.7082 23.5389 21.1112 22.8308C21.5142 22.1227 21.7212 21.326 21.75 20.5059L22.4441 4.95969C22.4485 4.88384 22.4404 4.80784 22.42 4.73422C22.3997 4.66061 22.3673 4.59023 22.3243 4.52555C22.2813 4.46087 22.2282 4.40269 22.167 4.35296C22.1058 4.30324 22.0373 4.26236 21.9632 4.2318L20.75 3.77V3C20.75 2.58579 20.4142 2.25 20 2.25C19.5858 2.25 19.25 2.58579 19.25 3V3.25H4.75V3Z" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M9 12L15 12" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M12 9L12 15" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Shopey
              </span>
            </a>
          </Link>
          <div className="hidden md:flex items-center gap-8">
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

          <SignedOut>
            <Link href="/sign-up">
              <Button variant="secondary" className="gap-2">
                <UserCircle className="h-4 w-4" />
                Sign Up
              </Button>
            </Link>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
}