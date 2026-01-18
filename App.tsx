
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
import InfoPages from './pages/InfoPages';
import ProductCard from './components/ProductCard';
import GlobalSearch from './components/GlobalSearch';
import { Instagram, Facebook, Twitter, Youtube, Mail, Phone, MapPin, Home as HomeIcon, Search, ShoppingBag, LayoutGrid, User, Zap, Sparkles } from 'lucide-react';

const MobileNav: React.FC = () => {
  const { navigateTo, currentPage, cart } = useApp();
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleCategoryClick = () => {
    if (currentPage !== Page.Home) {
      navigateTo(Page.Home);
      setTimeout(() => {
        const catSection = document.getElementById('departments-section');
        catSection?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      const catSection = document.getElementById('departments-section');
      catSection?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[60] px-4 pb-6 pt-2 pointer-events-none">
        <div className="max-w-md mx-auto bg-white/95 backdrop-blur-2xl border border-gray-100 rounded-[2.5rem] shadow-[0_-8px_30px_rgba(0,0,0,0.1)] flex justify-around items-center px-2 py-3 pointer-events-auto">
          <button 
            onClick={() => navigateTo(Page.Home)}
            className={`flex flex-col items-center gap-1.5 transition-all flex-1 py-1.5 ${currentPage === Page.Home ? 'text-blue-600' : 'text-gray-400 active:opacity-60'}`}
          >
            <div className={`p-1 rounded-xl transition-all ${currentPage === Page.Home ? 'bg-blue-50' : 'bg-transparent'}`}>
              <HomeIcon className={`w-6 h-6 ${currentPage === Page.Home ? 'fill-blue-600/10' : ''}`} />
            </div>
            <span className={`text-[9px] font-black uppercase tracking-[0.1em] ${currentPage === Page.Home ? 'opacity-100' : 'opacity-70'}`}>Home</span>
          </button>
          
          <button 
            onClick={handleCategoryClick}
            className="flex flex-col items-center gap-1.5 text-gray-400 active:opacity-60 transition-all flex-1 py-1.5"
          >
            <div className="p-1">
              <LayoutGrid className="w-6 h-6" />
            </div>
            <span className="text-[9px] font-black uppercase tracking-[0.1em] opacity-70">Shop</span>
          </button>

          <button 
            onClick={() => setIsSearchOpen(true)}
            className="flex flex-col items-center gap-1.5 text-gray-400 active:opacity-60 transition-all flex-1 py-1.5"
          >
            <div className="p-1">
              <Search className="w-6 h-6" />
            </div>
            <span className="text-[9px] font-black uppercase tracking-[0.1em] opacity-70">Search</span>
          </button>

          <button 
            onClick={() => navigateTo(Page.Cart)}
            className={`flex flex-col items-center gap-1.5 relative transition-all flex-1 py-1.5 ${currentPage === Page.Cart ? 'text-blue-600' : 'text-gray-400 active:opacity-60'}`}
          >
            <div className={`p-1 rounded-xl relative transition-all ${currentPage === Page.Cart ? 'bg-blue-50' : 'bg-transparent'}`}>
              <ShoppingBag className={`w-6 h-6 ${currentPage === Page.Cart ? 'fill-blue-600/10' : ''}`} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] font-black w-4 h-4 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                  {cartCount}
                </span>
              )}
            </div>
            <span className={`text-[9px] font-black uppercase tracking-[0.1em] ${currentPage === Page.Cart ? 'opacity-100' : 'opacity-70'}`}>Cart</span>
          </button>
        </div>
      </div>
      <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

const Footer: React.FC = () => {
  const { navigateTo } = useApp();
  const [clickCount, setClickCount] = React.useState(0);

  // Secret Admin Access via triple click
  const handleSecretClick = () => {
    const nextCount = clickCount + 1;
    setClickCount(nextCount);
    if (nextCount === 3) {
      navigateTo(Page.Admin);
      setClickCount(0);
    }
    setTimeout(() => setClickCount(0), 1000);
  };

  return (
    <footer className="bg-gray-950 text-white pt-16 pb-32 md:pb-12 border-t border-gray-900 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center sm:text-left">
        <div className="space-y-6">
          <div className="flex items-center justify-center sm:justify-start space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-montserrat font-extrabold tracking-tighter uppercase">
              VROOMM<span className="text-pink-500">KART</span>
            </span>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto sm:mx-0">
            India's premier destination for high-end collectibles. From limited edition supercars to authentic anime figurines.
          </p>
          <div className="flex justify-center sm:justify-start space-x-5">
            <span className="hover:text-pink-500 cursor-pointer transition-colors p-2"><Instagram className="w-5 h-5" /></span>
            <span className="hover:text-blue-500 cursor-pointer transition-colors p-2"><Facebook className="w-5 h-5" /></span>
            <span className="hover:text-blue-400 cursor-pointer transition-colors p-2"><Twitter className="w-5 h-5" /></span>
            <span className="hover:text-red-500 cursor-pointer transition-colors p-2"><Youtube className="w-5 h-5" /></span>
          </div>
        </div>

        <div className="hidden sm:block">
          <h4 className="font-black text-blue-400 uppercase tracking-widest text-[10px] mb-6">Explore</h4>
          <ul className="space-y-4 text-gray-500 text-xs font-bold uppercase tracking-widest">
            <li><button onClick={() => navigateTo(Page.Home)} className="hover:text-white transition-colors">Home</button></li>
            <li><button onClick={() => navigateTo(Page.Anime)} className="hover:text-pink-500 transition-colors">Anime World</button></li>
            <li><button onClick={() => navigateTo(Page.Supercars)} className="hover:text-blue-400 transition-colors">Supercars</button></li>
            <li><button onClick={() => navigateTo(Page.Toys)} className="hover:text-yellow-500 transition-colors">Toy Shop</button></li>
          </ul>
        </div>

        <div className="hidden sm:block">
          <h4 className="font-black text-blue-400 uppercase tracking-widest text-[10px] mb-6">Service</h4>
          <ul className="space-y-4 text-gray-500 text-xs font-bold uppercase tracking-widest">
            <li><button onClick={() => navigateTo(Page.CollectorsGuide)} className="hover:text-white transition-colors">Guide</button></li>
            <li><button onClick={() => navigateTo(Page.PreOrderPolicy)} className="hover:text-white transition-colors">Pre-orders</button></li>
            <li><button onClick={() => navigateTo(Page.ReturnsRefund)} className="hover:text-white transition-colors">Returns</button></li>
            <li><button onClick={() => navigateTo(Page.PrivacyPolicy)} className="hover:text-white transition-colors">Privacy</button></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="font-black text-blue-400 uppercase tracking-widest text-[10px] mb-6">Support</h4>
          <ul className="space-y-4 text-gray-500 text-xs font-bold uppercase tracking-widest">
            <li className="flex items-center justify-center sm:justify-start space-x-3">
              <Mail className="w-4 h-4 text-blue-400" />
              <span>support@vroommkart.com</span>
            </li>
            <li className="flex items-center justify-center sm:justify-start space-x-3">
              <Phone className="w-4 h-4 text-blue-400" />
              <span>+91 82629 37848</span>
            </li>
            <li className="flex items-start justify-center sm:justify-start space-x-3">
              <MapPin className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <span className="text-center sm:text-left">Akurdi Sector 25, Pune 411044</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center text-gray-600 text-[9px] gap-4 text-center">
        <p onClick={handleSecretClick} className="font-bold uppercase tracking-widest cursor-default select-none">© 2025 Vroommkart India.</p>
        <p className="font-black uppercase tracking-widest opacity-40">Collector Grade Experience.</p>
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
      case Page.CollectorsGuide:
      case Page.PreOrderPolicy:
      case Page.ReturnsRefund:
      case Page.PrivacyPolicy:
        return <InfoPages type={currentPage} />;
      case Page.Anime: 
        return (
          <div className="py-8 md:py-20 max-w-7xl mx-auto px-4 md:px-6 animate-in fade-in duration-700">
            <div className="mb-8 md:mb-12">
              <div className="flex items-center space-x-2 md:space-x-3 text-pink-500 mb-2 md:mb-4">
                <Sparkles className="w-4 h-4 md:w-6 h-6 animate-pulse" />
                <span className="uppercase tracking-[0.2em] md:tracking-[0.3em] font-black text-[8px] md:text-[10px]">Premium Anime Gear</span>
              </div>
              <h1 className="text-4xl md:text-8xl font-black uppercase tracking-tighter leading-none">ANIME<br/><span className="text-pink-500">REALM</span></h1>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-10">
              {products.filter(p => p.category === 'Anime Figurines').map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        );
      case Page.Toys: return (
        <div className="py-8 md:py-20 max-w-7xl mx-auto px-4 md:px-6">
          <div className="mb-8 md:mb-12 text-center md:text-left">
            <h1 className="text-4xl md:text-8xl font-black mb-2 md:mb-4 uppercase tracking-tighter">TOY SHOP</h1>
            <p className="text-gray-500 text-[10px] md:text-xs font-black uppercase tracking-widest">Bringing back the magic of play.</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-10">
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
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden relative">
      {currentPage !== Page.Admin && <Navbar />}
      <main className="flex-1 w-full overflow-x-hidden pt-20 md:pt-0">
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
