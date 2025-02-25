import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import type { Product } from "@shared/schema";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: [`/api/products/${id}`],
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="h-[400px] bg-muted animate-pulse rounded-lg" />
          <div className="space-y-4">
            <div className="h-8 bg-muted animate-pulse rounded" />
            <div className="h-4 bg-muted animate-pulse rounded w-24" />
            <div className="h-32 bg-muted animate-pulse rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[400px] object-cover rounded-lg"
        />
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl font-bold">${product.price}</p>
          <p className="text-muted-foreground">{product.description}</p>
          <Button
            size="lg"
            className="w-full"
            onClick={() => addToCart(product, 1)}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
