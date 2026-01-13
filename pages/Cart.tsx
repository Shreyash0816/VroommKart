
import React from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingBag, Trash2, ArrowRight, Minus, Plus, CreditCard, ShieldCheck, Car } from 'lucide-react';
import { Page } from '../types';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateCartQuantity, navigateTo } = useApp();

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 1999 ? 0 : 99;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6">
        <div className="bg-blue-100 p-6 md:p-8 rounded-full mb-6 md:mb-8">
          <ShoppingBag className="w-12 h-12 md:w-16 md:h-16 text-blue-600" />
        </div>
        <h2 className="text-2xl md:text-3xl font-montserrat font-black text-gray-900 mb-4 uppercase tracking-tighter text-center">Your garage is empty!</h2>
        <p className="text-gray-500 mb-8 text-center max-w-sm text-sm">Looks like you haven't added any toys or supercars to your cart yet. Let's find some speed!</p>
        <button 
          onClick={() => navigateTo(Page.Home)}
          className="bg-blue-600 text-white px-8 md:px-10 py-3 md:py-4 rounded-full font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 text-sm"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 md:py-12 pb-32 md:pb-12">
      <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
        {/* List */}
        <div className="flex-[2]">
          <div className="flex items-center justify-between mb-6 md:mb-10">
            <h1 className="text-3xl md:text-4xl font-montserrat font-black uppercase tracking-tighter">My Cart</h1>
            <span className="bg-gray-100 px-4 py-1.5 md:px-6 md:py-2 rounded-full font-black text-[10px] md:text-xs text-gray-600">{cart.length} ITEMS</span>
          </div>

          <div className="space-y-4 md:space-y-6">
            {cart.map(item => (
              <div key={item.id} className="bg-white border border-gray-100 rounded-3xl md:rounded-[40px] p-4 md:p-8 flex items-center gap-4 md:gap-8 shadow-sm hover:shadow-lg transition-all group">
                <div 
                  className="w-24 h-24 md:w-40 md:h-40 rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer flex-shrink-0 bg-gray-50 border border-gray-100"
                  onClick={() => navigateTo(Page.ProductDetail, item)}
                >
                  <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1 md:mb-2">
                    <div className="min-w-0">
                      <p className="text-blue-600 font-black text-[8px] md:text-[10px] uppercase tracking-widest mb-0.5">{item.brand}</p>
                      <h3 className="font-black text-sm md:text-2xl hover:text-blue-600 cursor-pointer tracking-tight truncate" onClick={() => navigateTo(Page.ProductDetail, item)}>{item.name}</h3>
                      {item.scale && <p className="text-gray-400 font-bold text-[8px] md:text-xs mt-0.5 uppercase tracking-widest">Scale: {item.scale}</p>}
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-500 p-2 md:p-3 bg-gray-50 rounded-xl transition-all flex-shrink-0">
                      <Trash2 className="w-4 h-4 md:w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-3 md:mt-8">
                    <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-100">
                      <button onClick={() => updateCartQuantity(item.id, -1)} className="p-1.5 md:p-2 hover:bg-white rounded-lg transition-all"><Minus className="w-3 h-3 md:w-4 h-4" /></button>
                      <span className="w-8 md:w-12 text-center font-black text-sm md:text-lg">{item.quantity}</span>
                      <button onClick={() => updateCartQuantity(item.id, 1)} className="p-1.5 md:p-2 hover:bg-white rounded-lg transition-all"><Plus className="w-3 h-3 md:w-4 h-4" /></button>
                    </div>
                    <span className="text-lg md:text-3xl font-black tracking-tighter">₹{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Summary */}
        <div className="flex-1">
          <div className="bg-white border border-gray-100 rounded-3xl md:rounded-[40px] p-6 md:p-10 shadow-xl border-t-8 border-t-blue-600">
            <h2 className="text-xl md:text-2xl font-montserrat font-black mb-6 md:mb-10 uppercase tracking-tighter">Summary</h2>
            
            <div className="space-y-4 md:space-y-6 mb-8 md:mb-10">
              <div className="flex justify-between text-gray-500 font-bold text-xs md:text-sm">
                <span>Subtotal</span>
                <span className="text-gray-900 font-black">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-500 font-bold text-xs md:text-sm">
                <span>Shipping</span>
                <span className="text-green-600 font-black">{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
              </div>
              <div className="border-t border-gray-100 pt-4 md:pt-6 mt-4 md:mt-6 flex justify-between items-end">
                <span className="text-sm md:text-lg font-black uppercase tracking-widest text-gray-400">Total</span>
                <span className="text-2xl md:text-4xl font-black text-blue-600 tracking-tighter">₹{total.toLocaleString()}</span>
              </div>
            </div>

            <button 
              onClick={() => navigateTo(Page.Checkout)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 md:py-6 rounded-full font-black uppercase tracking-widest md:tracking-[0.2em] flex items-center justify-center space-x-2 md:space-x-3 transform transition-all active:scale-95 shadow-xl shadow-blue-500/30 group text-sm md:text-base"
            >
              <CreditCard className="w-5 h-5 md:w-6 h-6" />
              <span>Checkout Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
