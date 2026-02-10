import React, { createContext, useContext, useState } from 'react';
import { Product } from '../data/products';

interface WishlistContextValue {
  items: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

interface WishlistProviderProps {
  children: React.ReactNode;
}

export function WishlistProvider({ children }: WishlistProviderProps) {
  const [items, setItems] = useState<Product[]>([]);

  function addToWishlist(product: Product) {
    setItems((current) => {
      if (current.find((item) => item.id === product.id)) {
        return current;
      }
      return [...current, product];
    });
  }

  function removeFromWishlist(productId: string) {
    setItems((current) => current.filter((item) => item.id !== productId));
  }

  function toggleWishlist(product: Product) {
    if (items.find((item) => item.id === product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  }

  function isInWishlist(productId: string): boolean {
    return items.some((item) => item.id === productId);
  }

  function clearWishlist() {
    setItems([]);
  }

  const value: WishlistContextValue = {
    items,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    clearWishlist,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
