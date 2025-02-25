import { products, type Product, type InsertProduct } from "@shared/schema";

export interface IStorage {
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
}

export class MemStorage implements IStorage {
  private products: Map<number, Product>;

  constructor() {
    this.products = new Map();
    this.initializeProducts();
  }

  private initializeProducts() {
    const mockProducts: Product[] = [
      {
        id: 1,
        name: "Modern Desk Lamp",
        description: "LED desk lamp with adjustable brightness and color temperature",
        price: "49.99",
        image: "https://placehold.co/400x300",
        category: "lighting"
      },
      {
        id: 2,
        name: "Ergonomic Office Chair",
        description: "Comfortable office chair with lumbar support",
        price: "199.99",
        image: "https://placehold.co/400x300",
        category: "furniture"
      },
      // Add more mock products as needed
    ];

    mockProducts.forEach(product => {
      this.products.set(product.id, product);
    });
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      product => product.category === category
    );
  }
}

export const storage = new MemStorage();
