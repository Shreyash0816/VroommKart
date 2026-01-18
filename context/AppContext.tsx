
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Page, CartItem, Product, WishlistItem, Order, Customer, SiteConfig, HeroBanner } from '../types';
import { MOCK_PRODUCTS } from '../constants';

interface AppContextType {
  currentPage: Page;
  selectedProduct: Product | null;
  products: Product[];
  siteConfig: SiteConfig;
  cart: CartItem[];
  wishlist: WishlistItem[];
  orders: Order[];
  customers: Customer[];
  navigateTo: (page: Page, product?: Product) => void;
  addToCart: (product: Product) => boolean;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, delta: number) => boolean;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  clearCart: () => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  updateSiteConfig: (config: SiteConfig) => void;
  placeOrder: (orderData: Omit<Order, 'id' | 'date' | 'status'>) => void;
  exportData: () => string;
  importData: (encodedData: string) => boolean;
  generateSyncLink: () => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const PRODUCT_STORAGE_KEY = 'vroommkart_products_v4';
const ORDER_STORAGE_KEY = 'vroommkart_orders_v4';
const CUSTOMER_STORAGE_KEY = 'vroommkart_customers_v4';
const CONFIG_STORAGE_KEY = 'vroommkart_site_config_v4';

const DEFAULT_CONFIG: SiteConfig = {
  primaryColor: '#2563eb',
  accentColor: '#f472b6',
  logoText: 'VROOMM',
  logoAccentText: 'KART',
  heroBanners: [
    {
      id: 'banner-1',
      image: 'https://images.unsplash.com/photo-1612444530582-fc66183b16f7?auto=format&fit=crop&q=80&w=1400',
      title: 'OTAKU HAVEN',
      subtitle: 'Premium Anime Figurines',
      accentColor: '#f472b6',
      linkTo: Page.Anime
    },
    {
      id: 'banner-2',
      image: 'https://www.wsupercars.com/wp-content/uploads/2022-Land-Rover-Defender-V8-009.jpg',
      title: 'ELITE GARAGE',
      subtitle: 'Exclusive Diecast Supercars',
      accentColor: '#2563eb',
      linkTo: Page.Supercars
    }
  ],
  spotlightTitle: 'LEGENDS NEVER DIE',
  spotlightDesc: 'Classic silhouettes meet modern engineering. Secure your 1:64 piece of history before these limited runs vanish forever.',
  spotlightImage: 'https://images.unsplash.com/photo-1594731804116-64601132649f?auto=format&fit=crop&q=80&w=1200',
  spotlightRarity: '9.9 / 10',
  tickerMessages: [
    'FRESH DROP: MINI GT LIBERTY WALK SILVIA S15',
    'S.H.FIGUARTS RESTOCK IN 2 HOURS',
    'FREE SHIPPING ON ALL ORDERS OVER ₹1,999'
  ],
  categories: [
    { id: 'supercars', name: 'Supercars', icon: '🏎️', bg: 'bg-blue-600', text: 'text-white', shadow: 'shadow-blue-500/30' },
    { id: 'toys', name: 'Toys', icon: '🧸', bg: 'bg-yellow-400', text: 'text-gray-900', shadow: 'shadow-yellow-500/30' },
    { id: 'anime', name: 'Anime Figurines', icon: '🎎', bg: 'bg-pink-500', text: 'text-white', shadow: 'shadow-pink-500/30' },
    { id: 'baby', name: 'Baby Care', icon: '🍼', bg: 'bg-teal-400', text: 'text-white', shadow: 'shadow-teal-500/30' },
    { id: 'books', name: 'Books', icon: '📚', bg: 'bg-indigo-500', text: 'text-white', shadow: 'shadow-indigo-500/30' },
    { id: 'art', name: 'Art & Craft', icon: '🎨', bg: 'bg-orange-500', text: 'text-white', shadow: 'shadow-orange-500/30' }
  ]
};

