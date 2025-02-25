import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ProductCard } from "@/components/products/ProductCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Product } from "@shared/schema";

export default function Products() {
  const [category, setCategory] = useState<string>("all");
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: [
      category === "all"
        ? "/api/products"
        : `/api/products/category/${category}`,
    ],
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">All Products</h1>
        <Select
          value={category}
          onValueChange={(value) => setCategory(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="furniture">Furniture</SelectItem>
            <SelectItem value="lighting">Lighting</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="h-[350px] rounded-lg bg-muted animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
