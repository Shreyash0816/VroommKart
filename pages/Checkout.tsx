
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Page } from '../types';
import { MapPin, CreditCard, CheckCircle, ArrowRight, ArrowLeft, Truck, ShieldCheck, Car, Smartphone, QrCode } from 'lucide-react';

const Checkout: React.FC = () => {
  const { cart, navigateTo, placeOrder, clearCart } = useApp();
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [shippingData, setShippingData] = useState({ name: '', email: '', phone: '', address: '' });

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 1999 ? 0 : 99;
  const total = subtotal + shipping;

  const handleShippingSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setShippingData({
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      address: formData.get('address') as string,
    });
    setStep(2);
  };

  const handleFinalizeOrder = () => {
    placeOrder({
      customerName: shippingData.name,
      email: shippingData.email,
      phone: shippingData.phone,
      address: shippingData.address,
      items: [...cart],
      total: total,
      paymentMethod: paymentMethod
    });
    clearCart();
    setStep(3);
  };

  const handleBack = () => setStep(prev => prev - 1);

  if (step === 3) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center animate-in fade-in duration-700">
        <div className="relative mb-8">
           <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto animate-bounce">
             <CheckCircle className="w-12 h-12 text-green-600" />
           </div>
           <Car className="absolute -bottom-2 -right-10 w-12 h-12 text-blue-600 animate-pulse transition-all" />
        </div>
        <h1 className="text-4xl font-montserrat font-black text-gray-900 mb-4 uppercase tracking-tighter">Order Confirmed!</h1>
        <p className="text-gray-500 max-w-sm mb-10">We've received your order! It's currently being carefully packed. Fast delivery on its way! 🏎️💨</p>
        <button 
          onClick={() => navigateTo(Page.Home)}
          className="bg-blue-600 text-white px-10 py-4 rounded-full font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 flex items-center space-x-2"
        >
          <span>Return to Garage</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Progress Bar */}
      <div className="max-w-2xl mx-auto mb-16 relative">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 rounded-full"></div>
        <div 
          className="absolute top-1/2 left-0 h-1 bg-blue-600 -translate-y-1/2 rounded-full transition-all duration-500"
          style={{ width: `${step === 1 ? '33' : '100'}%` }}
        ></div>
        <div className="relative flex justify-between">
          <StepIcon icon={<Truck />} label="Shipping" active={step >= 1} current={step === 1} />
          <StepIcon icon={<CreditCard />} label="Payment" active={step >= 2} current={step === 2} />
          <StepIcon icon={<CheckCircle />} label="Done" active={step >= 3} current={step === 3} />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-[2] bg-white border border-gray-100 p-8 rounded-[40px] shadow-xl">
          {step === 1 && (
            <div className="animate-in slide-in-from-left-5 duration-300">
              <h2 className="text-2xl font-montserrat font-black mb-8 flex items-center space-x-2">
                <MapPin className="text-blue-600" />
                <span>Shipping Details</span>
              </h2>
              <form className="grid grid-cols-2 gap-6" onSubmit={handleShippingSubmit}>
                <div className="col-span-2">
                  <label className="block text-xs font-black uppercase text-gray-500 mb-2">Full Name</label>
                  <input required name="name" className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="Enter recipient name" />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase text-gray-500 mb-2">Email</label>
                  <input required name="email" type="email" className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="For order tracking" />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase text-gray-500 mb-2">Phone</label>
                  <input required name="phone" className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="+91 XXXX" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-black uppercase text-gray-500 mb-2">Full Address</label>
                  <textarea required name="address" className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" rows={3} placeholder="Street, City, PIN..." />
                </div>
                <div className="col-span-2 pt-6">
                  <button type="submit" className="w-full bg-blue-600 text-white py-5 rounded-full font-black uppercase tracking-widest flex items-center justify-center space-x-2 shadow-xl hover:bg-blue-700 transition-all active:scale-95">
                    <span>Continue to Payment</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in slide-in-from-right-5 duration-300">
              <h2 className="text-2xl font-montserrat font-black mb-8 flex items-center space-x-2">
                <CreditCard className="text-blue-600" />
                <span>Choose Payment Method</span>
              </h2>
              <div className="space-y-4">
                <button 
                   onClick={() => setPaymentMethod('UPI')}
                   className={`w-full p-5 rounded-2xl border-2 transition-all flex items-center justify-between ${paymentMethod === 'UPI' ? 'border-blue-600 bg-blue-50' : 'border-gray-100 hover:border-gray-200'}`}
                >
                   <div className="flex items-center space-x-4">
                      <Smartphone className="w-6 h-6 text-blue-600" />
                      <span className="font-bold">UPI (PhonePe, GPay, Paytm)</span>
                   </div>
                   {paymentMethod === 'UPI' && <CheckCircle className="w-5 h-5 text-blue-600" />}
                </button>
                <button 
                   onClick={() => setPaymentMethod('COD')}
                   className={`w-full p-5 rounded-2xl border-2 transition-all flex items-center justify-between ${paymentMethod === 'COD' ? 'border-blue-600 bg-blue-50' : 'border-gray-100 hover:border-gray-200'}`}
                >
                   <div className="flex items-center space-x-4">
                      <Truck className="w-6 h-6 text-green-600" />
                      <span className="font-bold">Cash on Delivery</span>
                   </div>
                   {paymentMethod === 'COD' && <CheckCircle className="w-5 h-5 text-blue-600" />}
                </button>
              </div>

              {paymentMethod === 'UPI' && (
                <div className="mt-8 p-8 bg-gray-50 rounded-[30px] border border-dashed border-gray-300 text-center animate-in zoom-in-95">
                   <QrCode className="w-40 h-40 mx-auto text-gray-900 mb-4" />
                   <p className="text-sm font-black uppercase text-gray-500 tracking-widest">Scan to Pay ₹{total.toLocaleString()}</p>
                   <p className="text-[10px] text-gray-400 mt-2">VROOMMKART UPI ID: collect@vroomm</p>
                </div>
              )}
              
              <div className="mt-10 flex gap-4">
                <button onClick={handleBack} className="flex-1 bg-gray-100 text-gray-600 py-5 rounded-full font-black uppercase tracking-widest hover:bg-gray-200 flex items-center justify-center space-x-2">
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back</span>
                </button>
                <button onClick={handleFinalizeOrder} className="flex-[2] bg-blue-600 text-white py-5 rounded-full font-black uppercase tracking-widest shadow-xl hover:bg-blue-700 transition-all active:scale-95">
                  Confirm Order
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 space-y-6">
           <div className="bg-gray-900 text-white p-8 rounded-[40px] shadow-xl">
             <h3 className="text-xl font-black mb-6 uppercase tracking-tighter">Summary</h3>
             <div className="space-y-4 max-h-60 overflow-y-auto pr-2 mb-6 custom-scrollbar">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center space-x-4 border-b border-gray-800 pb-4">
                    <img src={item.images[0]} className="w-12 h-12 rounded-xl object-cover bg-gray-800" />
                    <div className="flex-1">
                      <p className="text-xs font-bold line-clamp-1">{item.name}</p>
                      <p className="text-[10px] text-gray-400 font-bold">Qty: {item.quantity} × ₹{item.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
             </div>
             <div className="pt-6 space-y-3">
               <div className="flex justify-between text-xs text-gray-400 font-bold">
                 <span>Subtotal</span>
                 <span>₹{subtotal.toLocaleString()}</span>
               </div>
               <div className="flex justify-between text-xs text-green-400 font-bold">
                 <span>Shipping</span>
                 <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
               </div>
               <div className="flex justify-between text-2xl font-black pt-4 border-t border-gray-800">
                 <span>Total</span>
                 <span className="text-blue-400">₹{total.toLocaleString()}</span>
               </div>
             </div>
           </div>
           
           <div className="bg-blue-50 p-6 rounded-3xl flex items-start space-x-3">
              <ShieldCheck className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                 <p className="text-xs font-black text-blue-900">Buyer Protection</p>
                 <p className="text-[10px] text-blue-700 font-medium">Original packaging guarantee. Secure payment processing.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const StepIcon: React.FC<{ icon: any, label: string, active: boolean, current: boolean }> = ({ icon, label, active, current }) => (
  <div className="flex flex-col items-center relative z-10">
    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
      active ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-gray-100 text-gray-400'
    } ${current ? 'scale-125 ring-4 ring-blue-100' : ''}`}>
      {React.cloneElement(icon as React.ReactElement<any>, { className: 'w-6 h-6' })}
    </div>
    <span className={`mt-3 text-[10px] font-black uppercase tracking-widest ${active ? 'text-blue-600' : 'text-gray-400'}`}>{label}</span>
  </div>
);

export default Checkout;
