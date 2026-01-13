
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
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <div className="bg-blue-100 p-8 rounded-full mb-8">
          <ShoppingBag className="w-16 h-16 text-blue-600" />
        </div>
        <h2 className="text-3xl font-montserrat font-black text-gray-900 mb-4 uppercase tracking-tighter">Your garage is empty!</h2>
        <p className="text-gray-500 mb-8 text-center max-w-sm">Looks like you haven't added any toys or supercars to your cart yet. Let's find some speed!</p>
        <button 
          onClick={() => navigateTo(Page.Home)}
          className="bg-blue-600 text-white px-10 py-4 rounded-full font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* List */}
        <div className="flex-[2]">
          <div className="flex items-center justify-between mb-10">
            <h1 className="text-4xl font-montserrat font-black uppercase tracking-tighter">Shopping Cart</h1>
            <span className="bg-gray-100 px-6 py-2 rounded-full font-black text-xs text-gray-600">{cart.length} ITEMS</span>
          </div>

          <div className="space-y-6">
            {cart.map(item => (
              <div key={item.id} className="bg-white border border-gray-100 rounded-[40px] p-8 flex flex-col sm:flex-row items-center gap-8 shadow-sm hover:shadow-xl transition-all group">
                <div 
                  className="w-40 h-40 rounded-3xl overflow-hidden cursor-pointer flex-shrink-0 bg-gray-50 border border-gray-100"
                  onClick={() => navigateTo(Page.ProductDetail, item)}
                >
                  {/* Fixed: Property 'image' does not exist on type 'CartItem'. Using item.images[0] instead. */}
                  <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex-1 w-full">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-blue-600 font-black text-[10px] uppercase tracking-widest mb-1">{item.brand}</p>
                      <h3 className="font-black text-2xl hover:text-blue-600 cursor-pointer tracking-tight" onClick={() => navigateTo(Page.ProductDetail, item)}>{item.name}</h3>
                      {item.scale && <p className="text-gray-400 font-bold text-xs mt-1 uppercase tracking-widest">Scale: {item.scale}</p>}
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-500 p-3 bg-gray-50 rounded-2xl transition-all">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-8">
                    <div className="flex items-center bg-gray-100 rounded-2xl p-1.5 border border-gray-200">
                      <button onClick={() => updateCartQuantity(item.id, -1)} className="p-2 hover:bg-white rounded-xl transition-all"><Minus className="w-4 h-4" /></button>
                      <span className="w-12 text-center font-black text-lg">{item.quantity}</span>
                      <button onClick={() => updateCartQuantity(item.id, 1)} className="p-2 hover:bg-white rounded-xl transition-all"><Plus className="w-4 h-4" /></button>
                    </div>
                    <span className="text-3xl font-black tracking-tighter">₹{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Summary */}
        <div className="flex-1">
          <div className="bg-white border border-gray-100 rounded-[40px] p-10 shadow-2xl sticky top-28 border-t-8 border-t-blue-600">
            <h2 className="text-2xl font-montserrat font-black mb-10 uppercase tracking-tighter">Summary</h2>
            
            <div className="space-y-6 mb-10">
              <div className="flex justify-between text-gray-500 font-bold text-sm">
                <span>Subtotal</span>
                <span className="text-gray-900 font-black">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-500 font-bold text-sm">
                <span>Shipping</span>
                <span className="text-green-600 font-black">{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
              </div>
              <div className="border-t border-gray-100 pt-6 mt-6 flex justify-between items-end">
                <span className="text-lg font-black uppercase tracking-widest text-gray-400">Total</span>
                <span className="text-4xl font-black text-blue-600 tracking-tighter">₹{total.toLocaleString()}</span>
              </div>
            </div>

            <div className="bg-blue-50 rounded-3xl p-6 mb-10 relative overflow-hidden group">
              <Car className="absolute -right-4 -bottom-4 w-16 h-16 text-blue-100 group-hover:translate-x-4 transition-transform duration-500" />
              <div className="flex items-center space-x-2 mb-2 relative z-10">
                 <ShieldCheck className="w-5 h-5 text-blue-600" />
                 <span className="text-xs font-black uppercase tracking-widest text-blue-800">Secure Vault</span>
              </div>
              <p className="text-[10px] text-blue-900/60 font-medium leading-relaxed relative z-10">Your collection deserves the best security. Encrypted checkout with 256-bit protection.</p>
            </div>

            <button 
              onClick={() => navigateTo(Page.Checkout)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-full font-black uppercase tracking-[0.2em] flex items-center justify-center space-x-3 transform transition-all active:scale-95 shadow-2xl shadow-blue-500/40 group"
            >
              <CreditCard className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              <span>Checkout Now</span>
            </button>

            <div className="mt-8 flex justify-center space-x-4 opacity-30 grayscale hover:grayscale-0 transition-all">
               <div className="w-10 h-6 bg-gray-400 rounded-md"></div>
               <div className="w-10 h-6 bg-gray-400 rounded-md"></div>
               <div className="w-10 h-6 bg-gray-400 rounded-md"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
