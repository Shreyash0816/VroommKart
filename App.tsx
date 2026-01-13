
import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Page } from './types';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SupercarShop from './pages/SupercarShop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';
import ProductCard from './components/ProductCard';
import GlobalSearch from './components/GlobalSearch';
import { Instagram, Facebook, Twitter, Youtube, Mail, Phone, MapPin, Home as HomeIcon, Search, ShoppingBag, LayoutGrid, Heart } from 'lucide-react';

const MobileNav: React.FC = () => {
  const { navigateTo, currentPage, cart } = useApp();
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleCategoryClick = () => {
    navigateTo(Page.Home);
    // Use a small delay to allow navigation to complete before scrolling
    setTimeout(() => {
      const catSection = document.getElementById('departments-section');
      if (catSection) {
        catSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <>
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100 z-[60] px-4 py-2 pb-5 flex justify-around items-center shadow-[0_-10px_30px_rgba(0,0,0,0.08)]">
        <button 
          onClick={() => navigateTo(Page.Home)}
          className={`flex flex-col items-center gap-1 transition-colors ${currentPage === Page.Home ? 'text-blue-600' : 'text-gray-400'}`}
        >
          <HomeIcon className="w-5 h-5" />
          <span className="text-[9px] font-bold uppercase tracking-wider">Home</span>
        </button>
        
        <button 
          onClick={handleCategoryClick}
          className="flex flex-col items-center gap-1 text-gray-400"
        >
          <LayoutGrid className="w-5 h-5" />
          <span className="text-[9px] font-bold uppercase tracking-wider">Shop</span>
        </button>

        <button 
          onClick={() => setIsSearchOpen(true)}
          className="flex flex-col items-center gap-1 text-gray-400"
        >
          <Search className="w-5 h-5" />
          <span className="text-[9px] font-bold uppercase tracking-wider">Search</span>
        </button>

        <button 
          onClick={() => navigateTo(Page.Cart)}
          className={`flex flex-col items-center gap-1 relative ${currentPage === Page.Cart ? 'text-blue-600' : 'text-gray-400'}`}
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[8px] font-black w-3.5 h-3.5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[9px] font-bold uppercase tracking-wider">Cart</span>
        </button>
      </div>
      <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

const Footer: React.FC = () => {
  const { navigateTo } = useApp();
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-28 md:pb-10 border-t border-gray-800 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="space-y-6">
          <div className="flex items-center">
            <span className="text-2xl font-montserrat font-extrabold tracking-tighter">
              VROOMM<span className="text-blue-400">KART</span>
            </span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
            India's premier destination for high-end diecast collectibles and premium children's products.
          </p>
          <div className="flex space-x-5">
            <span className="hover:text-pink-500 cursor-pointer transition-colors"><Instagram className="w-5 h-5" /></span>
            <span className="hover:text-blue-500 cursor-pointer transition-colors"><Facebook className="w-5 h-5" /></span>
            <span className="hover:text-blue-400 cursor-pointer transition-colors"><Twitter className="w-5 h-5" /></span>
            <span className="hover:text-red-500 cursor-pointer transition-colors"><Youtube className="w-5 h-5" /></span>
          </div>
        </div>

        <div className="hidden md:block">
          <h4 className="font-bold text-lg mb-6 text-blue-400 uppercase tracking-widest text-xs">Quick Links</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li><button onClick={() => navigateTo(Page.Home)} className="hover:text-white transition-colors">Home</button></li>
            <li><button onClick={() => navigateTo(Page.Anime)} className="hover:text-white transition-colors">Anime World</button></li>
            <li><button onClick={() => navigateTo(Page.Supercars)} className="hover:text-white transition-colors">Supercar Garage</button></li>
            <li><button onClick={() => navigateTo(Page.Toys)} className="hover:text-white transition-colors">Toy Shop</button></li>
          </ul>
        </div>

        <div className="hidden md:block">
          <h4 className="font-bold text-lg mb-6 text-blue-400 uppercase tracking-widest text-xs">Support</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li><button className="hover:text-white transition-colors">Collector's Guide</button></li>
            <li><button className="hover:text-white transition-colors">Pre-order Policy</button></li>
            <li><button className="hover:text-white transition-colors">Returns & Refund</button></li>
            <li><button className="hover:text-white transition-colors">Privacy Policy</button></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-bold text-lg mb-6 text-blue-400 uppercase tracking-widest text-xs">Contact Us</h4>
          <ul className="space-y-4 text-gray-400 text-sm font-medium">
            <li className="flex items-center space-x-3">
              <Mail className="w-4 h-4 text-blue-400" />
              <span>support@vroommkart.com</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-blue-400" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-start space-x-3">
              <MapPin className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
              <span>Akurdi Sector 25, Pune 411044</span>
            </li>
            <li className="pt-4 flex md:hidden">
               <button 
                 onClick={() => navigateTo(Page.Admin)}
                 className="text-[10px] text-gray-700 font-bold uppercase tracking-widest hover:text-white transition-colors"
               >
                 Owner Login
               </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-gray-500 text-[10px] gap-4 text-center">
        <p>© 2025 Vroommkart India. All rights reserved.</p>
        <p className="font-black uppercase tracking-widest text-[8px] opacity-50">Handcrafted for collectors by collectors.</p>
      </div>
    </footer>
  );
};

const AppContent: React.FC = () => {
  const { currentPage, products } = useApp();

  const renderPage = () => {
    switch (currentPage) {
      case Page.Home: return <Home />;
      case Page.Supercars: return <SupercarShop />;
      case Page.ProductDetail: return <ProductDetail />;
      case Page.Cart: return <Cart />;
      case Page.Checkout: return <Checkout />;
      case Page.Admin: return <Admin />;
      case Page.Anime: 
        return (
          <div className="py-8 md:py-20 max-w-7xl mx-auto px-4 md:px-6">
            <h1 className="text-2xl md:text-5xl font-black mb-2 uppercase tracking-tighter">ANIME WORLD</h1>
            <p className="text-gray-500 mb-8 font-medium text-sm">Authentic Japanese figurines and limited collectibles.</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
              {products.filter(p => p.category === 'Anime Figurines').map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        );
      case Page.Toys: return (
        <div className="py-8 md:py-20 max-w-7xl mx-auto px-4 md:px-6 text-center">
          <h1 className="text-3xl md:text-6xl font-black mb-2 uppercase tracking-tighter">TOY SHOP</h1>
          <p className="text-gray-500 mb-8 text-sm font-medium">Discovery and joy for all ages.</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
            {products.filter(p => p.category === 'Toys').map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      );
      default: return <Home />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen max-w-full overflow-x-hidden">
      {currentPage !== Page.Admin && <Navbar />}
      <main className="flex-1 pb-16 md:pb-0 overflow-x-hidden">
        {renderPage()}
      </main>
      {currentPage !== Page.Admin && <Footer />}
      {currentPage !== Page.Admin && <MobileNav />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
