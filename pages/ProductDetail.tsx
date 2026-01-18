
import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
/* Fix: Added Trophy and Star icons to the imports from lucide-react */
import { ShoppingCart, Heart, ShieldCheck, Truck, RotateCcw, AlertTriangle, ChevronLeft, ChevronRight, Maximize2, X, ZoomIn, Trophy, Star } from 'lucide-react';
import { Page } from '../types';
import ProductCard from '../components/ProductCard';

const ProductDetail: React.FC = () => {
  const { selectedProduct, navigateTo, addToCart, products } = useApp();
  const [qty, setQty] = useState(1);
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const mainImageRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (isZoomOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isZoomOpen]);

  if (!selectedProduct) {
    navigateTo(Page.Home);
    return null;
  }

  const isSupercar = selectedProduct.category === 'Supercars';
  const related = products.filter(p => p.category === selectedProduct.category && p.id !== selectedProduct.id).slice(0, 4);
  const outOfStock = selectedProduct.stock === 0;
  const lowStock = selectedProduct.stock > 0 && selectedProduct.stock <= 5;

  const handleImageChange = (newIdx: number) => {
    if (newIdx === activeImgIdx) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveImgIdx(newIdx);
      setIsAnimating(false);
    }, 200);
  };

  const handlePrev = () => {
    const newIdx = activeImgIdx === 0 ? selectedProduct.images.length - 1 : activeImgIdx - 1;
    handleImageChange(newIdx);
  };

  const handleNext = () => {
    const newIdx = activeImgIdx === selectedProduct.images.length - 1 ? 0 : activeImgIdx + 1;
    handleImageChange(newIdx);
  };

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <div className={`min-h-screen ${isSupercar ? 'bg-[#020617] text-white' : 'bg-white text-gray-900'} transition-colors duration-500`}>
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-24">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* Enhanced Image Gallery Section */}
          <div className="flex-1 space-y-8">
            <div 
              ref={mainImageRef}
              className={`relative rounded-[3rem] md:rounded-[4rem] overflow-hidden aspect-square shadow-2xl border ${isSupercar ? 'border-white/10 bg-[#0f172a]' : 'border-gray-100 bg-gray-50'} group cursor-zoom-in`}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onClick={() => setIsZoomOpen(true)}
            >
              {/* Image Transition Layer */}
              <div className={`w-full h-full transition-all duration-500 ease-out ${isAnimating ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'}`}>
                <img 
                  src={selectedProduct.images[activeImgIdx]} 
                  alt={selectedProduct.name}
                  className="w-full h-full object-contain p-6 md:p-12 drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)]"
                />
              </div>

              {/* Navigation Arrows */}
              {selectedProduct.images.length > 1 && (
                <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between items-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                    className="p-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-blue-600 transition-all pointer-events-auto active:scale-90"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleNext(); }}
                    className="p-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-blue-600 transition-all pointer-events-auto active:scale-90"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              )}

              {/* Status & Action Floating UI */}
              <div className="absolute top-6 left-6 z-10 flex flex-col gap-3">
                {selectedProduct.rarity && (
                  <div className="bg-blue-600 text-white px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-2">
                    <Trophy className="w-3.5 h-3.5" />
                    {selectedProduct.rarity}
                  </div>
                )}
                {outOfStock && (
                  <div className="bg-red-600 text-white px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl">
                    Sold Out
                  </div>
                )}
              </div>

              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-white">
                  <Maximize2 className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Premium Thumbnails Grid */}
            {selectedProduct.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar snap-x">
                {selectedProduct.images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => handleImageChange(idx)}
                    className={`relative w-24 h-24 md:w-32 md:h-32 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border-2 transition-all flex-shrink-0 snap-start ${
                      activeImgIdx === idx 
                        ? 'border-blue-600 ring-4 ring-blue-600/20 scale-105 shadow-xl' 
                        : 'border-transparent opacity-40 hover:opacity-100 hover:scale-105'
                    } ${isSupercar ? 'bg-[#0f172a]' : 'bg-white'}`}
                  >
                    <img src={img} className="w-full h-full object-contain p-2 md:p-4" />
                    {activeImgIdx === idx && (
                      <div className="absolute inset-0 bg-blue-600/5 pointer-events-none"></div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info Details Section */}
          <div className="flex-1 space-y-10">
            <div className="space-y-6">
              <nav className={`flex items-center space-x-3 text-[10px] font-black uppercase tracking-[0.3em] ${isSupercar ? 'text-blue-400' : 'text-blue-600'}`}>
                <button onClick={() => navigateTo(Page.Home)} className="hover:opacity-70">Hub</button>
                <span className="opacity-30">/</span>
                <span className={`${isSupercar ? 'text-white' : 'text-gray-900'}`}>{selectedProduct.category}</span>
              </nav>
              
              <h1 className="text-4xl md:text-7xl font-montserrat font-black leading-[0.9] tracking-tighter uppercase">
                {selectedProduct.name}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6">
                <div className={`px-4 py-2 rounded-xl flex items-center gap-2 ${isSupercar ? 'bg-white/5 border border-white/10' : 'bg-gray-100 border border-gray-200'}`}>
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Brand</span>
                  <span className="font-black text-xs uppercase">{selectedProduct.brand}</span>
                </div>
                <div className="flex items-center text-yellow-400 gap-1.5">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(selectedProduct.rating) ? 'fill-current' : 'opacity-30'}`} />
                    ))}
                  </div>
                  <span className="font-black text-sm">{selectedProduct.rating}</span>
                  <span className="text-[10px] text-gray-500 font-bold">({selectedProduct.reviews} Verified)</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-8 pt-8 border-t border-gray-100/10">
              <div className="flex items-end gap-3">
                <span className="text-5xl md:text-7xl font-montserrat font-black tracking-tighter">₹{selectedProduct.price.toLocaleString()}</span>
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">incl. taxes</span>
              </div>

              {!outOfStock ? (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className={`flex items-center rounded-3xl border px-2 py-1 ${isSupercar ? 'bg-[#0f172a] border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                      <button 
                        onClick={() => setQty(Math.max(1, qty - 1))} 
                        className="w-12 h-12 flex items-center justify-center font-black text-xl hover:text-blue-600 transition-colors"
                      >
                        -
                      </button>
                      <span className="w-12 text-center font-black text-lg">{qty}</span>
                      <button 
                        onClick={() => setQty(Math.min(selectedProduct.stock, qty + 1))} 
                        className="w-12 h-12 flex items-center justify-center font-black text-xl hover:text-blue-600 transition-colors"
                      >
                        +
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => addToCart(selectedProduct)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-5 px-10 rounded-3xl font-black uppercase tracking-widest flex items-center justify-center gap-4 transition-all transform hover:scale-[1.02] active:scale-95 shadow-[0_20px_40px_rgba(37,99,235,0.3)]"
                    >
                      <ShoppingCart className="w-6 h-6" />
                      <span>Ignite Order</span>
                    </button>
                    
                    <button className={`p-5 rounded-3xl border transition-all hover:bg-red-500 hover:text-white hover:border-red-500 ${isSupercar ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                      <Heart className="w-6 h-6" />
                    </button>
                  </div>

                  {lowStock && (
                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-500">
                      <AlertTriangle className="w-5 h-5 animate-pulse" />
                      <span className="text-xs font-black uppercase tracking-widest">Low Stock Radar: Only {selectedProduct.stock} Left!</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-8 rounded-[2.5rem] bg-red-500/5 border border-red-500/10 text-center">
                  <h3 className="text-xl font-black text-red-500 uppercase tracking-tighter mb-2">Sold Out</h3>
                  <p className="text-sm text-gray-500 font-bold">This model has left the garage. Stay tuned for restocks!</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10 border-t border-gray-100/10">
              <BenefitItem icon={<Truck />} title="Turbo Shipping" desc="48h Pan-India Dispatch" />
              <BenefitItem icon={<ShieldCheck />} title="Mint Condition" desc="Hard-Box Packaging" />
              <BenefitItem icon={<RotateCcw />} title="Hassle Free" desc="7-Day Return Policy" />
              <BenefitItem icon={<Star />} title="Authentic" desc="Official Brand License" />
            </div>
          </div>
        </div>

        {/* Technical Specs / Description Accordion Area */}
        <div className="mt-32 border-t border-gray-100/10 pt-20">
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-8">
              <h2 className="text-3xl font-black uppercase tracking-tighter">Mission Log</h2>
              <p className={`text-xl font-outfit font-medium leading-relaxed ${isSupercar ? 'text-gray-400' : 'text-gray-600'}`}>
                {selectedProduct.description}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
                 <SpecBox label="Series" value={selectedProduct.brand} />
                 <SpecBox label="Scale" value={selectedProduct.scale || '1:64'} />
                 <SpecBox label="Condition" value="Mint / New" />
                 <SpecBox label="Category" value={selectedProduct.category} />
              </div>
            </div>
            
            <div className={`p-10 rounded-[3rem] border ${isSupercar ? 'bg-white/5 border-white/10' : 'bg-blue-50 border-blue-100'}`}>
              <h3 className="text-xl font-black mb-6 uppercase tracking-tight">Need Assistance?</h3>
              <p className="text-sm font-medium mb-8 opacity-60">Our collector experts are ready to help you find the perfect addition to your vault.</p>
              <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-700 transition-all">
                Talk to Support
              </button>
            </div>
          </div>
        </div>

        {/* Related Engine */}
        <div className="mt-32">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-5xl font-montserrat font-black uppercase tracking-tighter">SIMILAR ENGINES</h2>
            <button 
              onClick={() => navigateTo(selectedProduct.category === 'Supercars' ? Page.Supercars : Page.Toys)}
              className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:opacity-70 flex items-center gap-2"
            >
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </div>

      {/* Full-Screen High-Res Zoom Modal */}
      {isZoomOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-4 md:p-12 animate-in fade-in duration-300"
          onClick={() => setIsZoomOpen(false)}
        >
          <div className="absolute top-8 right-8 flex items-center gap-4">
            <span className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] hidden md:block">Scroll or Pinch to Zoom</span>
            <button className="p-4 bg-white/10 rounded-full text-white hover:bg-red-600 transition-all">
              <X className="w-8 h-8" />
            </button>
          </div>

          <div 
            className="relative w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedProduct.images[activeImgIdx]} 
              className="max-w-full max-h-full object-contain drop-shadow-[0_0_100px_rgba(37,99,235,0.2)] animate-in zoom-in-95 duration-500"
              alt="Zoomed product"
            />
          </div>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white/5 backdrop-blur-md p-2 rounded-[2rem] border border-white/10">
            {selectedProduct.images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveImgIdx(idx)}
                className={`w-16 h-16 rounded-2xl overflow-hidden border-2 transition-all ${activeImgIdx === idx ? 'border-blue-600 scale-110 shadow-lg' : 'border-transparent opacity-40 hover:opacity-100'}`}
              >
                <img src={img} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const BenefitItem: React.FC<{ icon: any, title: string, desc: string }> = ({ icon, title, desc }) => (
  <div className="flex items-center gap-4 group">
    <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
      {React.cloneElement(icon as React.ReactElement<any>, { className: 'w-6 h-6' })}
    </div>
    <div>
      <h4 className="text-sm font-black uppercase tracking-widest">{title}</h4>
      <p className="text-[10px] font-bold text-gray-500 uppercase opacity-60">{desc}</p>
    </div>
  </div>
);

const SpecBox: React.FC<{ label: string, value: string }> = ({ label, value }) => (
  <div className="p-6 rounded-2xl bg-gray-50/5 border border-gray-100/10 flex flex-col gap-1">
    <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{label}</span>
    <span className="font-bold text-sm">{value}</span>
  </div>
);

export default ProductDetail;
