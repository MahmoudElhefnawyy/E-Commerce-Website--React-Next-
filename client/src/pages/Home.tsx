import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/ProductCard";
import type { Product } from "@shared/schema";

export default function Home() {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="container mx-auto px-4">
        <div className="relative rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/50" />
          <div className="relative py-24 px-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Welcome to ShopSmart
            </h1>
            <p className="text-lg text-white/90 mb-8 max-w-lg">
              Discover our curated collection of modern home furnishings and decor.
            </p>
            <Link href="/products">
              <Button size="lg" variant="secondary">
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Link href="/products">
            <Button variant="ghost">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-[350px] rounded-lg bg-muted animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products?.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
