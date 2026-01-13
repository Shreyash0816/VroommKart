
import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Page } from '../types';
import ProductCard from '../components/ProductCard';
import { ArrowRight, Trophy, Zap, ShieldCheck, Heart, Sparkles } from 'lucide-react';

const CATEGORY_ICONS: Record<string, string> = {
  'Supercars': '🏎️',
  'Toys': '🧸',
  'Anime Figurines': '🎎',
  'Baby Care': '🍼',
  'Books': '📚',
  'Art & Craft': '🎨'
};

const CATEGORY_TAGLINES: Record<string, string> = {
  'Supercars': "Collector's Pride",
  'Toys': "Unleash the Joy",
  'Anime Figurines': "Otaku Haven",
  'Baby Care': "Gentle Care",
  'Books': "Infinite Worlds",
  'Art & Craft': "Creative Minds"
};

const Home: React.FC = () => {
  const { navigateTo, products } = useApp();

  const dynamicCategories = useMemo(() => {
    const uniqueNames: string[] = Array.from(new Set(products.map(p => p.category)));
    return uniqueNames.map(name => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name: name,
      icon: CATEGORY_ICONS[name] || '🎁',
      tagline: CATEGORY_TAGLINES[name] || 'New Arrivals'
    }));
  }, [products]);

  const handleCategoryClick = (catName: string) => {
    if (catName === 'Supercars') {
      navigateTo(Page.Supercars);
    } else if (catName === 'Toys') {
      navigateTo(Page.Toys);
    } else if (catName === 'Anime Figurines') {
      navigateTo(Page.Anime);
    } else {
      navigateTo(Page.Toys);
    }
  };

  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero Section - Optimized Mobile Stacking */}
      <section className="relative h-[100vh] md:h-[90vh] flex flex-col md:flex-row overflow-hidden bg-gray-100">
        <div className="flex-1 relative group cursor-pointer overflow-hidden bg-yellow-400" onClick={() => navigateTo(Page.Toys)}>
          <img 
            src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=1200" 
            alt="Toys"
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-yellow-700/80 via-transparent to-transparent flex flex-col items-center justify-center p-6 text-center">
            <h2 className="text-2xl md:text-6xl font-montserrat font-black text-white drop-shadow-lg mb-1">PLAYFUL TOYS</h2>
            <p className="text-white font-bold text-xs md:text-lg mb-4">Discovery and Joy</p>
            <button className="bg-white text-yellow-600 px-5 py-2 md:px-8 md:py-3 rounded-full font-bold text-[10px] md:text-sm uppercase tracking-wider">Shop Toys</button>
          </div>
        </div>

        <div className="flex-1 relative group cursor-pointer overflow-hidden bg-gray-900" onClick={() => navigateTo(Page.Supercars)}>
          <img 
            src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=1200" 
            alt="Supercars"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-transparent to-transparent flex flex-col items-center justify-center p-6 text-center">
            <h2 className="text-2xl md:text-6xl font-montserrat font-black text-white drop-shadow-lg mb-1 uppercase leading-tight">Supercar Garage</h2>
            <p className="text-white font-bold text-xs md:text-lg mb-4">1:64 Scale Legends</p>
            <button className="bg-blue-600 text-white px-5 py-2 md:px-8 md:py-3 rounded-full font-bold text-[10px] md:text-sm uppercase tracking-wider">View Garage</button>
          </div>
        </div>

        {/* Center Badge - Small for Mobile */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex w-32 h-32 bg-white rounded-full items-center justify-center z-10 border-4 border-gray-50 shadow-2xl">
          <div className="text-center">
            <p className="text-xs font-black text-blue-600 tracking-tighter">V-KART</p>
          </div>
        </div>
      </section>

      {/* Categories - 2 Columns on Mobile */}
      <section id="departments-section" className="py-10 md:py-20 max-w-7xl mx-auto px-4 md:px-6">
        <div className="mb-6 md:mb-12">
          <h2 className="text-xl md:text-3xl font-montserrat font-extrabold text-gray-900 uppercase tracking-tighter">Departments</h2>
          <div className="h-1 w-12 bg-blue-600 mt-1 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-6">
          {dynamicCategories.map((cat) => (
            <div 
              key={cat.id}
              onClick={() => handleCategoryClick(cat.name)}
              className="group cursor-pointer bg-white p-6 rounded-2xl md:rounded-[40px] border border-gray-100 shadow-sm hover:shadow-lg transition-all text-center"
            >
              <div className="text-3xl md:text-5xl mb-2 transition-transform group-hover:scale-110">
                {cat.icon}
              </div>
              <h3 className="font-black text-gray-900 text-[10px] md:text-sm uppercase tracking-tighter">
                {cat.name}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* Hot Drop - 2 Columns on Mobile */}
      <section className="py-10 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
           <div className="flex justify-between items-center mb-6 md:mb-12">
            <div>
              <div className="flex items-center space-x-1 text-red-500 mb-0.5">
                <Sparkles className="w-3 h-3" />
                <span className="uppercase tracking-widest font-black text-[8px]">New Drop</span>
              </div>
              <h2 className="text-xl md:text-4xl font-montserrat font-extrabold text-gray-900 uppercase tracking-tighter leading-none">ANIME WORLD</h2>
            </div>
            <button 
              onClick={() => navigateTo(Page.Anime)}
              className="text-red-500 font-bold text-[10px] uppercase tracking-widest flex items-center gap-1"
            >
              View All <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
            {products.filter(p => p.category === 'Anime Figurines').slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Collector's Corner - 2 Columns on Mobile */}
      <section className="py-10 md:py-20 bg-gray-950 text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center mb-6 md:mb-12">
            <div>
              <div className="flex items-center space-x-1 text-blue-400 mb-0.5">
                <Trophy className="w-3 h-3" />
                <span className="uppercase tracking-widest font-black text-[8px]">Premium</span>
              </div>
              <h2 className="text-xl md:text-4xl font-montserrat font-extrabold uppercase tracking-tighter leading-none">GARAGE RELEASES</h2>
            </div>
            <button 
              onClick={() => navigateTo(Page.Supercars)}
              className="text-blue-400 font-bold text-[10px] uppercase tracking-widest flex items-center gap-1"
            >
              Garage <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-8">
            {products.filter(p => p.category === 'Supercars').slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Simple Newsletter */}
      <section className="py-12 md:py-24 bg-blue-600 px-6">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-montserrat font-black text-white mb-2 uppercase tracking-tighter">JOIN THE SQUAD</h2>
          <p className="text-blue-100 text-xs md:text-lg mb-6">Get early access to weekly rare diecast drops.</p>
          <div className="flex flex-col gap-3">
            <input 
              type="email" 
              placeholder="Email address" 
              className="w-full px-5 py-3 rounded-full bg-white text-gray-900 focus:outline-none text-sm"
            />
            <button className="w-full bg-gray-900 text-white px-6 py-3 rounded-full font-black uppercase tracking-widest text-[11px] shadow-lg">Join Now</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
