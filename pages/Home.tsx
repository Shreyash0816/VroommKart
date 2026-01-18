
import React, { useMemo, useRef, useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Page, Product } from '../types';
import ProductCard from '../components/ProductCard';
import { ArrowRight, Trophy, Zap, Sparkles, Rocket, ChevronLeft, ChevronRight, ShieldCheck, Flame, Gauge, Box, Star, X, ShoppingCart, Info } from 'lucide-react';

const Home: React.FC = () => {
  const { navigateTo, products, siteConfig, addToCart } = useApp();
  const supercarScrollRef = useRef<HTMLDivElement>(null);
  const [activeBanner, setActiveBanner] = useState(0);

  useEffect(() => {
    if (!siteConfig.heroBanners || siteConfig.heroBanners.length === 0) return;
    const timer = setInterval(() => {
      setActiveBanner(prev => (prev + 1) % siteConfig.heroBanners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [siteConfig.heroBanners.length]);

  const collectorExclusives = useMemo(() => {
    return products.filter(p => p.category === 'Supercars' && (p.rarity === 'Limited' || p.rarity === 'Premium' || p.rarity === 'Rare'));
  }, [products]);

  const handleCategoryClick = (catName: string) => {
    if (catName === 'Supercars') navigateTo(Page.Supercars);
    else if (catName === 'Anime Figurines' || catName === 'Anime') navigateTo(Page.Anime);
    else navigateTo(Page.Toys);
  };

  return (
    <div className="w-full bg-[#fcfcfd] overflow-x-hidden">
      {/* Dynamic Hero Slider */}
      <section className="relative h-[80vh] md:h-screen w-full overflow-hidden bg-black">
        {siteConfig.heroBanners && siteConfig.heroBanners.map((banner, idx) => (
          <div 
            key={banner.id}
            className={`absolute inset-0 transition-all duration-[1500ms] ease-in-out ${activeBanner === idx ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-110 z-0'}`}
          >
            <img 
              src={banner.image || 'https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?auto=format&fit=crop&q=80&w=1200'} 
              className="absolute inset-0 w-full h-full object-cover opacity-60"
              alt={banner.title}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col items-center justify-center p-6 text-center">
              <span className="text-[var(--primary-blue)] font-black text-[10px] md:text-sm uppercase tracking-[0.4em] mb-4 animate-in fade-in slide-in-from-bottom-2 duration-700">
                {banner.subtitle}
              </span>
              <h1 className="text-5xl md:text-[9rem] font-montserrat font-black text-white leading-[0.85] tracking-tighter uppercase mb-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                {banner.title.split(' ')[0]}<br/>
                <span style={{ color: banner.accentColor }}>{banner.title.split(' ').slice(1).join(' ')}</span>
              </h1>
              <button 
                onClick={() => navigateTo(banner.linkTo)}
                className="px-12 md:px-20 py-5 md:py-7 rounded-full font-black uppercase tracking-widest text-[10px] md:text-xs text-white shadow-2xl transition-all hover:scale-105 active:scale-95 animate-in fade-in slide-in-from-bottom-6 duration-1000"
                style={{ backgroundColor: banner.accentColor }}
              >
                Explore Collection
              </button>
            </div>
          </div>
        ))}

        {/* Slider Controls */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-4">
          {siteConfig.heroBanners && siteConfig.heroBanners.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => setActiveBanner(idx)}
              className={`h-1.5 rounded-full transition-all duration-500 ${activeBanner === idx ? 'w-12 bg-white' : 'w-4 bg-white/30'}`}
            />
          ))}
        </div>
      </section>

      {/* Ticker */}
      <div className="ticker-wrap w-full z-20 relative bg-[var(--primary-blue)]">
        <div className="ticker flex items-center gap-8 md:gap-16">
          {[...Array(5)].map((_, i) => (
            siteConfig.tickerMessages && siteConfig.tickerMessages.map((msg, midx) => (
              <div key={`${i}-${midx}`} className="flex items-center gap-4 text-white font-black uppercase text-[8px] md:text-[10px] tracking-widest whitespace-nowrap">
                <Zap className="w-3 h-3 md:w-4 h-4 text-yellow-400 fill-current" />
                <span>{msg}</span>
              </div>
            ))
          ))}
        </div>
      </div>

      {/* Departments */}
      <section id="departments-section" className="py-16 md:py-32 max-w-7xl mx-auto px-4 md:px-6 w-full">
        <div className="flex flex-col items-center text-center mb-12 md:mb-32">
          <h2 className="text-4xl md:text-8xl font-montserrat font-black text-gray-900 uppercase tracking-tighter mb-2 md:mb-4 leading-none">START THE MISSION</h2>
          <div className="w-16 md:w-24 h-1.5 md:h-2 bg-[var(--primary-blue)] rounded-full mt-2 md:mt-4"></div>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 md:gap-10 w-full">
          {siteConfig.categories && siteConfig.categories.map((cat, idx) => (
            <div 
              key={cat.id}
              onClick={() => handleCategoryClick(cat.name)}
              className={`group relative cursor-pointer ${cat.bg} p-6 md:p-14 rounded-[2rem] md:rounded-[4rem] transition-all duration-500 md:hover:-translate-y-6 md:hover:rotate-2 shadow-2xl overflow-hidden reveal w-full flex flex-col items-center text-center`}
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              <div className="text-5xl md:text-8xl mb-6 md:mb-12 transition-transform duration-700 md:group-hover:scale-125 relative z-10">
                {cat.icon}
              </div>
              <h3 className={`font-montserrat font-black uppercase tracking-tighter text-[10px] md:text-xl ${cat.text} relative z-10`}>
                {cat.name}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* Collector's Corner */}
      <section className="py-16 md:py-32 bg-[#020617] relative overflow-hidden w-full">
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 md:mb-16 gap-6 text-center md:text-left">
            <div>
              <h2 className="text-3xl md:text-7xl font-montserrat font-black text-white uppercase tracking-tighter leading-none mb-3 md:mb-4">
                COLLECTOR'S <span className="text-[var(--primary-blue)]">CORNER</span>
              </h2>
            </div>
          </div>
          <div className="flex gap-4 md:gap-10 overflow-x-auto pb-6 no-scrollbar snap-x touch-pan-x">
            {collectorExclusives.map((product) => (
              <div key={product.id} className="min-w-[220px] md:min-w-[340px] max-w-[260px] md:max-w-[380px] snap-center">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spotlight Drop - Now positioned at the very bottom before Footer */}
      <section className="py-20 md:py-40 bg-white w-full border-t border-gray-50">
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
               <div className="relative group">
                  <div className="absolute -inset-10 bg-blue-600/5 blur-[120px] rounded-full group-hover:bg-blue-600/10 transition-all"></div>
                  <img src={siteConfig.spotlightImage || 'https://images.unsplash.com/photo-1594731804116-64601132649f?auto=format&fit=crop&q=80&w=1200'} className="relative z-10 w-full rounded-[4rem] shadow-2xl transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute top-10 right-10 z-20 bg-white p-6 rounded-[2.5rem] shadow-xl border border-gray-100 text-center flex flex-col gap-1 animate-bounce">
                     <span className="text-[10px] font-black uppercase text-blue-600 tracking-widest">Collector Rating</span>
                     <span className="text-3xl font-black text-gray-900 tracking-tighter">{siteConfig.spotlightRarity}</span>
                  </div>
               </div>
               <div className="space-y-10">
                  <div className="flex items-center gap-3">
                     <div className="w-1.5 h-8 bg-blue-600 rounded-full"></div>
                     <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">Spotlight Drop</span>
                  </div>
                  <h2 className="text-4xl md:text-8xl font-montserrat font-black uppercase tracking-tighter leading-[0.85] text-gray-900">
                    {siteConfig.spotlightTitle}
                  </h2>
                  <p className="text-gray-500 font-medium text-lg md:text-2xl leading-relaxed">
                    {siteConfig.spotlightDesc}
                  </p>
                  <button onClick={() => navigateTo(Page.Supercars)} className="bg-gray-950 text-white px-16 py-7 rounded-full font-black uppercase tracking-widest text-xs flex items-center gap-4 hover:bg-blue-600 transition-all shadow-xl active:scale-95">
                    Secure Yours Now <ArrowRight className="w-5 h-5" />
                  </button>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default Home;
