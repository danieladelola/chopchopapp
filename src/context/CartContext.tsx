import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getCart, addToCart, updateCart, removeFromCart, clearCart, addMultipleToCart } from '../services/api';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  loading: boolean;
  addItem: (item: { id: number; quantity: number }) => Promise<void>;
  updateItem: (item: { id: number; quantity: number }) => Promise<void>;
  removeItem: (itemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  addMultipleItems: (items: { id: number; quantity: number }[]) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const cartData = await getCart();
        // Assuming cartData is an array of cart items
        setCart(cartData);
      } catch (error) {
        // Handle error
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, []);

  const addItem = async (item: { id: number; quantity: number }) => {
    try {
      await addToCart(item);
      const cartData = await getCart(); // Refresh cart
      setCart(cartData);
    } catch (error) {
      // Handle error
    }
  };

  const updateItem = async (item: { id: number; quantity: number }) => {
    try {
      await updateCart(item);
      const cartData = await getCart(); // Refresh cart
      setCart(cartData);
    } catch (error) {
      // Handle error
    }
  };

  const removeItem = async (itemId: number) => {
    try {
      await removeFromCart(itemId);
      const cartData = await getCart(); // Refresh cart
      setCart(cartData);
    } catch (error) {
      // Handle error
    }
  };

  const clearCartItems = async () => {
    try {
      await clearCart();
      setCart([]);
    } catch (error) {
      // Handle error
    }
  };

  const addMultipleItems = async (items: { id: number; quantity: number }[]) => {
    try {
      await addMultipleToCart(items);
      const cartData = await getCart(); // Refresh cart
      setCart(cartData);
    } catch (error) {
      // Handle error
    }
  };

  return (
    <CartContext.Provider value={{ cart, loading, addItem, updateItem, removeItem, clearCart: clearCartItems, addMultipleItems }}>
      {children}
    </CartContext.Provider>
  );
};
