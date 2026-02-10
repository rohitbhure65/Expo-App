import React, { createContext, useContext, useState } from 'react';
import { CartItem } from './cart-context';

export type OrderStatus = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
}

interface OrdersContextValue {
  orders: Order[];
  addOrder: (
    items: CartItem[],
    subtotal: number,
    discount: number,
    shipping: number,
    customerInfo: { name: string; email: string; address: string },
  ) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  getOrderById: (orderId: string) => Order | undefined;
  getOrdersByStatus: (status: OrderStatus) => Order[];
}

const OrdersContext = createContext<OrdersContextValue | undefined>(undefined);

interface OrdersProviderProps {
  children: React.ReactNode;
}

function generateOrderId(): string {
  return `ORD-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
}

export function OrdersProvider({ children }: OrdersProviderProps) {
  const [orders, setOrders] = useState<Order[]>([]);

  function addOrder(
    items: CartItem[],
    subtotal: number,
    discount: number,
    shipping: number,
    customerInfo: { name: string; email: string; address: string },
  ): Order {
    const order: Order = {
      id: generateOrderId(),
      items,
      subtotal,
      discount,
      shipping,
      total: subtotal - discount + shipping,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      customerName: customerInfo.name,
      customerEmail: customerInfo.email,
      shippingAddress: customerInfo.address,
    };

    setOrders((current) => [order, ...current]);
    return order;
  }

  function updateOrderStatus(orderId: string, status: OrderStatus) {
    setOrders((current) =>
      current.map((order) => (order.id === orderId ? { ...order, status } : order)),
    );
  }

  function getOrderById(orderId: string): Order | undefined {
    return orders.find((order) => order.id === orderId);
  }

  function getOrdersByStatus(status: OrderStatus): Order[] {
    return orders.filter((order) => order.status === status);
  }

  const value: OrdersContextValue = {
    orders,
    addOrder,
    updateOrderStatus,
    getOrderById,
    getOrdersByStatus,
  };

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrdersProvider');
  }
  return context;
}
