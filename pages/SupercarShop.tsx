
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, Grid, List, Box, Sparkles, ChevronLeft, ChevronRight, Filter, SortAsc, Gauge, Flame, Trophy, X, ShoppingCart, ShieldCheck, Truck, Star, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SUPERCAR_BRANDS } from '../constants';
import { Product, Page } from '../types';
import ProductCard from '../components/ProductCard';

const SupercarShop: React.FC = () => {
  const { products, addToCart, navigateTo } = useApp();
  const brandScrollRef = useRef<HTMLDivElement>(null);
  
  // Filters State
  const [selectedBrand, setSelectedBrand] = useState('All Brands');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Quick View State
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Strictly Supercars for this page
  const cars = useMemo(() => products.filter(p => p.category === 'Supercars'), [products]);

  // Brand navigation list
  const availableBrands = useMemo(() => ['All Brands', ...SUPERCAR_BRANDS], []);

  // Filter Logic
  const filteredCars = useMemo(() => {
    return cars.filter(c => {
      const matchesBrand = selectedBrand === 'All Brands' || 
                           (c.brand && c.brand.trim().toLowerCase() === selectedBrand.trim().toLowerCase());
      const query = searchQuery.toLowerCase();
      const matchesSearch = c.name.toLowerCase().includes(query) || 
                           (c.brand && c.brand.toLowerCase().includes(query));
      
      return matchesBrand && matchesSearch;
    });
  }, [cars, selectedBrand, searchQuery]);

  const scrollBrands = (direction: 'left' | 'right') => {
    if (brandScrollRef.current) {
      const { scrollLeft, clientWidth } = brandScrollRef.current;
      const scrollAmount = clientWidth * 0.6;
      const scrollTo = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      brandScrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  // Lock scroll when quick view is open
  useEffect(() => {
    if (quickViewProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [quickViewProduct]);

  return (
    <div className="min-h-screen bg-[#020617] pt-24 pb-32 w-full overflow-x-hidden relative">
      {/* Dynamic Background Accents */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-blue-600/10 via-transparent to-transparent pointer-events-none"></div>
      <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-20 left-0 w-[500px] h-[500px] bg-blue-900/10 blur-[150px] rounded-full pointer-events-none"></div>

      {/* Breadcrumb - Tech Style */}
      <nav className="max-w-7xl mx-auto px-6 mb-8 flex items-center space-x-3 text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 relative z-10">
        <button onClick={() => window.location.hash = '#/home'} className="hover:text-blue-400 transition-colors flex items-center gap-1.5"><Box className="w-3 h-3"/> HUB</button>
        <ChevronRight className="w-2 h-2" />
        <span className="text-white bg-blue-600/20 px-3 py-1 rounded-full border border-blue-500/20">THE VAULT</span>
      </nav>

      {/* Header Section */}
      <header className="max-w-7xl mx-auto px-6 mb-16 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400">
               <Gauge className="w-4 h-4 animate-pulse" />
               <span className="text-[10px] font-black uppercase tracking-[0.2em]">High Performance Collection</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-montserrat font-black text-white tracking-tighter uppercase leading-[0.85]">
              ELITE<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500">DIECAST VAULT</span>
            </h1>
            <p className="text-slate-400 text-sm md:text-xl font-outfit font-medium max-w-2xl leading-relaxed">
              Precision 1:64 scale masterpieces for the uncompromising collector. Authenticity guaranteed, speed immortalized.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-900/50 backdrop-blur-xl p-1.5 rounded-2xl border border-white/5 shadow-2xl">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-3.5 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-3.5 rounded-xl transition-all ${viewMode === 'list' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Advanced Control Bar */}
      <section className="max-w-7xl mx-auto px-6 mb-12 sticky top-24 z-40">
        <div className="bg-[#0f172a]/80 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] p-3 md:p-4 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] flex flex-col md:flex-row gap-4">
          {/* Enhanced Search Input */}
          <div className="flex-1 relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5 group-focus-within:text-blue-400 transition-colors" />
            <input 
              type="text" 
              placeholder={`Search in ${selectedBrand === 'All Brands' ? 'Vault' : selectedBrand}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/40 border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-bold placeholder:text-slate-600 text-sm md:text-base"
            />
          </div>

          {/* Quick Filters Group */}
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1 md:pb-0">
            <div className="h-10 w-[1px] bg-white/5 mx-2 hidden md:block"></div>
            <button className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-slate-900 text-slate-400 border border-white/5 text-[10px] font-black uppercase tracking-widest hover:text-white hover:bg-slate-800 transition-all whitespace-nowrap">
              <Filter className="w-4 h-4" />
              Filters
            </button>
            <button className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-slate-900 text-slate-400 border border-white/5 text-[10px] font-black uppercase tracking-widest hover:text-white hover:bg-slate-800 transition-all whitespace-nowrap">
              <SortAsc className="w-4 h-4" />
              Price
            </button>
          </div>
        </div>
      </section>

      {/* Brand Navigation Section */}
      <section className="max-w-7xl mx-auto px-6 mb-16 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
             <div className="w-1.5 h-6 bg-blue-500 rounded-full"></div>
             <h3 className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Official Manufacturers</h3>
          </div>
          <div className="flex gap-2">
            <button onClick={() => scrollBrands('left')} className="p-2.5 bg-slate-900 hover:bg-blue-600 text-white rounded-xl transition-all border border-white/5">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={() => scrollBrands('right')} className="p-2.5 bg-slate-900 hover:bg-blue-600 text-white rounded-xl transition-all border border-white/5">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div 
          ref={brandScrollRef}
          className="flex items-center space-x-4 overflow-x-auto pb-6 no-scrollbar snap-x scroll-smooth touch-pan-x"
        >
          {availableBrands.map(brand => (
            <button 
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className={`px-8 py-5 rounded-[1.5rem] font-black uppercase text-[10px] tracking-widest transition-all flex-shrink-0 border-2 whitespace-nowrap snap-start flex items-center gap-3 ${
                selectedBrand === brand 
                ? 'bg-blue-600 border-blue-400 text-white shadow-[0_15px_30px_rgba(37,99,235,0.3)] scale-105' 
                : 'bg-slate-900/50 border-white/5 text-slate-500 hover:text-slate-300 hover:border-slate-700'
              }`}
            >
              {brand === 'All Brands' ? <Trophy className="w-4 h-4" /> : null}
              {brand}
            </button>
          ))}
        </div>
      </section>

      {/* Main Results Grid */}
      <main className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        {filteredCars.length > 0 ? (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10" 
            : "flex flex-col gap-6"
          }>
            {filteredCars.map((car, idx) => (
              <div 
                key={car.id} 
                className="animate-in fade-in slide-in-from-bottom-8 duration-700" 
                style={{ animationDelay: `${idx * 40}ms`, animationFillMode: 'both' }}
              >
                <ProductCard 
                  product={car} 
                  viewMode={viewMode} 
                  onQuickView={(p) => setQuickViewProduct(p)} 
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-slate-900/20 rounded-[4rem] border-2 border-dashed border-white/5 backdrop-blur-sm">
            <div className="bg-slate-800 w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto mb-8 animate-bounce-slow shadow-2xl">
              <Ghost className="w-10 h-10 text-slate-500" />
            </div>
            <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">Signal Lost!</h3>
            <p className="text-slate-500 font-bold mb-12 text-sm max-w-xs mx-auto leading-relaxed">We couldn't track any models matching your current radar settings.</p>
            <button 
              onClick={() => { setSelectedBrand('All Brands'); setSearchQuery(''); }}
              className="bg-blue-600 text-white px-12 py-5 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-blue-500 transition-all shadow-2xl shadow-blue-600/20 active:scale-95"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </main>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div 
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300"
          onClick={() => setQuickViewProduct(null)}
        >
          <div 
            className="bg-[#0f172a] border border-white/10 w-full max-w-5xl rounded-[3rem] overflow-hidden flex flex-col md:flex-row relative animate-in zoom-in-95 duration-500 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-6 right-6 z-10 p-4 bg-white/10 hover:bg-red-600 text-white rounded-2xl transition-all border border-white/10"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left: Product Images */}
            <div className="flex-1 bg-white p-8 md:p-12 flex items-center justify-center relative group">
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                 <span className="bg-blue-600 text-white px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-xl">QUICK VIEW</span>
                 {quickViewProduct.rarity && (
                   <span className="bg-slate-900 text-white px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-xl border border-white/10">{quickViewProduct.rarity}</span>
                 )}
              </div>
              <img 
                src={quickViewProduct.images[0]} 
                alt={quickViewProduct.name}
                className="w-full h-full max-h-[400px] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)] transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            {/* Right: Product Details */}
            <div className="flex-1 p-8 md:p-12 flex flex-col text-white">
              <div className="mb-8">
                <span className="text-blue-400 font-black text-[10px] uppercase tracking-[0.4em] block mb-3">{quickViewProduct.brand}</span>
                <h2 className="text-3xl md:text-4xl font-montserrat font-black leading-tight mb-4 uppercase tracking-tight">{quickViewProduct.name}</h2>
                <div className="flex items-center gap-4">
                   <div className="flex items-center text-yellow-400">
                     {[...Array(5)].map((_, i) => (
                       <Star key={i} className={`w-4 h-4 ${i < Math.floor(quickViewProduct.rating) ? 'fill-current' : 'opacity-30'}`} />
                     ))}
                   </div>
                   <span className="text-slate-500 font-bold text-xs uppercase tracking-widest">{quickViewProduct.reviews} REVIEWS</span>
                </div>
              </div>

              <div className="flex items-end gap-3 mb-10">
                <span className="text-4xl md:text-5xl font-montserrat font-black tracking-tighter">₹{quickViewProduct.price.toLocaleString()}</span>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">incl. taxes</span>
              </div>

              <p className="text-slate-400 text-sm md:text-base font-medium leading-relaxed mb-10 line-clamp-3">
                {quickViewProduct.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-10">
                 <div className="bg-white/5 border border-white/5 p-4 rounded-2xl flex flex-col gap-1">
                    <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Scale</span>
                    <span className="font-bold text-sm">{quickViewProduct.scale || '1:64'}</span>
                 </div>
                 <div className="bg-white/5 border border-white/5 p-4 rounded-2xl flex flex-col gap-1">
                    <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Stock Status</span>
                    <span className={`font-bold text-sm ${quickViewProduct.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {quickViewProduct.stock > 0 ? `${quickViewProduct.stock} Units` : 'Sold Out'}
                    </span>
                 </div>
              </div>

              <div className="flex gap-4 mt-auto">
                <button 
                  onClick={() => {
                    addToCart(quickViewProduct);
                    setQuickViewProduct(null);
                  }}
                  disabled={quickViewProduct.stock === 0}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-xl shadow-blue-600/30 disabled:opacity-50"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>
                <button 
                  onClick={() => {
                    navigateTo(Page.ProductDetail, quickViewProduct);
                    setQuickViewProduct(null);
                  }}
                  className="p-5 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-2xl transition-all"
                  title="Full Details"
                >
                  <Info className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Floating Stats (Desktop Only) */}
      <div className="hidden lg:flex fixed bottom-10 left-10 z-30">
        <div className="glass-dark px-6 py-4 rounded-3xl border border-white/10 flex items-center gap-6 shadow-2xl">
           <div className="flex flex-col">
             <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Total Stock</span>
             <span className="text-white font-black">{filteredCars.length} Models</span>
           </div>
           <div className="w-[1px] h-8 bg-white/10"></div>
           <div className="flex items-center gap-3 text-blue-400">
             <Flame className="w-4 h-4 fill-current" />
             <span className="text-[10px] font-black uppercase tracking-widest">Vault Active</span>
           </div>
        </div>
      </div>
    </div>
  );
};

// Internal Ghost component for the empty state
const Ghost: React.FC<{className?: string}> = ({className}) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 10h.01" />
    <path d="M15 10h.01" />
    <path d="M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z" />
  </svg>
);

export default SupercarShop;
