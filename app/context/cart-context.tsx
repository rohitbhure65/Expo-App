import React, { createContext, useContext, useMemo, useState } from 'react';
import { Product } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (product: Product, size?: string, color?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  promoCode: string;
  setPromoCode: (code: string) => void;
  discount: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

interface CartProviderProps {
  children: React.ReactNode;
}

const PROMO_CODES: Record<string, number> = {
  SAVE10: 0.1,
  SAVE20: 0.2,
  FIRST50: 0.5,
};

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [promoCode, setPromoCodeState] = useState('');

  function addToCart(product: Product, size?: string, color?: string) {
    setItems((current) => {
      const existing = current.find(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color,
      );
      if (!existing) {
        return [...current, { product, quantity: 1, selectedSize: size, selectedColor: color }];
      }
      return current.map((item) =>
        item.product.id === product.id &&
        item.selectedSize === size &&
        item.selectedColor === color
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
    });
  }

  function removeFromCart(productId: string) {
    setItems((current) => current.filter((item) => item.product.id !== productId));
  }

  function updateQuantity(productId: string, quantity: number) {
    setItems((current) => {
      if (quantity <= 0) {
        return current.filter((item) => item.product.id !== productId);
      }
      return current.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item,
      );
    });
  }

  function clearCart() {
    setItems([]);
  }

  function setPromoCode(code: string) {
    setPromoCodeState(code.toUpperCase());
  }

  const { totalItems, totalPrice, discount } = useMemo(() => {
    const totals = items.reduce(
      (acc, item) => {
        acc.totalItems += item.quantity;
        acc.totalPrice += item.quantity * item.product.price;
        return acc;
      },
      { totalItems: 0, totalPrice: 0 },
    );

    let discountAmount = 0;
    const discountPercent = PROMO_CODES[promoCode];
    if (discountPercent) {
      discountAmount = totals.totalPrice * discountPercent;
    }

    return { ...totals, discount: discountAmount };
  }, [items, promoCode]);

  const value: CartContextValue = {
    items,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    promoCode,
    setPromoCode,
    discount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
