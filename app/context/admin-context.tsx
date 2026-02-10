import React, { createContext, useContext, useState } from 'react';
import { Product, PRODUCTS, getProductById } from '../data/products';
import { CATEGORIES, Category } from '../data/categories';
import { useOrders } from './orders-context';

interface AdminContextValue {
  products: Product[];
  categories: Category[];
  addProduct: (product: Omit<Product, 'id'>) => Product;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => Category;
  deleteCategory: (id: string) => void;
  getTotalRevenue: () => number;
  getTotalOrders: () => number;
  getLowStockCount: () => number;
  getTopSellingProducts: () => { product: Product; totalSold: number }[];
}

const AdminContext = createContext<AdminContextValue | undefined>(undefined);

interface AdminProviderProps {
  children: React.ReactNode;
}

let productsState = [...PRODUCTS];
let categoriesState = [...CATEGORIES];

export function AdminProvider({ children }: AdminProviderProps) {
  const { orders } = useOrders();
  const [products, setProducts] = useState<Product[]>(productsState);
  const [categories, setCategories] = useState<Category[]>(categoriesState);

  function addProduct(productData: Omit<Product, 'id'>): Product {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now().toString(36)}`,
    };
    productsState = [...productsState, newProduct];
    setProducts(productsState);
    return newProduct;
  }

  function updateProduct(id: string, updates: Partial<Product>) {
    productsState = productsState.map((p) => (p.id === id ? { ...p, ...updates } : p));
    setProducts(productsState);
  }

  function deleteProduct(id: string) {
    productsState = productsState.filter((p) => p.id !== id);
    setProducts(productsState);
  }

  function addCategory(categoryData: Omit<Category, 'id'>): Category {
    const newCategory: Category = {
      ...categoryData,
      id: `cat-${Date.now().toString(36)}`,
    };
    categoriesState = [...categoriesState, newCategory];
    setCategories(categoriesState);
    return newCategory;
  }

  function deleteCategory(id: string) {
    categoriesState = categoriesState.filter((c) => c.id !== id);
    setCategories(categoriesState);
  }

  function getTotalRevenue(): number {
    return orders
      .filter((o) => o.status !== 'CANCELLED')
      .reduce((sum, order) => sum + order.total, 0);
  }

  function getTotalOrders(): number {
    return orders.length;
  }

  function getLowStockCount(): number {
    return products.filter((p) => p.stock < 20).length;
  }

  function getTopSellingProducts(): { product: Product; totalSold: number }[] {
    const salesMap = new Map<string, number>();
    orders.forEach((order) => {
      order.items.forEach((item) => {
        const current = salesMap.get(item.product.id) || 0;
        salesMap.set(item.product.id, current + item.quantity);
      });
    });

    return [...salesMap.entries()]
      .map(([productId, totalSold]) => ({
        product: getProductById(productId)!,
        totalSold,
      }))
      .filter((item) => item.product)
      .sort((a, b) => b.totalSold - a.totalSold)
      .slice(0, 5);
  }

  const value: AdminContextValue = {
    products,
    categories,
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory,
    deleteCategory,
    getTotalRevenue,
    getTotalOrders,
    getLowStockCount,
    getTopSellingProducts,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
