
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Page } from '../types';
import { 
  MapPin, CreditCard, CheckCircle, ArrowRight, ArrowLeft, 
  Truck, ShieldCheck, Car, Smartphone, QrCode, Mail, 
  User, Phone, Lock, Info, ShoppingBag, Globe, ChevronRight, PackageCheck, CreditCard as PaymentIcon
} from 'lucide-react';

const Checkout: React.FC = () => {
  const { cart, navigateTo, placeOrder, clearCart } = useApp();
  const [step, setStep] = useState(1); 
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [shippingData, setShippingData] = useState({ name: '', email: '', phone: '', address: '', city: '', pincode: '' });

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
      city: formData.get('city') as string,
      pincode: formData.get('pincode') as string,
    });
    setStep(2);
  };

  const handleFinalizeOrder = () => {
    placeOrder({
      customerName: shippingData.name,
      email: shippingData.email,
      phone: shippingData.phone,
      address: `${shippingData.address}, ${shippingData.city}, ${shippingData.pincode}`,
      items: [...cart],
      total: total,
      paymentMethod: paymentMethod
    });
    clearCart();
    setStep(3);
  };

  if (step === 3) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-white">
        <div className="relative mb-10">
           <div className="w-32 h-32 bg-emerald-50 rounded-full flex items-center justify-center mx-auto">
             <PackageCheck className="w-16 h-16 text-emerald-500 animate-in zoom-in duration-500" />
           </div>
           <Sparkles className="absolute -top-4 -right-4 w-10 h-10 text-yellow-400 animate-pulse" />
        </div>
        <h1 className="text-4xl md:text-6xl font-montserrat font-black text-gray-900 mb-6 uppercase tracking-tighter">ORDER SECURED!</h1>
        <p className="text-gray-500 max-w-sm mx-auto mb-10 font-medium text-lg">
          Victory! Your gear is being prepped for dispatch. Check your email for the tracking link.
        </p>
        <button 
          onClick={() => navigateTo(Page.Home)}
          className="bg-blue-600 text-white px-12 py-5 rounded-full font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-2xl shadow-blue-500/30 flex items-center justify-center space-x-3"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Return to Hub</span>
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfcfd] pt-28 pb-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Elite Progress Header */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
             <div>
                <h1 className="text-4xl md:text-5xl font-montserrat font-black text-gray-900 tracking-tighter uppercase">Logistics & <span className="text-blue-600">Secure Pay</span></h1>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mt-2">Precision checkout for the elite collector</p>
             </div>
             <div className="flex items-center gap-4 bg-white p-2 rounded-3xl border border-gray-100 shadow-sm">
                <StepBadge step={1} active={step >= 1} current={step === 1} label="Shipping" />
                <ChevronRight className="w-4 h-4 text-gray-200" />
                <StepBadge step={2} active={step >= 2} current={step === 2} label="Payment" />
             </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Main Form Area */}
          <div className="flex-1 w-full space-y-8">
            {step === 1 && (
              <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.03)] border border-gray-100 animate-in fade-in slide-in-from-left-5 duration-500">
                <form onSubmit={handleShippingSubmit} className="space-y-10">
                  <section>
                    <div className="flex items-center space-x-4 mb-8">
                       <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><User className="w-6 h-6" /></div>
                       <h2 className="text-xl font-black uppercase tracking-tight">Identity Details</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <EliteInput label="Full Name" name="name" placeholder="John Doe" required icon={<User className="w-4 h-4" />} />
                       <EliteInput label="Email Address" name="email" type="email" placeholder="john@example.com" required icon={<Mail className="w-4 h-4" />} />
                    </div>
                  </section>

                  <section className="pt-10 border-t border-gray-50">
                    <div className="flex items-center space-x-4 mb-8">
                       <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl"><MapPin className="w-6 h-6" /></div>
                       <h2 className="text-xl font-black uppercase tracking-tight">Dispatch Location</h2>
                    </div>
                    <div className="space-y-6">
                       <EliteInput label="Complete Street Address" name="address" placeholder="Flat No, Wing, Building Name, Area" required icon={<MapPin className="w-4 h-4" />} />
                       <div className="grid grid-cols-2 gap-6">
                          <EliteInput label="City" name="city" placeholder="Pune" required icon={<Globe className="w-4 h-4" />} />
                          <EliteInput label="Pincode" name="pincode" placeholder="411001" required icon={<Info className="w-4 h-4" />} />
                       </div>
                       <EliteInput label="Mobile Number" name="phone" placeholder="+91 00000 00000" required icon={<Phone className="w-4 h-4" />} />
                    </div>
                  </section>

                  <button type="submit" className="w-full bg-blue-600 text-white py-6 rounded-[2rem] font-black uppercase tracking-widest flex items-center justify-center space-x-3 shadow-xl hover:bg-blue-700 transition-all group active:scale-95">
                    <span>Continue to Payment</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.03)] border border-gray-100 animate-in fade-in slide-in-from-right-5 duration-500">
                <div className="flex items-center space-x-4 mb-10">
                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl"><PaymentIcon className="w-6 h-6" /></div>
                  <h2 className="text-xl font-black uppercase tracking-tight">Payment Method</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  <ElitePaymentCard 
                    active={paymentMethod === 'UPI'} 
                    onClick={() => setPaymentMethod('UPI')} 
                    title="UPI / Wallet" 
                    desc="Google Pay, PhonePe, Paytm"
                    icon={<Smartphone className="w-6 h-6" />} 
                  />
                  <ElitePaymentCard 
                    active={paymentMethod === 'COD'} 
                    onClick={() => setPaymentMethod('COD')} 
                    title="Cash on Delivery" 
                    desc="Pay when item arrives"
                    icon={<Truck className="w-6 h-6" />} 
                  />
                </div>

                {paymentMethod === 'UPI' && (
                  <div className="bg-gray-50 rounded-[2.5rem] p-10 border-2 border-dashed border-gray-200 text-center mb-10">
                    <QrCode className="w-48 h-48 mx-auto text-gray-900 mb-6" />
                    <h4 className="text-lg font-black text-gray-900 mb-1 uppercase tracking-tight">Scan & Pay ₹{total.toLocaleString()}</h4>
                    <p className="text-[10px] font-black uppercase text-blue-500 tracking-[0.2em]">pay@vroommkart</p>
                  </div>
                )}

                <div className="flex gap-4">
                  <button onClick={() => setStep(1)} className="p-6 bg-gray-50 text-gray-400 rounded-[2rem] hover:bg-gray-100 transition-all border border-gray-100">
                    <ArrowLeft className="w-6 h-6" />
                  </button>
                  <button onClick={handleFinalizeOrder} className="flex-1 bg-blue-600 text-white py-6 rounded-[2rem] font-black uppercase tracking-widest shadow-xl hover:bg-blue-700 transition-all active:scale-95">
                    Finalize Order
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sticky Order Summary */}
          <div className="w-full lg:w-[400px] lg:sticky lg:top-32">
             <div className="bg-gray-950 text-white rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                   <ShoppingBag className="w-32 h-32" />
                </div>
                
                <h3 className="text-xl font-black mb-10 uppercase tracking-tight flex items-center gap-3">
                  <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div> Order Summary
                </h3>

                <div className="space-y-6 mb-10 max-h-[300px] overflow-y-auto pr-2 no-scrollbar">
                   {cart.map(item => (
                     <div key={item.id} className="flex items-center gap-5">
                       <div className="w-16 h-16 rounded-2xl bg-white/10 p-2 flex-shrink-0">
                          <img src={item.images[0]} className="w-full h-full object-contain" />
                       </div>
                       <div className="flex-1 min-w-0">
                          <p className="text-xs font-black uppercase truncate">{item.name}</p>
                          <div className="flex justify-between items-center mt-1">
                             <span className="text-[10px] text-blue-400 font-black">Qty: {item.quantity}</span>
                             <span className="text-sm font-black">₹{(item.price * item.quantity).toLocaleString()}</span>
                          </div>
                       </div>
                     </div>
                   ))}
                </div>

                <div className="space-y-4 pt-8 border-t border-white/5">
                   <div className="flex justify-between text-slate-500 font-bold text-xs uppercase tracking-widest">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toLocaleString()}</span>
                   </div>
                   <div className="flex justify-between text-emerald-500 font-bold text-xs uppercase tracking-widest">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                   </div>
                   <div className="pt-6 border-t border-white/5 mt-6 flex justify-between items-end">
                      <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1.5">Grand Total</span>
                      <span className="text-4xl font-black tracking-tighter">₹{total.toLocaleString()}</span>
                   </div>
                </div>

                <div className="mt-8 p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-3">
                   <ShieldCheck className="w-5 h-5 text-emerald-400" />
                   <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest leading-relaxed">Secured with Collector Grade Encryption</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StepBadge: React.FC<{ step: number, active: boolean, current: boolean, label: string }> = ({ step, active, current, label }) => (
  <div className={`flex items-center gap-3 px-6 py-3 rounded-2xl transition-all ${current ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20 scale-105' : active ? 'text-gray-900 font-black' : 'text-gray-300 font-bold'}`}>
     <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${current ? 'bg-white text-blue-600' : active ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-400'}`}>{step}</span>
     <span className="text-[11px] uppercase tracking-widest">{label}</span>
  </div>
);

