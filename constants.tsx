
import { Product } from './types';

export const SUPERCAR_BRANDS = [
  'Hot Wheels',
  'Matchbox',
  'Mini GT',
  'Majorette',
  'Maisto',
  'Bburago',
  'Solido',
  'Inno64',
  'Pop Race',
  'RMZ City'
];

export const ANIME_BRANDS = [
  'Bandai Spirits',
  'S.H.Figuarts',
  'Good Smile Company',
  'Nendoroid',
  'Pop Up Parade',
  'Banpresto',
  'MegaHouse',
  'Kotobukiya',
  'Aniplex'
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'mgt-1109',
    name: 'Lotus Esprit Turbo - Metallic Silver',
    brand: 'Mini GT',
    price: 1149,
    category: 'Supercars',
    images: ['https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?auto=format&fit=crop&q=80&w=1200'],
    scale: '1:64',
    rarity: 'Common',
    description: 'Mini GT #1109. RHD version. A classic 80s icon in stunning Metallic Silver.',
    rating: 4.8,
    reviews: 42,
    stock: 12
  },
  {
    id: 'mgt-1122',
    name: 'Ford Mustang Mach 1 1971 - Race Red',
    brand: 'Mini GT',
    price: 1149,
    category: 'Supercars',
    images: ['https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&q=80&w=1200'],
    scale: '1:64',
    rarity: 'Common',
    description: 'Mini GT #1122. LHD version. High-performance Ford Mustang Mach 1 from 1971.',
    rating: 4.9,
    reviews: 38,
    stock: 7
  },
  {
    id: 'kh-nsx-01',
    name: 'Honda NSX Kaido House V2 - Red/Black',
    brand: 'Hot Wheels',
    price: 2499,
    category: 'Supercars',
    images: ['https://images.unsplash.com/photo-1594731804116-64601132649f?auto=format&fit=crop&q=80&w=1200'],
    scale: '1:64',
    rarity: 'Premium',
    description: 'Hot Wheels Premium series. Features incredible detail and Real Riders tires.',
    rating: 5.0,
    reviews: 67,
    stock: 3
  },
  {
    id: 'tw-lbwk-01',
    name: 'Nissan Silvia S15 Liberty Walk - White/Yellow',
    brand: 'Inno64',
    price: 1849,
    category: 'Supercars',
    images: ['https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200'],
    scale: '1:64',
    rarity: 'Limited',
    description: 'Inno64 high-detail series. Includes acrylic display case.',
    rating: 4.9,
    reviews: 25,
    stock: 5
  },
  {
    id: 'shf-sukuna',
    name: 'S.H.Figuarts Ryomen Sukuna - Jujutsu Kaisen',
    brand: 'S.H.Figuarts',
    price: 4999,
    category: 'Anime Figurines',
    images: ['https://images.unsplash.com/photo-1612444530582-fc66183b16f7?auto=format&fit=crop&q=80&w=1200'],
    description: 'Authentic Bandai Spirits. Highly articulated action figure.',
    rating: 5.0,
    reviews: 42,
    stock: 6
  }
];

export const CATEGORIES = [
  { id: 'supercars', name: 'Supercar Collection', icon: '🏎️', tagline: 'Collector\'s Pride' },
  { id: 'toys', name: 'Toys', icon: '🧸', tagline: 'Unleash the Joy' },
  { id: 'anime', name: 'Anime Figurines', icon: '🎎', tagline: 'Otaku Haven' },
];
