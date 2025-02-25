import { pgTable, text, serial, integer, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: numeric("price").notNull(),
  image: text("image").notNull(),
  category: text("category").notNull(),
});

export const insertProductSchema = createInsertSchema(products).pick({
  name: true,
  description: true,
  price: true,
  image: true,
  category: true,
});

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

// Cart types
export interface CartItem {
  productId: number;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
}
