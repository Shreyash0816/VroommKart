
import React from 'react';
import { ShoppingCart, Heart, Star, ZoomIn } from 'lucide-react';
import { Product, Page } from '../types';
import { useApp } from '../context/AppContext';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode = 'grid' }) => {
  const { addToCart, addToWishlist, removeFromWishlist, isWishlisted, navigateTo } = useApp();
  const wishlisted = isWishlisted(product.id);

  const isSupercar = product.category === 'Supercars';
  const outOfStock = product.stock === 0;
  const lowStock = product.stock > 0 && product.stock <= 5;
  const isList = viewMode === 'list';

  return (
    <div className={`group relative rounded-xl md:rounded-[32px] overflow-hidden transition-all duration-300 hover:shadow-xl flex ${
      isList ? 'flex-row w-full' : 'flex-col h-full'
    } ${
      isSupercar ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100 shadow-sm'
    }`}>
      {/* Badges - Mini on Mobile */}
      <div className="absolute top-2 left-2 md:top-4 md:left-4 z-10 flex flex-col space-y-1">
        {product.rarity && (
          <div className={`px-1.5 py-0.5 md:px-3 md:py-1 rounded-md text-[7px] md:text-[10px] font-black uppercase tracking-wider w-fit shadow-md ${
            product.rarity === 'Limited' ? 'bg-red-500 text-white' :
            product.rarity === 'Rare' ? 'bg-yellow-400 text-gray-900' :
            'bg-blue-600 text-white'
          }`}>
            {product.rarity}
          </div>
        )}
      </div>

      {/* Image Container - Fixed Aspect Ratio */}
      <div 
        className={`relative overflow-hidden cursor-pointer flex-shrink-0 ${
          isList ? 'w-24 sm:w-64 h-full' : 'aspect-[4/3] md:h-64'
        }`}
        onClick={() => navigateTo(Page.ProductDetail, product)}
      >
        <img 
          src={product.images[0]} 
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${outOfStock ? 'grayscale opacity-50' : ''}`}
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center transition-opacity">
           <ZoomIn className="text-white w-8 h-8" />
        </div>
      </div>

      {/* Content - Compact for Mobile */}
      <div className={`p-2.5 md:p-6 flex flex-col flex-1 ${isList ? 'justify-center ml-2' : ''}`}>
        <div className="flex justify-between items-start mb-1">
          <p className={`text-[7px] md:text-[10px] font-black uppercase tracking-widest truncate max-w-[70%] ${isSupercar ? 'text-blue-400' : 'text-blue-600'}`}>
            {product.brand}
          </p>
          <div className="flex items-center text-yellow-400">
            <Star className="w-2 h-2 md:w-3 h-3 fill-current" />
            <span className="ml-0.5 text-[8px] md:text-xs font-bold">{product.rating}</span>
          </div>
        </div>
        
        <h3 
          className={`font-bold leading-tight mb-1.5 line-clamp-2 transition-colors cursor-pointer ${
            isList ? 'text-sm md:text-2xl' : 'text-[11px] md:text-lg'
          } ${isSupercar ? 'text-white group-hover:text-blue-400' : 'text-gray-900 group-hover:text-blue-600'}`}
          onClick={() => navigateTo(Page.ProductDetail, product)}
        >
          {product.name}
        </h3>

        {/* Pricing & Actions */}
        <div className={`flex items-center justify-between mt-auto pt-1`}>
          <span className={`font-black tracking-tight ${isList ? 'text-sm md:text-3xl' : 'text-[13px] md:text-2xl'} ${isSupercar ? 'text-white' : 'text-gray-900'}`}>
            ₹{product.price.toLocaleString()}
          </span>
          
          <div className="flex space-x-1">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                if (!outOfStock) addToCart(product);
              }}
              disabled={outOfStock}
              className={`p-1.5 md:p-3 rounded-lg md:rounded-2xl transition-all ${
                outOfStock 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 text-white active:scale-90 shadow-lg shadow-blue-500/10'
              }`}
            >
              <ShoppingCart className="w-3 h-3 md:w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
