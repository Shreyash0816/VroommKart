
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingCart, Heart, ShieldCheck, Truck, RotateCcw, AlertTriangle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Page } from '../types';
import ProductCard from '../components/ProductCard';

const ProductDetail: React.FC = () => {
  const { selectedProduct, navigateTo, addToCart, products } = useApp();
  const [qty, setQty] = useState(1);
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  if (!selectedProduct) {
    navigateTo(Page.Home);
    return null;
  }

  const isSupercar = selectedProduct.category === 'Supercars';
  const related = products.filter(p => p.category === selectedProduct.category && p.id !== selectedProduct.id).slice(0, 4);
  const outOfStock = selectedProduct.stock === 0;
  const lowStock = selectedProduct.stock > 0 && selectedProduct.stock <= 5;

  return (
    <div className={`min-h-screen ${isSupercar ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Gallery */}
          <div className="flex-1 space-y-6">
             <div className="relative rounded-[40px] overflow-hidden aspect-square shadow-2xl border border-gray-800/50 group bg-gray-900">
               <img 
                src={selectedProduct.images[activeImgIdx]} 
                alt={selectedProduct.name}
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
               />
               
               {selectedProduct.images.length > 1 && (
                 <>
                  <button 
                    onClick={() => setActiveImgIdx(prev => (prev === 0 ? selectedProduct.images.length - 1 : prev - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronLeft className="text-white" />
                  </button>
                  <button 
                    onClick={() => setActiveImgIdx(prev => (prev === selectedProduct.images.length - 1 ? 0 : prev + 1))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronRight className="text-white" />
                  </button>
                 </>
               )}

               {selectedProduct.rarity && (
                 <div className="absolute top-6 left-6 bg-blue-600 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-xl">
                    {selectedProduct.rarity}
                 </div>
               )}
               {outOfStock && (
                 <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                   <span className="bg-red-600 text-white px-8 py-3 rounded-full font-black uppercase tracking-widest text-xl rotate-12">Sold Out</span>
                 </div>
               )}
             </div>

             {/* Thumbnails */}
             {selectedProduct.images.length > 1 && (
               <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
                  {selectedProduct.images.map((img, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setActiveImgIdx(idx)}
                      className={`w-24 h-24 rounded-2xl overflow-hidden border-4 transition-all flex-shrink-0 ${
                        activeImgIdx === idx ? 'border-blue-600 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} className="w-full h-full object-cover" />
                    </button>
                  ))}
               </div>
             )}
          </div>

          {/* Details */}
          <div className="flex-1 space-y-8">
            <div>
              <nav className={`flex items-center space-x-2 text-xs font-bold uppercase tracking-widest mb-6 ${isSupercar ? 'text-blue-400' : 'text-blue-600'}`}>
                <span>Home</span>
                <span>/</span>
                <span>{selectedProduct.category}</span>
              </nav>
              <h1 className="text-4xl md:text-5xl font-montserrat font-black leading-tight mb-4">
                {selectedProduct.name}
              </h1>
              <div className="flex items-center space-x-4">
                 <span className="text-gray-500 font-bold uppercase tracking-widest text-xs">By {selectedProduct.brand}</span>
                 <div className="flex items-center text-yellow-400">
                    <span className="font-black mr-1">{selectedProduct.rating}</span>
                    <span>★</span>
                 </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <span className="text-5xl font-extrabold tracking-tighter">₹{selectedProduct.price.toLocaleString()}</span>
              {outOfStock ? (
                <span className="px-4 py-2 rounded-xl text-xs font-black bg-gray-800 text-gray-400 border border-gray-700 flex items-center space-x-2">
                  <AlertTriangle className="w-3 h-3" />
                  <span>UNAVAILABLE</span>
                </span>
              ) : (
                <div className={`px-4 py-2 rounded-xl text-xs font-black flex items-center space-x-2 ${
                  lowStock 
                  ? 'bg-yellow-900/40 text-yellow-400 border border-yellow-800' 
                  : 'bg-green-900/40 text-green-400 border border-green-800'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${lowStock ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'}`}></div>
                  <span>STOCK: {selectedProduct.stock} UNITS LEFT</span>
                </div>
              )}
            </div>

            <p className={`text-lg leading-relaxed ${isSupercar ? 'text-gray-400' : 'text-gray-600'}`}>
              {selectedProduct.description}
            </p>

            {!outOfStock && (
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-800">
                <div className={`flex items-center rounded-full border p-2 ${isSupercar ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 flex items-center justify-center font-bold text-xl hover:text-blue-500">-</button>
                  <span className="w-12 text-center font-black">{qty}</span>
                  <button onClick={() => setQty(Math.min(selectedProduct.stock, qty + 1))} className="w-10 h-10 flex items-center justify-center font-bold text-xl hover:text-blue-500">+</button>
                </div>
                <button 
                  onClick={() => addToCart(selectedProduct)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-full font-black uppercase tracking-wider flex items-center justify-center space-x-3 transition-all transform hover:scale-105 shadow-xl"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add To Cart</span>
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 opacity-70">
              <div className="flex items-center space-x-3 text-sm">
                 <Truck className="w-5 h-5 text-blue-500" />
                 <span className="font-bold">Fast Delivery</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                 <ShieldCheck className="w-5 h-5 text-blue-500" />
                 <span className="font-bold">Original Mint</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                 <RotateCcw className="w-5 h-5 text-blue-500" />
                 <span className="font-bold">7-Day Return</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        <div className="mt-32">
          <h2 className="text-3xl font-montserrat font-black mb-10 uppercase tracking-tighter">YOU MAY ALSO LIKE</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
