import { createContext, useContext, useReducer, useEffect } from "react";
import type { Cart, CartItem, Product } from "@shared/schema";

interface CartContextType {
  cart: Cart;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "UPDATE_QUANTITY"; payload: CartItem }
  | { type: "CLEAR_CART" };

function cartReducer(state: Cart, action: CartAction): Cart {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(
        item => item.productId === action.payload.productId
      );
      if (existingItem) {
        return {
          items: state.items.map(item =>
            item.productId === action.payload.productId
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      }
      return { items: [...state.items, action.payload] };
    }
    case "REMOVE_ITEM":
      return {
        items: state.items.filter(item => item.productId !== action.payload),
      };
    case "UPDATE_QUANTITY":
      return {
        items: state.items.map(item =>
          item.productId === action.payload.productId ? action.payload : item
        ),
      };
    case "CLEAR_CART":
      return { items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, { items: [] });

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      dispatch({ type: "CLEAR_CART" });
      JSON.parse(savedCart).items.forEach((item: CartItem) => {
        dispatch({ type: "ADD_ITEM", payload: item });
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, quantity: number) => {
    dispatch({
      type: "ADD_ITEM",
      payload: { productId: product.id, quantity },
    });
  };

  const removeFromCart = (productId: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: productId });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { productId, quantity },
    });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
