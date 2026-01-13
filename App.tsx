
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
import { Instagram, Facebook, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const { navigateTo } = useApp();
  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="space-y-6">
          <div className="flex items-center">
            <span className="text-2xl font-montserrat font-extrabold tracking-tighter">
              VROOMM<span className="text-blue-400">KART</span>
            </span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            India's premier destination for high-end diecast collectibles and premium children's products.
          </p>
          <div className="flex space-x-4">
            <span className="hover:text-pink-500 cursor-pointer transition-colors"><Instagram className="w-5 h-5" /></span>
            <span className="hover:text-blue-500 cursor-pointer transition-colors"><Facebook className="w-5 h-5" /></span>
            <span className="hover:text-blue-400 cursor-pointer transition-colors"><Twitter className="w-5 h-5" /></span>
            <span className="hover:text-red-500 cursor-pointer transition-colors"><Youtube className="w-5 h-5" /></span>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-6 text-blue-400 uppercase tracking-widest text-xs">Quick Links</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li><button onClick={() => navigateTo(Page.Home)} className="hover:text-white transition-colors">Home</button></li>
            <li><button onClick={() => navigateTo(Page.Anime)} className="hover:text-white transition-colors">Anime World</button></li>
            <li><button onClick={() => navigateTo(Page.Supercars)} className="hover:text-white transition-colors">Supercar Garage</button></li>
            <li><button onClick={() => navigateTo(Page.Toys)} className="hover:text-white transition-colors">Toy Shop</button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-6 text-blue-400 uppercase tracking-widest text-xs">Support</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li><button className="hover:text-white transition-colors">Collector's Guide</button></li>
            <li><button className="hover:text-white transition-colors">Pre-order Policy</button></li>
            <li><button className="hover:text-white transition-colors">Returns & Refund</button></li>
            <li><button className="hover:text-white transition-colors">Privacy Policy</button></li>
          </ul>
        </div>

        <div>
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
              <div className="flex flex-col gap-2">
                <span>Akurdi Sector 25 Pune 411044</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-20 pt-10 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs gap-4">
        <p>© 2024 Vroommkart India. All rights reserved.</p>
        <p className="font-black uppercase tracking-widest text-[8px]">Handcrafted for collectors by collectors.</p>
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
          <div className="py-20 max-w-7xl mx-auto px-4">
            <h1 className="text-5xl font-black mb-4 uppercase tracking-tighter">ANIME WORLD</h1>
            <p className="text-gray-500 mb-12 font-medium">Authentic Japanese figurines and limited edition collectibles.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.filter(p => p.category === 'Anime Figurines').map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        );
      case Page.Toys: return (
        <div className="py-20 max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-6xl font-black mb-4 uppercase tracking-tighter">TOY SHOP</h1>
          <p className="text-gray-500 mb-12 text-xl font-medium">Discovery and joy for all ages.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
    <div className="flex flex-col min-h-screen">
      {currentPage !== Page.Admin && <Navbar />}
      <main className="flex-1">
        {renderPage()}
      </main>
      {currentPage !== Page.Admin && <Footer />}
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
