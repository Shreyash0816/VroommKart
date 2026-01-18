
import React from 'react';
import { ShoppingCart, Heart, Zap, ArrowUpRight, Flame, Eye } from 'lucide-react';
import { Product, Page } from '../types';
import { useApp } from '../context/AppContext';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
  onQuickView?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode = 'grid', onQuickView }) => {
  const { addToCart, navigateTo, isWishlisted, addToWishlist, removeFromWishlist } = useApp();

  const isSupercar = product.category === 'Supercars';
  const isAnime = product.category === 'Anime Figurines';
  const outOfStock = product.stock === 0;
  const isList = viewMode === 'list';
  const wishlisted = isWishlisted(product.id);
  const lowStock = product.stock > 0 && product.stock <= 5;

  const toggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (wishlisted) removeFromWishlist(product.id);
    else addToWishlist(product);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!outOfStock) {
      addToCart(product);
    }
  };

  return (
    <div className={`group relative rounded-[1.8rem] md:rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:-translate-y-1 flex flex-col h-full border ${
      isSupercar 
        ? 'bg-[#0f172a] border-white/5 shadow-xl' 
        : 'bg-white border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_45px_rgba(0,0,0,0.08)]'
    } ${isList ? 'flex-row w-full' : 'flex-col'}`}>
      
      <div 
        className={`relative overflow-hidden cursor-pointer bg-gray-50 flex items-center justify-center ${
          isList ? 'w-32 sm:w-64 h-full' : 'aspect-square'
        }`}
        onClick={() => navigateTo(Page.ProductDetail, product)}
      >
        {/* Status Badges - Scaled for mobile */}
        <div className="absolute top-2 left-2 md:top-4 md:left-4 z-20 flex flex-col gap-1">
          {product.rarity && (
            <div className={`px-2 py-0.5 md:px-4 md:py-1.5 rounded-full text-[7px] md:text-[9px] font-black uppercase tracking-wider shadow-lg flex items-center gap-1 ${
              product.rarity === 'Limited' ? 'bg-red-600 text-white animate-pulse' :
              product.rarity === 'Rare' ? 'bg-yellow-400 text-gray-900' :
              'bg-blue-600 text-white'
            }`}>
              {product.rarity}
            </div>
          )}
          {lowStock && (
            <div className="bg-orange-500 text-white px-2 py-0.5 md:px-4 md:py-1.5 rounded-full text-[6px] md:text-[8px] font-black uppercase tracking-wider flex items-center gap-1 shadow-md">
               <Flame className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 fill-current" />
               <span className="hidden xs:inline">Only {product.stock} Left</span>
               <span className="xs:hidden">{product.stock} Left</span>
            </div>
          )}
        </div>

        {/* Action buttons - Better layout for touch */}
        <div className="absolute inset-0 bg-black/5 opacity-0 md:group-hover:opacity-100 transition-opacity z-10 hidden md:flex items-center justify-center gap-3">
          <button 
            onClick={toggleWishlist}
            className={`p-4 rounded-full transition-all hover:scale-110 active:scale-90 shadow-xl ${
              wishlisted ? 'bg-red-500 text-white' : 'bg-white text-gray-900'
            }`}
          >
            <Heart className={`w-5 h-5 ${wishlisted ? 'fill-current' : ''}`} />
          </button>
          
          {onQuickView && (
            <button 
              onClick={(e) => { e.stopPropagation(); onQuickView(product); }}
              className="p-4 rounded-full bg-white text-gray-900 shadow-xl hover:scale-110 active:scale-90"
            >
              <Eye className="w-5 h-5" />
            </button>
          )}

          <button 
            onClick={() => navigateTo(Page.ProductDetail, product)}
            className="p-4 rounded-full bg-blue-600 text-white shadow-xl hover:scale-110 active:scale-90"
          >
            <ArrowUpRight className="w-5 h-5" />
          </button>
        </div>

        <img 
          src={product.images[0]} 
          alt={product.name}
          className={`w-full h-full object-contain p-4 md:p-8 transition-transform duration-700 md:group-hover:scale-110 ${outOfStock ? 'grayscale opacity-30' : ''}`}
        />

        {outOfStock && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-20 flex items-center justify-center">
             <div className="bg-red-600 text-white px-4 py-1.5 md:px-6 md:py-2 rounded-full text-[9px] md:text-[11px] font-black uppercase tracking-widest -rotate-6 shadow-xl">
               Sold Out
             </div>
          </div>
        )}
      </div>

      <div className="p-4 md:p-8 flex flex-col flex-1">
        <div className="mb-2 md:mb-4">
          <span className={`text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] mb-1 block ${
            isSupercar ? 'text-blue-400' : isAnime ? 'text-pink-500' : 'text-blue-600'
          }`}>
            {product.brand}
          </span>
          <h3 
            className={`font-outfit font-bold leading-tight line-clamp-2 transition-colors cursor-pointer text-xs md:text-lg ${
              isSupercar ? 'text-white md:group-hover:text-blue-400' : 'text-gray-800 md:group-hover:text-blue-600'
            }`}
            onClick={() => navigateTo(Page.ProductDetail, product)}
          >
            {product.name}
          </h3>
        </div>

        <div className="flex items-center justify-between mt-auto pt-3 md:pt-6 border-t border-gray-100/10">
          <div className="flex flex-col">
            <span className={`text-base md:text-2xl font-montserrat font-black tracking-tighter ${
              isSupercar ? 'text-white' : 'text-gray-900'
            }`}>
              ₹{product.price.toLocaleString()}
            </span>
          </div>
          
          <button 
            onClick={handleAddToCart}
            disabled={outOfStock}
            className={`p-3 md:p-4 rounded-xl md:rounded-2xl transition-all duration-300 active:scale-90 ${
              outOfStock 
              ? 'bg-gray-100 text-gray-300 cursor-not-allowed' 
              : isSupercar 
                ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-md' 
                : 'bg-yellow-400 text-gray-900 hover:bg-yellow-500 shadow-md'
            }`}
          >
            <ShoppingCart className="w-4 h-4 md:w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
