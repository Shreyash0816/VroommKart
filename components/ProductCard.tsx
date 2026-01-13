
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
    <div className={`group relative rounded-[32px] overflow-hidden transition-all duration-500 hover:shadow-2xl flex ${
      isList ? 'flex-row' : 'flex-col h-full'
    } ${
      isSupercar ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100 shadow-sm'
    }`}>
      {/* Badges */}
      <div className={`absolute top-4 left-4 z-10 flex flex-col space-y-2 ${isList ? 'pointer-events-none' : ''}`}>
        {product.rarity && (
          <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider w-fit shadow-lg ${
            product.rarity === 'Limited' ? 'bg-red-500 text-white' :
            product.rarity === 'Rare' ? 'bg-yellow-400 text-gray-900' :
            'bg-blue-600 text-white'
          }`}>
            {product.rarity}
          </div>
        )}
      </div>

      {/* Image Container */}
      <div 
        className={`relative overflow-hidden cursor-pointer flex-shrink-0 ${
          isList ? 'w-48 sm:w-64 h-full' : 'h-64'
        }`}
        onClick={() => navigateTo(Page.ProductDetail, product)}
      >
        <img 
          src={product.images[0]} 
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${outOfStock ? 'grayscale opacity-50' : ''}`}
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
           <ZoomIn className="text-white w-10 h-10" />
        </div>
      </div>

      {/* Content */}
      <div className={`p-6 flex flex-col flex-1 ${isList ? 'justify-center' : ''}`}>
        <div className="flex justify-between items-start mb-2">
          <p className={`text-[10px] font-black uppercase tracking-widest ${isSupercar ? 'text-blue-400' : 'text-blue-600'}`}>
            {product.brand} {product.scale && `• ${product.scale}`}
          </p>
          <div className="flex items-center text-yellow-400">
            <Star className="w-3 h-3 fill-current" />
            <span className="ml-1 text-xs font-bold">{product.rating}</span>
          </div>
        </div>
        
        <h3 
          className={`font-bold mb-2 line-clamp-1 transition-colors cursor-pointer ${
            isList ? 'text-xl md:text-2xl' : 'text-lg'
          } ${isSupercar ? 'text-white group-hover:text-blue-400' : 'text-gray-900 group-hover:text-blue-600'}`}
          onClick={() => navigateTo(Page.ProductDetail, product)}
        >
          {product.name}
        </h3>

        {isList && (
          <p className="text-gray-400 text-sm mb-4 line-clamp-2 hidden sm:block max-w-lg">
            {product.description}
          </p>
        )}

        <div className={`flex flex-wrap items-center gap-3 mb-4 ${isList ? '' : 'hidden'}`}>
           {outOfStock ? (
             <span className="text-[10px] font-black uppercase text-red-500">Out of Stock</span>
           ) : lowStock ? (
             <span className="text-[10px] font-black uppercase text-yellow-500">Only {product.stock} Left</span>
           ) : (
             <span className="text-[10px] font-black uppercase text-green-500">In Stock</span>
           )}
        </div>

        <div className={`flex items-center justify-between ${isList ? 'mt-2' : 'mt-auto'}`}>
          <span className={`font-extrabold ${isList ? 'text-3xl' : 'text-2xl'} ${isSupercar ? 'text-white' : 'text-gray-900'}`}>
            ₹{product.price.toLocaleString()}
          </span>
          
          <div className="flex space-x-2">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                wishlisted ? removeFromWishlist(product.id) : addToWishlist(product);
              }}
              className={`p-3 rounded-2xl transition-all ${
                wishlisted ? 'bg-red-50 text-red-500' : 
                isSupercar ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Heart className={`w-5 h-5 ${wishlisted ? 'fill-current' : ''}`} />
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                if (!outOfStock) addToCart(product);
              }}
              disabled={outOfStock}
              className={`p-3 rounded-2xl transition-all shadow-lg ${
                outOfStock 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20 active:scale-90'
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
