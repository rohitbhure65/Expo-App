export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  productCount: number;
  subcategories?: string[];
}

export const CATEGORIES: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    slug: 'electronics',
    image: 'https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg',
    productCount: 45,
    subcategories: ['Phones', 'Laptops', 'Audio', 'Cameras', 'Accessories'],
  },
  {
    id: '2',
    name: 'Clothing',
    slug: 'clothing',
    image: 'https://images.pexels.com/photos/10026491/pexels-photo-10026491.jpeg',
    productCount: 128,
    subcategories: ['Men', 'Women', 'Kids', 'Accessories', 'Shoes'],
  },
  {
    id: '3',
    name: 'Home & Living',
    slug: 'home-living',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
    productCount: 67,
    subcategories: ['Furniture', 'Decor', 'Bedding', 'Kitchen', 'Storage'],
  },
  {
    id: '4',
    name: 'Sports & Outdoors',
    slug: 'sports-outdoors',
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg',
    productCount: 89,
    subcategories: ['Fitness', 'Outdoor', 'Team Sports', 'Camping', 'Cycling'],
  },
  {
    id: '5',
    name: 'Beauty & Personal Care',
    slug: 'beauty-personal-care',
    image: 'https://images.pexels.com/photos/3762875/pexels-photo-3762875.jpeg',
    productCount: 156,
    subcategories: ['Skincare', 'Makeup', 'Haircare', 'Fragrance', 'Personal Care'],
  },
  {
    id: '6',
    name: 'Books & Media',
    slug: 'books-media',
    image: 'https://images.pexels.com/photos/159711/books-pile-library-education-159711.jpeg',
    productCount: 234,
    subcategories: ['Fiction', 'Non-Fiction', 'Textbooks', 'Comics', 'Magazines'],
  },
  {
    id: '7',
    name: 'Toys & Games',
    slug: 'toys-games',
    image: 'https://images.pexels.com/photos/2681786/pexels-photo-2681786.jpeg',
    productCount: 78,
    subcategories: ['Board Games', 'Puzzles', 'Action Figures', 'Dolls', 'Educational'],
  },
  {
    id: '8',
    name: 'Food & Beverages',
    slug: 'food-beverages',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    productCount: 92,
    subcategories: ['Snacks', 'Beverages', 'Pantry', 'Frozen', 'Organic'],
  },
];

export const getCategoryById = (id: string): Category | undefined =>
  CATEGORIES.find((cat) => cat.id === id);

export const getCategoryBySlug = (slug: string): Category | undefined =>
  CATEGORIES.find((cat) => cat.slug === slug);
