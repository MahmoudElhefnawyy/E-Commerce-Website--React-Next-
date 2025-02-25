import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/components/cart/CartItem";
import { useCart } from "@/contexts/CartContext";
import type { Product } from "@shared/schema";

export default function Cart() {
  const { cart } = useCart();

  const { data: products } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const cartItems = cart.items.map((item) => ({
    product: products?.find((p) => p.id === item.productId),
    quantity: item.quantity,
  }));

  const total = cartItems.reduce((sum, item) => {
    if (!item.product) return sum;
    return sum + Number(item.product.price) * item.quantity;
  }, 0);

  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-8">
          Start shopping to add items to your cart
        </p>
        <Link href="/products">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {cartItems.map(
            (item) =>
              item.product && (
                <CartItem
                  key={item.product.id}
                  product={item.product}
                  quantity={item.quantity}
                />
              ),
          )}
        </div>
        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <Link href="/checkout">
            <Button className="w-full">Proceed to Checkout</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
