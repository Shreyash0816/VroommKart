
import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Car, Ghost, Package } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Page, Product } from '../types';

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const GlobalSearch: React.FC<GlobalSearchProps> = ({ isOpen, onClose }) => {
  const { products, navigateTo } = useApp();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim().length > 1) {
      const filtered = products.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6);
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query, products]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-gray-900/95 backdrop-blur-md animate-in fade-in duration-300 flex flex-col items-center pt-20 px-4">
      <button 
        onClick={onClose}
        className="absolute top-8 right-8 text-gray-400 hover:text-white transition-colors p-2 bg-gray-800 rounded-full"
      >
        <X className="w-8 h-8" />
      </button>

      <div className="w-full max-w-3xl">
        <div className="relative mb-12">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-blue-500 w-8 h-8" />
          <input 
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for toys, supercars, or anime..."
            className="w-full bg-gray-800 border-2 border-gray-700 rounded-3xl py-8 pl-20 pr-8 text-2xl text-white focus:outline-none focus:border-blue-500 transition-all font-black placeholder:text-gray-600"
          />
        </div>

        {results.length > 0 ? (
          <div className="space-y-4 animate-in slide-in-from-bottom-5 duration-500">
            <h3 className="text-blue-500 font-black text-xs uppercase tracking-[0.3em] mb-6">Top Results</h3>
            {results.map(product => (
              <div 
                key={product.id}
                onClick={() => {
                  navigateTo(Page.ProductDetail, product);
                  onClose();
                  setQuery('');
                }}
                className="group bg-gray-800/50 border border-gray-700 p-4 rounded-3xl flex items-center gap-6 cursor-pointer hover:bg-blue-600/10 hover:border-blue-500 transition-all"
              >
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-900 flex-shrink-0">
                  <img src={product.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-blue-400">
                    <span>{product.brand}</span>
                    <span>•</span>
                    <span>{product.category}</span>
                  </div>
                  <h4 className="text-white font-bold text-lg group-hover:text-blue-400 transition-colors">{product.name}</h4>
                  <p className="text-gray-400 font-black">₹{product.price.toLocaleString()}</p>
                </div>
                <ArrowRight className="text-gray-600 group-hover:text-blue-500 transition-colors mr-4" />
              </div>
            ))}
          </div>
        ) : query.length > 1 ? (
          <div className="text-center py-20 bg-gray-800/20 rounded-[40px] border-2 border-dashed border-gray-700">
            <Ghost className="w-16 h-16 text-gray-700 mx-auto mb-4" />
            <p className="text-gray-500 font-bold">No items found for "{query}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="p-8 bg-gray-800/30 rounded-[40px] border border-gray-700/50">
               <h4 className="text-white font-black text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
                 <Car className="w-4 h-4 text-blue-500" /> Quick Categories
               </h4>
               <div className="flex flex-wrap gap-3">
                 {['Skyline', 'Supra', 'Porsche', 'Naruto', 'LEGO', 'Hot Wheels'].map(tag => (
                   <button 
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-4 py-2 bg-gray-700 hover:bg-blue-600 text-white rounded-full text-xs font-bold transition-colors"
                   >
                     {tag}
                   </button>
                 ))}
               </div>
             </div>
             <div className="p-8 bg-gray-800/30 rounded-[40px] border border-gray-700/50">
                <h4 className="text-white font-black text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
                 <Package className="w-4 h-4 text-green-500" /> Trending Now
               </h4>
               <ul className="space-y-3 text-gray-400 text-sm font-medium">
                 <li className="flex items-center gap-2 hover:text-white cursor-pointer" onClick={() => setQuery('Mini GT')}>
                   <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div> New Mini GT Drops
                 </li>
                 <li className="flex items-center gap-2 hover:text-white cursor-pointer" onClick={() => setQuery('Naruto')}>
                   <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div> S.H.Figuarts Naruto
                 </li>
                 <li className="flex items-center gap-2 hover:text-white cursor-pointer" onClick={() => setQuery('Bugatti')}>
                   <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div> Bugatti Collection
                 </li>
               </ul>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalSearch;
