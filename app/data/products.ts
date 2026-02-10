export type ProductBadge = 'NEW' | 'SALE' | 'BEST_SELLER' | 'NONE';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  categoryId: string;
  rating: number;
  reviews: number;
  sizes?: string[];
  colors?: string[];
  stock: number;
  badge: ProductBadge;
  sku: string;
  features?: string[];
  specifications?: Record<string, string>;
}

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Wireless Noise Cancelling Headphones',
    description: 'Premium wireless headphones with active noise cancellation, 30-hour battery life, and immersive sound quality.',
    price: 129.99,
    originalPrice: 199.99,
    image: 'https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg',
    images: ['https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg'],
    category: 'Electronics',
    categoryId: '1',
    rating: 4.8,
    reviews: 1254,
    colors: ['Black', 'White', 'Silver'],
    stock: 45,
    badge: 'BEST_SELLER',
    sku: 'ELEC-001',
    features: ['Active Noise Cancellation', '30hr Battery', 'Bluetooth 5.2'],
  },
  {
    id: '2',
    name: 'Smart Watch Pro',
    description: 'Advanced smartwatch with health monitoring, GPS tracking, and 7-day battery life.',
    price: 199.99,
    originalPrice: 299.99,
    image: 'https://images.pexels.com/photos/2774062/pexels-photo-2774062.jpeg',
    category: 'Electronics',
    categoryId: '1',
    rating: 4.6,
    reviews: 892,
    colors: ['Black', 'Silver', 'Gold'],
    stock: 28,
    badge: 'SALE',
    sku: 'ELEC-002',
    features: ['Heart Rate Monitor', 'GPS', 'Water Resistant 50m'],
  },
  {
    id: '3',
    name: 'Portable Bluetooth Speaker',
    description: 'Compact yet powerful waterproof speaker with 360° sound and 20-hour playtime.',
    price: 49.99,
    image: 'https://images.pexels.com/photos/18023372/pexels-photo-18023372/free-photo-of-electronic-device.jpeg',
    category: 'Electronics',
    categoryId: '1',
    rating: 4.5,
    reviews: 567,
    colors: ['Black', 'Blue', 'Red'],
    stock: 78,
    badge: 'NONE',
    sku: 'ELEC-003',
    features: ['Waterproof IPX7', '360° Sound', '20hr Battery'],
  },
  {
    id: '4',
    name: 'Classic Cotton T-Shirt',
    description: 'Premium 100% organic cotton t-shirt with a relaxed fit.',
    price: 24.99,
    originalPrice: 34.99,
    image: 'https://images.pexels.com/photos/10026491/pexels-photo-10026491.jpeg',
    category: 'Clothing',
    categoryId: '2',
    rating: 4.4,
    reviews: 324,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Navy', 'Gray'],
    stock: 156,
    badge: 'NONE',
    sku: 'CLTH-001',
    features: ['100% Organic Cotton', 'Pre-shrunk', 'Reinforced Collar'],
  },
  {
    id: '5',
    name: 'Running Shoes Ultra',
    description: 'Lightweight running shoes with responsive cushioning and breathable mesh upper.',
    price: 89.99,
    originalPrice: 119.99,
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg',
    category: 'Clothing',
    categoryId: '2',
    rating: 4.7,
    reviews: 892,
    sizes: ['6', '7', '8', '9', '10', '11'],
    colors: ['Black/White', 'Blue/Orange', 'Gray/Pink'],
    stock: 67,
    badge: 'BEST_SELLER',
    sku: 'CLTH-002',
    features: ['Responsive Cushioning', 'Breathable Mesh', 'Anti-slip Sole'],
  },
  {
    id: '6',
    name: 'Denim Jacket Classic',
    description: 'Timeless denim jacket with a modern fit.',
    price: 59.99,
    image: 'https://images.pexels.com/photos/934416/pexels-photo-934416.jpeg',
    category: 'Clothing',
    categoryId: '2',
    rating: 4.3,
    reviews: 234,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Light Blue', 'Dark Blue', 'Black'],
    stock: 45,
    badge: 'NEW',
    sku: 'CLTH-003',
    features: ['100% Cotton Denim', 'Button Closure', 'Chest Pockets'],
  },
  {
    id: '7',
    name: 'Minimalist Desk Lamp',
    description: 'Modern LED desk lamp with adjustable brightness and color temperature.',
    price: 34.99,
    originalPrice: 49.99,
    image: 'https://images.pexels.com/photos/1513509/pexels-photo-1513509.jpeg',
    category: 'Home & Living',
    categoryId: '3',
    rating: 4.6,
    reviews: 456,
    colors: ['White', 'Black', 'Wood'],
    stock: 89,
    badge: 'SALE',
    sku: 'HOME-001',
    features: ['5 Brightness Levels', '3 Color Temps', 'USB Charging Port'],
  },
  {
    id: '8',
    name: 'Ceramic Plant Pot Set',
    description: 'Set of 3 handmade ceramic plant pots with drainage holes.',
    price: 29.99,
    image: 'https://images.pexels.com/photos/2471234/pexels-photo-2471234.jpeg',
    category: 'Home & Living',
    categoryId: '3',
    rating: 4.8,
    reviews: 189,
    colors: ['Terracotta', 'White', 'Sage Green'],
    stock: 56,
    badge: 'NONE',
    sku: 'HOME-002',
    features: ['Handmade', 'Drainage Holes', 'Trays Included'],
  },
  {
    id: '9',
    name: 'Cotton Throw Blanket',
    description: 'Soft and cozy cotton throw blanket with a geometric pattern.',
    price: 44.99,
    image: 'https://images.pexels.com/photos/2079246/pexels-photo-2079246.jpeg',
    category: 'Home & Living',
    categoryId: '3',
    rating: 4.7,
    reviews: 312,
    colors: ['Navy/White', 'Gray/Ivory', 'Rust/Cream'],
    stock: 34,
    badge: 'NEW',
    sku: 'HOME-003',
    features: ['100% Cotton', 'Machine Washable', 'Lightweight'],
  },
  {
    id: '10',
    name: 'Yoga Mat Premium',
    description: 'Extra thick non-slip yoga mat with alignment guides.',
    price: 39.99,
    originalPrice: 54.99,
    image: 'https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg',
    category: 'Sports & Outdoors',
    categoryId: '4',
    rating: 4.9,
    reviews: 678,
    colors: ['Purple', 'Teal', 'Coral', 'Black'],
    stock: 123,
    badge: 'BEST_SELLER',
    sku: 'SPRT-001',
    features: ['Non-slip Surface', '6mm Thickness', 'Alignment Guides'],
  },
  {
    id: '11',
    name: 'Fitness Tracker Band',
    description: 'Slim fitness tracker with step counting and heart rate monitoring.',
    price: 59.99,
    originalPrice: 79.99,
    image: 'https://images.pexels.com/photos/3784398/pexels-photo-3784398.jpeg',
    category: 'Sports & Outdoors',
    categoryId: '4',
    rating: 4.4,
    reviews: 445,
    colors: ['Black', 'Navy', 'Rose Gold'],
    stock: 89,
    badge: 'SALE',
    sku: 'SPRT-002',
    features: ['Step Tracking', 'Heart Rate', 'Sleep Analysis'],
  },
  {
    id: '12',
    name: 'Resistance Bands Set',
    description: 'Complete set of 5 resistance bands with different strength levels.',
    price: 19.99,
    image: 'https://images.pexels.com/photos/841321/pexels-photo-841321.jpeg',
    category: 'Sports & Outdoors',
    categoryId: '4',
    rating: 4.6,
    reviews: 234,
    colors: ['Multicolor'],
    stock: 167,
    badge: 'NONE',
    sku: 'SPRT-003',
    features: ['5 Resistance Levels', 'Carry Bag Included', 'Exercise Guide'],
  },
  {
    id: '13',
    name: 'Skincare Gift Set',
    description: 'Complete skincare set with cleanser, toner, serum, and moisturizer.',
    price: 49.99,
    originalPrice: 69.99,
    image: 'https://images.pexels.com/photos/3762875/pexels-photo-3762875.jpeg',
    category: 'Beauty & Personal Care',
    categoryId: '5',
    rating: 4.7,
    reviews: 567,
    colors: ['Normal Skin', 'Dry Skin', 'Oily Skin'],
    stock: 78,
    badge: 'SALE',
    sku: 'BEAU-001',
    features: ['Cruelty Free', 'Vegan', 'Paraben Free'],
  },
  {
    id: '14',
    name: 'Hair Care Bundle',
    description: 'Professional hair care bundle with shampoo, conditioner, and hair mask.',
    price: 34.99,
    image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg',
    category: 'Beauty & Personal Care',
    categoryId: '5',
    rating: 4.5,
    reviews: 389,
    colors: ['For All Hair Types', 'Color Safe', 'Hydrating'],
    stock: 92,
    badge: 'NEW',
    sku: 'BEAU-002',
    features: ['Sulfate Free', 'Keratin Enriched', 'UV Protection'],
  },
  {
    id: '15',
    name: 'Bestseller Novel Collection',
    description: 'Collection of 5 bestselling fiction novels.',
    price: 29.99,
    originalPrice: 49.99,
    image: 'https://images.pexels.com/photos/159711/books-pile-library-education-159711.jpeg',
    category: 'Books & Media',
    categoryId: '6',
    rating: 4.8,
    reviews: 234,
    stock: 45,
    badge: 'SALE',
    sku: 'BOOK-001',
    features: ['5 Hardcovers', 'Bestsellers', 'Gift Ready'],
  },
];

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((product) => product.id === id);
}

export function getProductsByCategory(categoryId: string): Product[] {
  return PRODUCTS.filter((product) => product.categoryId === categoryId);
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return PRODUCTS.filter(
    (product) =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery),
  );
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.badge === 'BEST_SELLER' || p.badge === 'NEW').slice(0, 6);
}

export function getTrendingProducts(): Product[] {
  return [...PRODUCTS].sort((a, b) => b.reviews - a.reviews).slice(0, 6);
}

export function getSaleProducts(): Product[] {
  return PRODUCTS.filter((p) => p.badge === 'SALE').slice(0, 6);
}

export function getNewProducts(): Product[] {
  return PRODUCTS.filter((p) => p.badge === 'NEW').slice(0, 6);
}

export function getLowStockProducts(): Product[] {
  return PRODUCTS.filter((p) => p.stock < 20).slice(0, 10);
}
