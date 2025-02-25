import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@shared/schema";

const checkoutSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  address: z.string().min(5, "Please enter your full address"),
  city: z.string().min(2, "Please enter your city"),
  state: z.string().min(2, "Please enter your state"),
  zipCode: z.string().min(5, "Please enter a valid zip code"),
  cardNumber: z.string().min(16, "Please enter a valid card number"),
  expiryDate: z.string().min(5, "Please enter a valid expiry date (MM/YY)"),
  cvv: z.string().min(3, "Please enter a valid CVV"),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function Checkout() {
  const [isProcessing, setIsProcessing] = useState(false);
  const { cart, clearCart } = useCart();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
  });

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

  async function onSubmit(data: CheckoutFormData) {
    setIsProcessing(true);
    
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Mock successful checkout
    clearCart();
    toast({
      title: "Order Placed Successfully!",
      description: "Thank you for your purchase. You will receive a confirmation email shortly.",
    });
    setLocation("/");
  }

  if (cart.items.length === 0) {
    setLocation("/cart");
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Personal Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input type="tel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Shipping Address</h2>
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ZIP Code</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Payment Information</h2>
                <FormField
                  control={form.control}
                  name="cardNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card Number</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="expiryDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expiry Date</FormLabel>
                        <FormControl>
                          <Input placeholder="MM/YY" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cvv"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CVV</FormLabel>
                        <FormControl>
                          <Input type="password" maxLength={4} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isProcessing}
              >
                {isProcessing && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isProcessing ? "Processing..." : `Pay $${total.toFixed(2)}`}
              </Button>
            </form>
          </Form>
        </div>

        <div>
          <div className="border rounded-lg p-4 sticky top-4">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {cartItems.map(
                (item) =>
                  item.product && (
                    <div
                      key={item.product.id}
                      className="flex items-center gap-4"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-grow">
                        <p className="font-medium">{item.product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium">
                        ${(Number(item.product.price) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ),
              )}
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
