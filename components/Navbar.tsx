
import React, { useState } from 'react';
import { ShoppingCart, Heart, Search, Menu, X, Car } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Page } from '../types';
import GlobalSearch from './GlobalSearch';

const Navbar: React.FC = () => {
  const { currentPage, navigateTo, cart } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const isDarkPage = currentPage === Page.Supercars;

  return (
    <>
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        isDarkPage ? 'bg-gray-900 text-white border-b border-gray-800' : 'bg-white text-gray-900 shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div 
              className="flex items-center cursor-pointer group"
              onClick={() => navigateTo(Page.Home)}
            >
              <div className="relative">
                 <Car className={`w-10 h-10 ${isDarkPage ? 'text-blue-400' : 'text-blue-600'} transition-transform group-hover:-translate-y-1`} />
                 <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white"></div>
              </div>
              <span className="ml-3 text-2xl font-montserrat font-extrabold tracking-tighter">
                VROOMM<span className={isDarkPage ? 'text-blue-400' : 'text-blue-600'}>KART</span>
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-6">
              <button onClick={() => navigateTo(Page.Home)} className={`font-medium transition-colors ${currentPage === Page.Home ? 'text-blue-500' : 'hover:text-blue-500'}`}>Home</button>
              <button onClick={() => navigateTo(Page.Anime)} className={`font-medium transition-colors ${currentPage === Page.Anime ? 'text-blue-500' : 'hover:text-blue-500'}`}>Anime</button>
              <button onClick={() => navigateTo(Page.Supercars)} className={`font-medium transition-colors ${currentPage === Page.Supercars ? 'text-blue-500' : 'hover:text-blue-500'}`}>Supercars</button>
              <button onClick={() => navigateTo(Page.Toys)} className={`font-medium transition-colors ${currentPage === Page.Toys ? 'text-blue-500' : 'hover:text-blue-500'}`}>Toys</button>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className={`p-2 rounded-full hover:bg-opacity-20 ${isDarkPage ? 'hover:bg-white' : 'hover:bg-gray-100'}`}
              >
                <Search className="w-6 h-6" />
              </button>
              <button className={`p-2 rounded-full hover:bg-opacity-20 ${isDarkPage ? 'hover:bg-white' : 'hover:bg-gray-100'}`}>
                <Heart className="w-6 h-6" />
              </button>
              <button 
                onClick={() => navigateTo(Page.Cart)}
                className={`relative p-2 rounded-full hover:bg-opacity-20 ${isDarkPage ? 'hover:bg-white' : 'hover:bg-gray-100'}`}
              >
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-yellow-400 text-gray-900 text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-lg">
                    {cartCount}
                  </span>
                )}
              </button>
              <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`md:hidden absolute top-20 left-0 w-full animate-in slide-in-from-top-2 duration-300 ${isDarkPage ? 'bg-gray-900 border-b border-gray-800' : 'bg-white shadow-xl'} p-6 space-y-4 z-40`}>
            <button onClick={() => { navigateTo(Page.Home); setIsMenuOpen(false); }} className="block w-full text-left py-2 font-semibold">Home</button>
            <button onClick={() => { navigateTo(Page.Anime); setIsMenuOpen(false); }} className="block w-full text-left py-2 font-semibold">Anime World</button>
            <button onClick={() => { navigateTo(Page.Supercars); setIsMenuOpen(false); }} className="block w-full text-left py-2 font-semibold">Supercars Collection</button>
            <button onClick={() => { navigateTo(Page.Toys); setIsMenuOpen(false); }} className="block w-full text-left py-2 font-semibold">Toys</button>
          </div>
        )}
      </nav>

      <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Navbar;
