
import React, { useState, useMemo } from 'react';
import { Filter, Search, Grid, List, ChevronDown, CheckCircle, Trophy, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import { SUPERCAR_BRANDS } from '../constants';

const SupercarShop: React.FC = () => {
  const { products } = useApp();
  const [filterBrand, setFilterBrand] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const cars = useMemo(() => products.filter(p => p.category === 'Supercars'), [products]);

  const filteredCars = useMemo(() => {
    return cars.filter(c => {
      const matchesBrand = filterBrand === 'All' || c.brand === filterBrand;
      const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           c.brand.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesBrand && matchesSearch;
    });
  }, [cars, filterBrand, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-950 pt-6 md:pt-10 pb-20 w-full overflow-x-hidden">
      {/* Header */}
      <header className="max-w-7xl mx-auto px-4 mb-8 md:mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
          <div className="w-full">
            <nav className="flex items-center space-x-2 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-3">
              <span>Home</span>
              <span>/</span>
              <span className="text-white">Supercars Garage</span>
            </nav>
            <div className="flex flex-col mb-2">
               <h1 className="text-3xl md:text-7xl font-montserrat font-black text-white tracking-tighter uppercase leading-tight">
                THE <span className="text-blue-500">DIECAST</span> VAULT
              </h1>
            </div>
            <p className="text-gray-400 mt-2 max-w-xl text-sm md:text-lg">
              India's premium selection of 1:64 and 1:24 scales. Featuring Mini GT, Kaido House, and Inno64.
            </p>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="bg-gray-900 p-2 rounded-xl flex items-center space-x-2 border border-gray-800 shadow-xl">
               <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-gray-300'}`}
               >
                <Grid className="w-5 h-5" />
               </button>
               <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-gray-300'}`}
               >
                <List className="w-5 h-5" />
               </button>
            </div>
          </div>
        </div>
      </header>

      {/* Brand Sub-Categories Bar - Optimized for Mobile Scroller */}
      <section className="max-w-7xl mx-auto px-4 mb-8">
        <div className="w-full relative overflow-hidden">
          <div className="flex items-center space-x-2 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4">
            <button 
              onClick={() => setFilterBrand('All')}
              className={`px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all flex-shrink-0 border-2 ${
                filterBrand === 'All' 
                ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20' 
                : 'bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-700'
              }`}
            >
              All Brands
            </button>
            {SUPERCAR_BRANDS.map(brand => (
              <button 
                key={brand}
                onClick={() => setFilterBrand(brand)}
                className={`px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all flex-shrink-0 border-2 ${
                  filterBrand === brand 
                  ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20' 
                  : 'bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-700'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Toolbar */}
      <section className="max-w-7xl mx-auto px-4 mb-8 md:mb-12">
        <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-3xl md:rounded-[40px] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4 w-full md:w-auto overflow-x-auto no-scrollbar pb-1 md:pb-0">
             <div className="flex items-center space-x-2 flex-shrink-0">
               <span className="text-gray-600 font-black text-[9px] uppercase tracking-widest">Filter:</span>
               <div className="relative">
                 <select 
                    value={filterBrand}
                    onChange={(e) => setFilterBrand(e.target.value)}
                    className="appearance-none bg-black text-white border border-gray-800 rounded-xl px-4 py-2 pr-10 focus:outline-none focus:ring-1 focus:ring-blue-500 font-bold text-[11px]"
                  >
                   <option value="All">Brands</option>
                   {SUPERCAR_BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
                 </select>
                 <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-600 pointer-events-none" />
               </div>
             </div>
             
             <div className="flex items-center space-x-2 flex-shrink-0">
                <div className="flex space-x-1.5">
                   <div className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-[8px] font-black uppercase border border-blue-500/20">Mint Box</div>
                   <div className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-[8px] font-black uppercase border border-green-500/20">In Stock</div>
                </div>
             </div>
          </div>
          
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search model (e.g. R34)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black border border-gray-800 rounded-full py-4 pl-12 pr-6 text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all font-medium placeholder:text-gray-700"
            />
          </div>
        </div>
      </section>

      {/* Grid Display - Fixed for Mobile */}
      <main className="max-w-7xl mx-auto px-4">
        {filteredCars.length > 0 ? (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-8" 
            : "flex flex-col gap-4"
          }>
            {filteredCars.map(car => (
              <ProductCard key={car.id} product={car} viewMode={viewMode} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border-2 border-dashed border-gray-800 rounded-3xl">
            <h3 className="text-xl font-black text-white mb-1 uppercase tracking-tighter">Garage Empty</h3>
            <p className="text-gray-500 text-sm px-4">No models found for these filters.</p>
            <button 
              onClick={() => { setFilterBrand('All'); setSearchQuery(''); }}
              className="mt-4 text-blue-500 font-black uppercase tracking-widest text-[10px] hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>

      {/* Bottom Features */}
      <section className="max-w-7xl mx-auto px-4 mt-16 pt-10 border-t border-gray-900">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <CheckCircle />, title: 'Authenticated', desc: 'Direct partner with official brands.' },
            { icon: <Filter />, title: 'Rare Selection', desc: 'Chase models & Limited Run items.' },
            { icon: <Trophy />, title: 'Collector Care', desc: 'Mint packaging, bubble wrapped.' }
          ].map((feat, idx) => (
            <div key={idx} className="flex items-start space-x-4">
               <div className="w-10 h-10 bg-blue-600/10 rounded-xl flex items-center justify-center flex-shrink-0 text-blue-500">
                  {feat.icon}
               </div>
               <div>
                  <h4 className="text-white font-black uppercase text-xs mb-1">{feat.title}</h4>
                  <p className="text-gray-500 text-[10px] leading-relaxed">{feat.desc}</p>
               </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SupercarShop;
