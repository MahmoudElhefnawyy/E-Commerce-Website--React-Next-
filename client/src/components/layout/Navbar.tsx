import { Link } from "wouter";
import { ShoppingCart, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";

export function Navbar() {
  const { cart } = useCart();
  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <Link href="/">
            <a className="text-xl font-bold">ShopSmart</a>
          </Link>
          <div className="hidden md:flex items-center gap-4">
            <Link href="/products">
              <a className="text-sm">All Products</a>
            </Link>
            <Link href="/products/category/furniture">
              <a className="text-sm">Furniture</a>
            </Link>
            <Link href="/products/category/lighting">
              <a className="text-sm">Lighting</a>
            </Link>
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
          <Link href="/cart">
            <a className="relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full text-xs w-4 h-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
}
