
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

  // Dynamically derive categories from the actual product data
  // Explicitly typing uniqueNames as string[] to prevent 'unknown' type inference errors in the map function
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
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex flex-col md:flex-row overflow-hidden">
        <div className="flex-1 relative group cursor-pointer overflow-hidden bg-yellow-400" onClick={() => navigateTo(Page.Toys)}>
          <img 
            src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=1200" 
            alt="Toys"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-yellow-600/80 via-transparent to-transparent flex flex-col items-center justify-center p-8 text-center">
            <h2 className="text-4xl md:text-6xl font-montserrat font-black text-white drop-shadow-lg mb-4">PLAYFUL TOYS</h2>
            <p className="text-white font-bold text-lg mb-6">Discovery and Joy in Every Box</p>
            <button className="bg-white text-yellow-600 px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform shadow-xl">Shop Toys</button>
          </div>
        </div>

        <div className="flex-1 relative group cursor-pointer overflow-hidden bg-gray-900" onClick={() => navigateTo(Page.Supercars)}>
          <img 
            src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=1200" 
            alt="Supercars"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-transparent flex flex-col items-center justify-center p-8 text-center">
            <h2 className="text-4xl md:text-6xl font-montserrat font-black text-white drop-shadow-lg mb-4 uppercase">Supercar Garage</h2>
            <p className="text-white font-bold text-lg mb-6">Collectors' Paradise • 1:64 Legends</p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform shadow-xl">Explore Collection</button>
          </div>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex w-40 h-40 bg-white rounded-full items-center justify-center z-10 border-8 border-gray-50 shadow-2xl scale-75 hover:scale-100 transition-transform">
          <div className="text-center">
            <p className="text-xs font-black text-gray-400">EST. 2024</p>
            <p className="text-2xl font-black text-blue-600">V-KART</p>
            <p className="text-[10px] font-bold text-gray-500">SPEED & FUN</p>
          </div>
        </div>
      </section>

      {/* Dynamic Categories Section */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="flex flex-col mb-12">
          <h2 className="text-3xl font-montserrat font-extrabold text-gray-900">Browse by Department</h2>
          <div className="h-1.5 w-20 bg-blue-600 mt-2 rounded-full"></div>
          <p className="text-gray-500 mt-4 font-medium">Auto-updated from our current inventory.</p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {dynamicCategories.map((cat) => (
            <div 
              key={cat.id}
              onClick={() => handleCategoryClick(cat.name)}
              className="group cursor-pointer bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-2xl hover:border-blue-200 hover:-translate-y-2 transition-all duration-500 text-center"
            >
              <div className="text-5xl mb-4 group-hover:scale-125 transition-transform duration-500 drop-shadow-md">
                {cat.icon}
              </div>
              <h3 className="font-black text-gray-900 mb-1 text-sm uppercase tracking-tighter">
                {cat.name}
              </h3>
              <p className="text-[10px] text-blue-500 font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                {cat.tagline}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* New Arrivals: Anime & Hobbies */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
           <div className="flex justify-between items-center mb-12">
            <div>
              <div className="flex items-center space-x-2 text-red-500 mb-2">
                <Sparkles className="w-5 h-5" />
                <span className="uppercase tracking-[0.2em] font-black text-xs">Hot Drop</span>
              </div>
              <h2 className="text-4xl font-montserrat font-extrabold text-gray-900 uppercase tracking-tighter">ANIME & HOBBY HQ</h2>
            </div>
            <button 
              onClick={() => navigateTo(Page.Anime)}
              className="flex items-center space-x-2 text-red-500 hover:text-red-700 transition-colors group"
            >
              <span className="font-bold">View Figures</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {products.filter(p => p.category === 'Anime Figurines').slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured: Collector's Corner */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <div className="flex items-center space-x-2 text-blue-400 mb-2">
                <Trophy className="w-5 h-5" />
                <span className="uppercase tracking-[0.2em] font-black text-xs">Premium Collection</span>
              </div>
              <h2 className="text-4xl font-montserrat font-extrabold">COLLECTOR'S CORNER</h2>
            </div>
            <button 
              onClick={() => navigateTo(Page.Supercars)}
              className="flex items-center space-x-2 text-blue-400 hover:text-white transition-colors group"
            >
              <span className="font-bold">View All 1:64 Models</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.filter(p => p.category === 'Supercars').slice(0, 3).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Row */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
              <Zap className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-xl mb-2">Flash Delivery</h3>
            <p className="text-gray-500">Fast shipping across India. Get your toys and cars in no time!</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-yellow-50 text-yellow-600 rounded-2xl flex items-center justify-center mb-4">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-xl mb-2">100% Authentic</h3>
            <p className="text-gray-500">Official Hot Wheels, Mini GT, and Majorette partner. Guaranteed genuine.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-4">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-xl mb-2">Collector Care</h3>
            <p className="text-gray-500">Mint condition packaging. We bubble wrap like it's a real supercar.</p>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-montserrat font-black text-white mb-6">JOIN THE VROOMM SQUAD</h2>
          <p className="text-blue-100 text-lg mb-10">Get early access to weekly rare diecast drops and exclusive toy sales!</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-6 py-4 rounded-full bg-white text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-400"
            />
            <button className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-full font-black uppercase tracking-wider hover:bg-white transition-colors">Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
