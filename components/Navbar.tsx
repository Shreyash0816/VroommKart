
import React, { useState, useEffect } from 'react';
import { ShoppingCart, Heart, Search, Menu, X, Zap, Sparkles, User, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Page } from '../types';
import GlobalSearch from './GlobalSearch';

const Navbar: React.FC = () => {
  const { currentPage, navigateTo, cart, siteConfig } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const isDarkPage = currentPage === Page.Supercars;

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 px-3 md:px-8 ${
        isScrolled ? 'py-2 md:py-4' : 'py-4 md:py-8'
      }`}>
        <div className={`max-w-7xl mx-auto rounded-[2rem] md:rounded-[2.5rem] transition-all duration-700 overflow-hidden ${
          isScrolled 
            ? isDarkPage ? 'glass-dark shadow-2xl border-white/10' : 'glass-light shadow-xl border-blue-100'
            : 'bg-transparent'
        }`}>
          <div className="px-4 md:px-12 flex justify-between items-center h-14 md:h-20">
            {/* Logo */}
            <div 
              className="flex items-center cursor-pointer group"
              onClick={() => navigateTo(Page.Home)}
            >
              <div className="relative">
                 <div className={`p-2.5 md:p-3 rounded-xl md:rounded-2xl transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 shadow-lg bg-[var(--primary-blue)] text-white`}>
                    <Zap className="w-4 h-4 md:w-5 h-5 fill-current" />
                 </div>
                 <Sparkles className="absolute -top-1 -right-1 w-3 h-3 md:w-4 h-4 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
              </div>
              <span className={`ml-3 md:ml-4 text-lg md:text-3xl font-montserrat font-black tracking-tighter uppercase transition-colors ${
                isDarkPage || (isScrolled && isDarkPage) ? 'text-white' : 'text-gray-900'
              }`}>
                {siteConfig.logoText}<span className="text-[var(--primary-blue)]">{siteConfig.logoAccentText}</span>
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center bg-gray-100/10 p-1.5 rounded-full border border-white/5 space-x-2">
              {[
                { id: Page.Home, label: 'Home' },
                { id: Page.Anime, label: 'Anime' },
                { id: Page.Supercars, label: 'Garage' },
                { id: Page.Toys, label: 'Toys' }
              ].map((link) => (
                <button 
                  key={link.id}
                  onClick={() => navigateTo(link.id)} 
                  className={`px-8 py-3 rounded-full font-outfit font-black uppercase text-[11px] tracking-widest transition-all ${
                    currentPage === link.id 
                    ? 'bg-[var(--primary-blue)] text-white shadow-lg shadow-blue-600/30 scale-105' 
                    : `${isDarkPage ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'}`
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2 md:space-x-4">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className={`p-2.5 md:p-3 rounded-full transition-all hover:scale-110 active:opacity-60 ${
                  isDarkPage ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <Search className="w-5 h-5" />
              </button>
              
              <button 
                onClick={() => navigateTo(Page.Cart)}
                className={`relative p-2.5 md:p-3 rounded-full transition-all hover:scale-110 active:opacity-60 bg-blue-50 text-[var(--primary-blue)] border border-blue-100`}
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-red-600 text-white text-[8px] md:text-[9px] font-black w-4.5 h-4.5 md:w-5 md:h-5 flex items-center justify-center rounded-full shadow-lg ring-2 ring-white animate-bounce">
                    {cartCount}
                  </span>
                )}
              </button>

              <button 
                onClick={() => setIsMenuOpen(true)}
                className={`p-2.5 md:p-3 rounded-full active:opacity-60 ${isDarkPage ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-900'}`} 
              >
                <Menu className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 z-[100] transition-all duration-500 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <div className="absolute inset-0 bg-black/90 backdrop-blur-2xl" onClick={() => setIsMenuOpen(false)}></div>
          <div className={`absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl p-8 flex flex-col transition-transform duration-500 ease-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex justify-between items-center mb-12">
               <span className="text-2xl font-montserrat font-black uppercase tracking-tighter">{siteConfig.logoText}<span className="text-[var(--primary-blue)]">{siteConfig.logoAccentText}</span></span>
               <button onClick={() => setIsMenuOpen(false)} className="p-3 bg-gray-100 rounded-2xl text-gray-900 active:scale-90 transition-transform"><X className="w-6 h-6" /></button>
            </div>
            <div className="flex-1 flex flex-col gap-3">
              {[
                { id: Page.Home, label: 'Home Feed', icon: '🏠' },
                { id: Page.Anime, label: 'Anime Realm', icon: '🎎' },
                { id: Page.Supercars, label: 'The Garage', icon: '🏎️' },
                { id: Page.Toys, label: 'Toy Kingdom', icon: '🧸' }
              ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => { navigateTo(item.id); setIsMenuOpen(false); }} 
                  className={`w-full flex items-center justify-between p-5 rounded-[1.8rem] transition-all border border-transparent font-outfit font-black uppercase tracking-widest text-xs ${
                    currentPage === item.id ? 'bg-[var(--primary-blue)] text-white shadow-xl translate-x-2' : 'bg-gray-50 text-gray-500'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xl">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  {currentPage === item.id && <Zap className="w-4 h-4 fill-current" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>
      <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Navbar;
