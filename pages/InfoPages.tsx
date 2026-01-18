
import React from 'react';
import { Page } from '../types';
import { ShieldCheck, Box, RotateCcw, Lock, Info, Star, Zap, Calendar, Camera, Clock, CheckCircle2 } from 'lucide-react';

interface InfoPageProps {
  type: Page;
}

const InfoPages: React.FC<InfoPageProps> = ({ type }) => {
  const renderContent = () => {
    switch (type) {
      case Page.CollectorsGuide:
        return (
          <div className="space-y-12">
            <header className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full mb-6 font-black uppercase text-xs tracking-widest">
                <Star className="w-4 h-4 fill-current" />
                <span>The Collector's Bible</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-montserrat font-black text-gray-900 tracking-tighter uppercase mb-6">Mastering the<br/><span className="text-blue-600">Scale World</span></h1>
              <p className="text-gray-500 max-w-2xl mx-auto font-medium text-lg">Whether you are a Diecast Speedster or an Anime Otaku, this guide is your roadmap to building a legendary collection.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-500/20">
                  <Box className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">1:64 Scale Guide</h3>
                <p className="text-gray-600 font-medium leading-relaxed mb-6">Most of our cars (Mini GT, Tarmac, Inno64) are in 1:64 scale. This means the model is 64 times smaller than the real car. Perfect for desktop displays and massive dioramas.</p>
                <ul className="space-y-3 text-sm font-bold text-gray-500">
                  <li className="flex items-center gap-2 text-blue-600"><Zap className="w-4 h-4" /> Metal Body (Diecast)</li>
                  <li className="flex items-center gap-2 text-blue-600"><Zap className="w-4 h-4" /> Rubber Tires (Real feel)</li>
                  <li className="flex items-center gap-2 text-blue-600"><Zap className="w-4 h-4" /> Detailed Interiors</li>
                </ul>
              </div>

              <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
                <div className="w-16 h-16 bg-pink-500 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-pink-500/20">
                  <Star className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">Anime Figurine Care</h3>
                <p className="text-gray-600 font-medium leading-relaxed mb-6">Authentic PVC figures need love. Avoid direct sunlight as it can fade the paint over time. Use a soft brush for dusting to keep your waifus and heroes looking pristine.</p>
                <ul className="space-y-3 text-sm font-bold text-gray-500">
                  <li className="flex items-center gap-2 text-pink-500"><Zap className="w-4 h-4" /> Keep in room temperature</li>
                  <li className="flex items-center gap-2 text-pink-500"><Zap className="w-4 h-4" /> Avoid humid areas</li>
                  <li className="flex items-center gap-2 text-pink-500"><Zap className="w-4 h-4" /> Original boxes add resale value</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-900 text-white p-12 rounded-[40px] text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-3xl rounded-full"></div>
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">The "Mint" Standard</h2>
              <p className="text-gray-400 max-w-2xl mx-auto mb-8 font-medium">At Vroommkart, we understand that for a collector, the box is 50% of the value. We guarantee "Mint Condition" packaging or we'll make it right.</p>
              <div className="flex flex-wrap justify-center gap-8">
                <div className="flex items-center gap-2"><CheckCircle2 className="text-green-500" /> Triple Bubble Wrapped</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="text-green-500" /> Hard Outer Cardboard</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="text-green-500" /> Corner Protectors</div>
              </div>
            </div>
          </div>
        );
      case Page.PreOrderPolicy:
        return (
          <div className="max-w-4xl mx-auto space-y-12">
             <header className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-yellow-50 text-yellow-600 px-4 py-2 rounded-full mb-6 font-black uppercase text-xs tracking-widest">
                <Clock className="w-4 h-4" />
                <span>Reserved for you</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-montserrat font-black text-gray-900 tracking-tighter uppercase mb-6">Pit Stop<br/><span className="text-yellow-500">Pre-Order Policy</span></h1>
              <p className="text-gray-500 font-medium text-lg leading-relaxed">Don't miss out on limited runs. Here is how we handle your reservations for upcoming heat!</p>
            </header>

            <div className="space-y-8">
               <PolicyItem 
                icon={<Calendar className="text-blue-600" />}
                title="Reservation & Payment"
                content="When you pre-order, you are reserving a unit from our incoming shipment. Full payment is required at the time of pre-order to secure your slot."
               />
               <PolicyItem 
                icon={<Clock className="text-orange-600" />}
                title="Estimated Release Dates"
                content="Manufacturers provide estimated shipping windows (e.g., Q3 2025). Please note that delays in international shipping or production are common in the toy industry. We will update you via email for any significant changes."
               />
               <PolicyItem 
                icon={<RotateCcw className="text-red-600" />}
                title="Cancellations"
                content="Pre-orders can be cancelled within 24 hours of placing the order for a full refund. Beyond 24 hours, a 10% cancellation fee applies as we commit our inventory to the factory based on your order."
               />
            </div>
          </div>
        );
      case Page.ReturnsRefund:
        return (
          <div className="max-w-4xl mx-auto space-y-12">
             <header className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-green-50 text-green-600 px-4 py-2 rounded-full mb-6 font-black uppercase text-xs tracking-widest">
                <ShieldCheck className="w-4 h-4" />
                <span>Shop with Confidence</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-montserrat font-black text-gray-900 tracking-tighter uppercase mb-6">Returns &<br/><span className="text-green-600">Refund Policy</span></h1>
              <p className="text-gray-500 font-medium text-lg leading-relaxed">Your satisfaction is our fuel. If something is wrong, we are here to fix it fast.</p>
            </header>

            <div className="bg-red-50 border-2 border-dashed border-red-200 p-8 rounded-[2.5rem] mb-12">
               <div className="flex items-start gap-4">
                  <div className="bg-red-600 text-white p-3 rounded-2xl"><Camera className="w-6 h-6" /></div>
                  <div>
                    <h4 className="text-red-900 font-black uppercase text-sm mb-2">Mandatory Unboxing Video</h4>
                    <p className="text-red-700 text-sm font-bold leading-relaxed">To protect our collectors and our business, a continuous unboxing video (from seal opening to product inspection) is MANDATORY for all return/refund claims regarding transit damage or missing parts.</p>
                  </div>
               </div>
            </div>

            <div className="space-y-8">
               <PolicyItem 
                icon={<RotateCcw className="text-blue-600" />}
                title="7-Day Window"
                content="You have 7 days from the date of delivery to report any issues. Items must be in their original, unopened factory packaging with all seals intact."
               />
               <PolicyItem 
                icon={<Box className="text-purple-600" />}
                title="Non-Returnable Items"
                content="Open-box items, clearance sale items, and mystery box sets cannot be returned unless there is a confirmed manufacturing defect visible in the unboxing video."
               />
               <PolicyItem 
                icon={<ShieldCheck className="text-green-600" />}
                title="Refund Process"
                content="Once your return is inspected and approved, we will process your refund to the original payment method within 5-7 working days. Store credit options are also available for faster resolution."
               />
            </div>
          </div>
        );
      case Page.PrivacyPolicy:
        return (
          <div className="max-w-3xl mx-auto space-y-12 pb-20">
             <header className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-gray-100 text-gray-600 px-4 py-2 rounded-full mb-6 font-black uppercase text-xs tracking-widest">
                <Lock className="w-4 h-4" />
                <span>Secure Data</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-montserrat font-black text-gray-900 tracking-tighter uppercase mb-6">Privacy<br/><span className="text-blue-600">Policy</span></h1>
              <p className="text-gray-500 font-medium text-lg leading-relaxed">We value your privacy as much as you value your collectibles.</p>
            </header>

            <div className="prose prose-blue max-w-none text-gray-600 font-medium leading-relaxed space-y-8">
               <section>
                 <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-4">1. Information We Collect</h3>
                 <p>When you shop at Vroommkart, we collect your name, email, phone number, and shipping address to process your orders. We do NOT store your credit card or payment credentials; these are handled securely by our payment partners.</p>
               </section>

               <section>
                 <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-4">2. How We Use Your Data</h3>
                 <p>Your data is used solely for order processing, customer support, and sending you updates about your shipments or our latest drops (only if you opt-in).</p>
               </section>

               <section>
                 <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-4">3. Data Protection</h3>
                 <p>We implement industry-standard security measures to ensure your personal information is protected against unauthorized access or disclosure.</p>
               </section>
               
               <div className="p-8 bg-blue-50 rounded-[2rem] text-center border border-blue-100">
                  <p className="text-blue-800 text-sm font-bold">Questions? Contact our Privacy Officer at privacy@vroommkart.com</p>
               </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {renderContent()}
      </div>
    </div>
  );
};

const PolicyItem: React.FC<{ icon: any, title: string, content: string }> = ({ icon, title, content }) => (
  <div className="flex gap-6 items-start p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm transition-all hover:shadow-md">
    <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-inner">
       {React.cloneElement(icon as React.ReactElement<any>, { className: 'w-6 h-6' })}
    </div>
    <div>
      <h4 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-2">{title}</h4>
      <p className="text-gray-500 font-medium leading-relaxed">{content}</p>
    </div>
  </div>
);

export default InfoPages;
