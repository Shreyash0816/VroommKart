
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
    <div className="min-h-screen bg-gray-950 pt-10 pb-20">
      {/* Header */}
      <header className="max-w-7xl mx-auto px-4 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <nav className="flex items-center space-x-2 text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
              <span>Home</span>
              <span>/</span>
              <span className="text-white">Supercars Garage</span>
            </nav>
            <div className="flex items-center space-x-4 mb-4">
               <h1 className="text-5xl md:text-7xl font-montserrat font-black text-white tracking-tighter uppercase">
                THE <span className="text-blue-500">DIECAST</span> VAULT
              </h1>
              <div className="hidden lg:flex items-center space-x-2 bg-blue-600/10 border border-blue-500/30 px-4 py-2 rounded-full animate-pulse">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Mini GT Drop Live</span>
              </div>
            </div>
            <p className="text-gray-400 mt-6 max-w-xl text-lg">
              India's premium selection of 1:64 and 1:24 scales. Featuring the complete Mini GT collection, Kaido House, and Inno64.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-gray-900 p-2 rounded-xl flex items-center space-x-2 border border-gray-800 shadow-xl">
               <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                title="Grid View"
               >
                <Grid className="w-5 h-5" />
               </button>
               <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                title="List View"
               >
                <List className="w-5 h-5" />
               </button>
            </div>
          </div>
        </div>
      </header>

      {/* Brand Sub-Categories Bar */}
      <section className="max-w-7xl mx-auto px-4 mb-12">
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 custom-scrollbar no-scrollbar">
          <button 
            onClick={() => setFilterBrand('All')}
            className={`px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all flex-shrink-0 border-2 ${
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
              className={`px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all flex-shrink-0 border-2 ${
                filterBrand === brand 
                ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20' 
                : 'bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-700'
              }`}
            >
              {brand}
            </button>
          ))}
        </div>
      </section>

      {/* Toolbar */}
      <section className="max-w-7xl mx-auto px-4 mb-12">
        <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-[40px] p-8 flex flex-wrap items-center justify-between gap-8">
          <div className="flex items-center space-x-8 flex-wrap gap-y-4">
             <div className="flex items-center space-x-3">
               <span className="text-gray-600 font-black text-[10px] uppercase tracking-widest">Filter:</span>
               <div className="relative">
                 <select 
                    value={filterBrand}
                    onChange={(e) => setFilterBrand(e.target.value)}
                    className="appearance-none bg-black text-white border border-gray-800 rounded-2xl px-6 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-sm"
                  >
                   <option value="All">Select Brand</option>
                   {SUPERCAR_BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
                 </select>
                 <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
               </div>
             </div>
             
             <div className="flex items-center space-x-4">
                <span className="text-gray-600 font-black text-[10px] uppercase tracking-widest">Status:</span>
                <div className="flex space-x-2">
                   <div className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-full text-[10px] font-black uppercase border border-blue-500/20">Mint Box</div>
                   <div className="px-4 py-2 bg-green-500/10 text-green-400 rounded-full text-[10px] font-black uppercase border border-green-500/20">In Stock</div>
                </div>
             </div>
          </div>
          
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by model name (e.g. Skyline)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black border border-gray-800 rounded-full py-5 pl-14 pr-8 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium placeholder:text-gray-700"
            />
          </div>
        </div>
      </section>

      {/* Grid / List Display */}
      <main className="max-w-7xl mx-auto px-4">
        {filteredCars.length > 0 ? (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" 
            : "flex flex-col gap-6"
          }>
            {filteredCars.map(car => (
              <ProductCard key={car.id} product={car} viewMode={viewMode} />
            ))}
          </div>
        ) : (
          <div className="text-center py-40 border-2 border-dashed border-gray-800 rounded-[60px]">
            <div className="text-8xl mb-6 opacity-10">🏎️</div>
            <h3 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter">Garage Empty</h3>
            <p className="text-gray-500 text-lg">No models found in the "{filterBrand}" sub-category.</p>
            <button 
              onClick={() => { setFilterBrand('All'); setSearchQuery(''); }}
              className="mt-8 text-blue-500 font-black uppercase tracking-widest hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>

      {/* Bottom Info */}
      <section className="max-w-7xl mx-auto px-4 mt-20 pt-20 border-t border-gray-900">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex space-x-4">
             <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                <CheckCircle className="text-blue-500 w-6 h-6" />
             </div>
             <div>
                <h4 className="text-white font-black uppercase text-sm mb-2">Authenticated</h4>
                <p className="text-gray-500 text-xs">Direct partner with Mini GT & Majorette. Guaranteed original packaging.</p>
             </div>
          </div>
          <div className="flex space-x-4">
             <div className="w-12 h-12 bg-purple-600/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Filter className="text-purple-500 w-6 h-6" />
             </div>
             <div>
                <h4 className="text-white font-black uppercase text-sm mb-2">Hard to Find</h4>
                <p className="text-gray-500 text-xs">Access to Chase models and Limited Run items you won't find in stores.</p>
             </div>
          </div>
          <div className="flex space-x-4">
             <div className="w-12 h-12 bg-yellow-600/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Trophy className="text-yellow-500 w-6 h-6" />
             </div>
             <div>
                <h4 className="text-white font-black uppercase text-sm mb-2">Collector First</h4>
                <p className="text-gray-500 text-xs">Bubble wrapped like it's the real thing. No bent cards, ever.</p>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SupercarShop;
