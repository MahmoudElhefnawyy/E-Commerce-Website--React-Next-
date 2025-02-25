import { Link } from "wouter";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { Product } from "@shared/schema";
import { useCart } from "@/contexts/CartContext";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <Card className="overflow-hidden">
      <Link href={`/product/${product.id}`}>
        <a className="block">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
        </a>
      </Link>
      <CardContent className="p-4">
        <Link href={`/product/${product.id}`}>
          <a className="block">
            <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
          </a>
        </Link>
        <p className="text-xl font-bold">${product.price}</p>
        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
          {product.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          onClick={() => addToCart(product, 1)}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