const getStoredData = <T,>(key: string, fallback: T): T => {
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return fallback;
    return JSON.parse(saved) as T;
  } catch (error) {
    return fallback;
  }
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>(() => getStoredData(PRODUCT_STORAGE_KEY, MOCK_PRODUCTS));
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => getStoredData(CONFIG_STORAGE_KEY, DEFAULT_CONFIG));
  const [orders, setOrders] = useState<Order[]>(() => getStoredData(ORDER_STORAGE_KEY, []));
  const [customers, setCustomers] = useState<Customer[]>(() => getStoredData(CUSTOMER_STORAGE_KEY, []));
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--primary-blue', siteConfig.primaryColor);
    root.style.setProperty('--anime-pink', siteConfig.accentColor);
  }, [siteConfig]);

  useEffect(() => { localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(siteConfig)); }, [siteConfig]);
  useEffect(() => { localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(customers)); }, [customers]);

  useEffect(() => {
    const handleHashChange = () => {
      const fullHash = window.location.hash;
      
      // Look for sync link in the hash
      const syncIndex = fullHash.indexOf('/sync/');
      if (syncIndex !== -1) {
        const encodedData = fullHash.substring(syncIndex + 6);
        if (importData(encodedData)) {
          alert('Global Cloud Sync Successful! 🏎️☁️');
          window.location.hash = '#/home';
          return;
        }
      }

      const hash = fullHash.replace('#/', '');
      if (Object.values(Page).includes(hash as Page)) {
        setCurrentPage(hash as Page);
      } else {
        setCurrentPage(Page.Home);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: Page, product?: Product) => {
    if (product) setSelectedProduct(product);
    window.location.hash = `#/${page}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product: Product): boolean => {
    const existing = cart.find(item => item.id === product.id);
    const currentQty = existing ? existing.quantity : 0;
    if (currentQty >= product.stock) {
      alert(`Only ${product.stock} units left in stock!`);
      return false;
    }
    setCart(prev => {
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    return true;
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId: string, delta: number): boolean => {
    const product = products.find(p => p.id === productId);
    if (!product) return false;
    const cartItem = cart.find(item => item.id === productId);
    if (!cartItem) return false;
    if (delta > 0 && cartItem.quantity >= product.stock) {
      alert(`Max inventory reached! (${product.stock} units)`);
      return false;
    }
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
    return true;
  };

  const clearCart = () => setCart([]);
  const addToWishlist = (product: Product) => {
    if (!wishlist.some(p => p.id === product.id)) {
      setWishlist(prev => [...prev, product]);
    }
  };
  const removeFromWishlist = (productId: string) => {
    setWishlist(prev => prev.filter(item => item.id !== productId));
  };
  const isWishlisted = (id: string) => wishlist.some(i => i.id === id);
  const addProduct = (product: Product) => setProducts(prev => [...prev, product]);
  const updateProduct = (product: Product) => setProducts(prev => prev.map(p => p.id === product.id ? product : p));
  const deleteProduct = (id: string) => setProducts(prev => prev.filter(p => p.id !== id));
  const updateSiteConfig = (config: SiteConfig) => setSiteConfig(config);

  const placeOrder = (orderData: Omit<Order, 'id' | 'date' | 'status'>) => {
    const newOrder: Order = {
      ...orderData,
      id: `VROOM-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      date: new Date().toISOString(),
      status: 'Pending'
    };
    setOrders(prev => [newOrder, ...prev]);
    setCustomers(prev => {
      const existing = prev.find(c => c.email === orderData.email);
      if (existing) {
        return prev.map(c => c.email === orderData.email ? { 
          ...c, 
          totalOrders: c.totalOrders + 1,
          totalSpent: c.totalSpent + orderData.total,
          phone: orderData.phone,
          address: orderData.address
        } : c);
      }
      return [...prev, {
        id: `CUST-${Date.now()}`,
        name: orderData.customerName,
        email: orderData.email,
        phone: orderData.phone,
        address: orderData.address,
        totalOrders: 1,
        totalSpent: orderData.total
      }];
    });
    setProducts(prev => prev.map(p => {
      const cartItem = orderData.items.find(item => item.id === p.id);
      if (cartItem) {
        return { ...p, stock: Math.max(0, p.stock - cartItem.quantity) };
      }
      return p;
    }));
  };

  /**
   * Professional Unicode-safe Base64 Encoding
   */
  const exportData = () => {
    const data = { products, orders, customers, siteConfig };
    const json = JSON.stringify(data);
    const bytes = new TextEncoder().encode(json);
    const binString = String.fromCharCode(...bytes);
    return btoa(binString);
  };

  /**
   * Professional Unicode-safe Base64 Decoding
   */
  const importData = (encodedData: string) => {
    try {
      const binString = atob(encodedData);
      const bytes = Uint8Array.from(binString, (m) => m.charCodeAt(0));
      const json = new TextDecoder().decode(bytes);
      const parsed = JSON.parse(json);
      
      if (parsed.products) setProducts(parsed.products);
      if (parsed.orders) setOrders(parsed.orders);
      if (parsed.customers) setCustomers(parsed.customers);
      if (parsed.siteConfig) setSiteConfig(parsed.siteConfig);
      
      return true;
    } catch (e) {
      console.error('Cloud Sync failed to decode data:', e);
      return false;
    }
  };

  const generateSyncLink = () => {
    const data = exportData();
    // Use window.location.origin and pathname to ensure link is absolute
    const baseUrl = window.location.href.split('#')[0];
    return `${baseUrl}#/sync/${data}`;
  };

  return (
    <AppContext.Provider value={{
      currentPage, selectedProduct, products, siteConfig, cart, wishlist, orders, customers,
      navigateTo, addToCart, removeFromCart, updateCartQuantity, addToWishlist, removeFromWishlist, isWishlisted,
      clearCart, addProduct, updateProduct, deleteProduct, updateSiteConfig, placeOrder, exportData, importData, generateSyncLink
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
