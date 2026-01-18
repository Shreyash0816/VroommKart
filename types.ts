
export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: 'Toys' | 'Supercars' | 'Baby Care' | 'Books' | 'Art & Craft' | 'Anime Figurines';
  images: string[];
  scale?: string;
  rarity?: 'Common' | 'Rare' | 'Limited' | 'Premium';
  description: string;
  rating: number;
  reviews: number;
  stock: number;
}

export interface HeroBanner {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  accentColor: string;
  linkTo: Page;
}

export interface SiteCategory {
  id: string;
  name: string;
  icon: string;
  bg: string;
  text: string;
  shadow: string;
}

export interface SiteConfig {
  primaryColor: string;
  accentColor: string;
  logoText: string;
  logoAccentText: string;
  heroBanners: HeroBanner[];
  spotlightTitle: string;
  spotlightDesc: string;
  spotlightImage: string;
  spotlightRarity: string;
  tickerMessages: string[];
  categories: SiteCategory[];
}

export type WishlistItem = Product;

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'Pending' | 'Shipped' | 'Delivered';
  paymentMethod: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  totalOrders: number;
  totalSpent: number;
}

export enum Page {
  Home = 'home',
  Supercars = 'supercars',
  Toys = 'toys',
  Anime = 'anime',
  ProductDetail = 'detail',
  Cart = 'cart',
  Checkout = 'checkout',
  About = 'about',
  Contact = 'contact',
  Admin = 'admin',
  CollectorsGuide = 'collectors-guide',
  PreOrderPolicy = 'preorder-policy',
  ReturnsRefund = 'returns-refund',
  PrivacyPolicy = 'privacy-policy'
}
