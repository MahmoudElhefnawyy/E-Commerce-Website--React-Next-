import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "@shared/schema";
import { useCart } from "@/contexts/CartContext";

interface CartItemProps {
  product: Product;
  quantity: number;
}

export function CartItem({ product, quantity }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center gap-4 py-4 border-b">
      <img
        src={product.image}
        alt={product.name}
        className="w-24 h-24 object-cover rounded"
      />
      <div className="flex-grow">
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-sm text-muted-foreground">${product.price}</p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => updateQuantity(product.id, Math.max(0, quantity - 1))}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-8 text-center">{quantity}</span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => updateQuantity(product.id, quantity + 1)}
        >
          <Plus className="h-4 w-4" />
        </Button>
        <Button
          variant="destructive"
          size="icon"
          onClick={() => removeFromCart(product.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