const EliteInput: React.FC<{ label: string, name: string, icon: any, placeholder: string, type?: string, required?: boolean }> = ({ label, name, icon, placeholder, type = "text", required }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">{label}</label>
    <div className="relative group">
       <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors">
          {icon}
       </div>
       <input 
         name={name}
         type={type}
         placeholder={placeholder}
         required={required}
         className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-5 pl-14 pr-6 font-bold text-sm outline-none focus:bg-white focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all placeholder:text-gray-300"
       />
    </div>
  </div>
);

const ElitePaymentCard: React.FC<{ active: boolean, onClick: () => void, title: string, desc: string, icon: any }> = ({ active, onClick, title, desc, icon }) => (
  <button 
    onClick={onClick}
    className={`p-6 rounded-[2rem] border-2 text-left transition-all relative flex flex-col gap-4 ${active ? 'border-blue-600 bg-blue-50 shadow-xl shadow-blue-600/10' : 'border-gray-50 bg-gray-50 hover:border-gray-200'}`}
  >
     <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${active ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-400 shadow-sm'}`}>
        {icon}
     </div>
     <div>
        <h4 className={`text-sm font-black uppercase tracking-tight ${active ? 'text-blue-600' : 'text-gray-900'}`}>{title}</h4>
        <p className={`text-[10px] font-bold ${active ? 'text-blue-400' : 'text-gray-400'}`}>{desc}</p>
     </div>
     {active && <CheckCircle className="absolute top-6 right-6 w-5 h-5 text-blue-600" />}
  </button>
);

const Sparkles: React.FC<{className?: string}> = ({className}) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    <path d="M5 3v4"/><path d="M3 5h4"/><path d="M19 17v4"/><path d="M17 19h4"/>
  </svg>
);

export default Checkout;
