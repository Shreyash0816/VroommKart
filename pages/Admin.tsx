
import React, { useState, useMemo, useEffect } from 'react';
import { 
  LayoutDashboard, Package, ShoppingBag, Users, Settings, 
  Plus, Search, Edit2, Trash2, X, TrendingUp, DollarSign, Box, Home, AlertCircle, Clock, Eye, User, Phone, MapPin, CreditCard, Lock, Database, Download, Upload, CheckCircle2, Save, Monitor, Sparkles, Rocket, Share2, Link, Filter, ChevronRight, Star, ImagePlus, ImageIcon, Palette, Type, MessageSquare, LayoutGrid, Image as ImageIconLucide, IndianRupee
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Product, Page, Order, Customer, SiteConfig, SiteCategory, HeroBanner } from '../types';

type AdminTab = 'dashboard' | 'inventory' | 'orders' | 'customers' | 'site' | 'system';

const Admin: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct, navigateTo, orders, customers, siteConfig, updateSiteConfig, generateSyncLink } = useApp();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState(false);
  
  const [currentTab, setCurrentTab] = useState<AdminTab>('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [tempConfig, setTempConfig] = useState<SiteConfig>(siteConfig);
  const [syncLinkSuccess, setSyncLinkSuccess] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Stats for Dashboard
  const totalRevenue = useMemo(() => orders.reduce((acc, o) => acc + o.total, 0), [orders]);
  const activeInventory = products.length;

  useEffect(() => {
    setTempConfig(siteConfig);
  }, [siteConfig]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCode === '2025') {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  const handleSaveProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const productData: Product = {
      id: editingProduct?.id || `prod-${Date.now()}`,
      name: formData.get('name') as string,
      brand: formData.get('brand') as string,
      price: Number(formData.get('price')),
      category: formData.get('category') as any,
      images: [formData.get('image') as string],
      scale: formData.get('scale') as string,
      rarity: formData.get('rarity') as any,
      description: formData.get('description') as string,
      stock: Number(formData.get('stock')),
      rating: editingProduct?.rating || 5.0,
      reviews: editingProduct?.reviews || 0
    };

    if (editingProduct) {
      updateProduct(productData);
    } else {
      addProduct(productData);
    }
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleSaveSiteConfig = () => {
    updateSiteConfig(tempConfig);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleAddHeroBanner = () => {
    const newBanner: HeroBanner = {
      id: `banner-${Date.now()}`,
      image: '',
      title: 'NEW CAMPAIGN',
      subtitle: 'Premium Series',
      accentColor: '#2563eb',
      linkTo: Page.Supercars
    };
    setTempConfig({ ...tempConfig, heroBanners: [...(tempConfig.heroBanners || []), newBanner] });
  };

  const handleUpdateBanner = (id: string, updates: Partial<HeroBanner>) => {
    const updatedBanners = tempConfig.heroBanners.map(b => b.id === id ? { ...b, ...updates } : b);
    setTempConfig({ ...tempConfig, heroBanners: updatedBanners });
  };

  const handleDeleteBanner = (id: string) => {
    if (tempConfig.heroBanners.length <= 1) return;
    setTempConfig({ ...tempConfig, heroBanners: tempConfig.heroBanners.filter(b => b.id !== id) });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-[40px] p-10 shadow-2xl">
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="w-10 h-10 text-blue-500" />
            </div>
            <h1 className="text-3xl font-montserrat font-black text-white uppercase tracking-tighter">Owner Access</h1>
            <p className="text-gray-500 mt-2 font-medium">Enter secret code to manage Vroommkart.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <input 
              type="password" 
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              placeholder="••••"
              className={`w-full bg-black border ${error ? 'border-red-500' : 'border-gray-800'} rounded-2xl py-5 px-6 text-white text-center text-4xl tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-black placeholder:text-gray-800 placeholder:text-sm`}
              autoFocus
            />
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl transition-all">Unlock Dashboard</button>
          </form>
          <button onClick={() => navigateTo(Page.Home)} className="w-full mt-10 text-gray-600 hover:text-white transition-colors font-bold text-sm uppercase tracking-widest">Return to Store</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfcfd] flex flex-col md:flex-row">
      <aside className="w-full md:w-72 bg-gray-950 text-white p-8 md:sticky md:top-0 md:h-screen flex flex-col z-20 shadow-2xl">
        <div className="flex items-center space-x-4 mb-12">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/20"><Settings className="w-6 h-6 text-white" /></div>
          <div>
            <span className="text-xl font-black tracking-tighter uppercase block">{tempConfig.logoText}<span className="text-blue-500">{tempConfig.logoAccentText}</span></span>
            <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Command Center</span>
          </div>
        </div>
        
        <nav className="space-y-3 flex-1">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'inventory', label: 'Inventory', icon: Package },
            { id: 'orders', label: 'Orders', icon: ShoppingBag, count: orders.length },
            { id: 'customers', label: 'Customers', icon: Users },
            { id: 'site', label: 'Visual Engine', icon: Monitor },
            { id: 'system', label: 'Cloud Sync', icon: Database },
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => setCurrentTab(item.id as AdminTab)}
              className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all ${currentTab === item.id ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'text-slate-500 hover:bg-white/5 hover:text-white'}`}
            >
              <div className="flex items-center space-x-4">
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </div>
              {item.count !== undefined && item.count > 0 && (
                <span className={`px-2 py-1 rounded-lg text-[9px] ${currentTab === item.id ? 'bg-white text-blue-600' : 'bg-slate-800 text-slate-400'}`}>
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </nav>
        <button onClick={() => navigateTo(Page.Home)} className="w-full flex items-center space-x-4 text-slate-500 hover:text-white p-6 rounded-2xl font-black uppercase text-[10px] tracking-widest mt-6 border-t border-white/5 transition-all"><Home className="w-5 h-5" /><span>Exit Dashboard</span></button>
      </aside>

      <main className="flex-1 p-6 md:p-12 pb-32 overflow-y-auto">
        <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-montserrat font-black text-gray-900 tracking-tighter uppercase">{currentTab}</h1>
            <p className="text-gray-400 font-medium text-sm mt-1 uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> Admin Operational Oversight
            </p>
          </div>
          <div className="flex gap-4">
             {currentTab === 'inventory' && (
               <button onClick={() => { setEditingProduct(null); setIsModalOpen(true); }} className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] flex items-center gap-3 shadow-xl hover:bg-blue-700 transition-all active:scale-95">
                 <Plus className="w-5 h-5" /> Add Product
               </button>
             )}
             {currentTab === 'site' && (
               <button onClick={handleSaveSiteConfig} className="bg-green-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] flex items-center gap-3 shadow-xl hover:bg-green-700 transition-all active:scale-95">
                 <Save className="w-5 h-5" /> {copySuccess ? 'Updated!' : 'Push Live'}
               </button>
             )}
          </div>
        </header>

        {currentTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-in fade-in duration-500">
            <StatCard label="Total Revenue" value={`₹${totalRevenue.toLocaleString()}`} icon={<IndianRupee />} color="bg-emerald-500" />
            <StatCard label="Total Orders" value={orders.length} icon={<ShoppingBag />} color="bg-blue-500" />
            <StatCard label="Active Items" value={activeInventory} icon={<Package />} color="bg-orange-500" />
            <StatCard label="Customers" value={customers.length} icon={<Users />} color="bg-purple-500" />
          </div>
        )}

        {currentTab === 'inventory' && (
          <div className="space-y-6 animate-in fade-in duration-500">
             <div className="flex bg-white p-4 rounded-3xl border border-gray-100 shadow-sm items-center gap-4">
                <Search className="text-gray-400 ml-4" />
                {/* Fix: changed setSearchQuery to setSearchTerm */}
                <input 
                  type="text" 
                  placeholder="Search inventory..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-2 font-bold text-sm outline-none"
                />
             </div>
             <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                   <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>
                        <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Item</th>
                        <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Category</th>
                        <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Stock</th>
                        <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Price</th>
                        <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-100">
                      {products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map(product => (
                        <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                           <td className="p-6">
                              <div className="flex items-center gap-4">
                                 <img src={product.images[0]} className="w-12 h-12 rounded-xl object-contain bg-gray-50 p-1" />
                                 <div>
                                    <p className="font-black text-sm uppercase tracking-tight">{product.name}</p>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase">{product.brand}</p>
                                 </div>
                              </div>
                           </td>
                           <td className="p-6 font-bold text-xs uppercase text-gray-500">{product.category}</td>
                           <td className="p-6">
                              <span className={`px-4 py-1.5 rounded-full text-[10px] font-black ${product.stock < 5 ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                                 {product.stock} units
                              </span>
                           </td>
                           <td className="p-6 font-black text-sm">₹{product.price.toLocaleString()}</td>
                           <td className="p-6 text-right space-x-2">
                              <button onClick={() => { setEditingProduct(product); setIsModalOpen(true); }} className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all"><Edit2 className="w-4 h-4" /></button>
                              <button onClick={() => deleteProduct(product.id)} className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"><Trash2 className="w-4 h-4" /></button>
                           </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </div>
        )}

        {currentTab === 'orders' && (
           <div className="space-y-6 animate-in fade-in duration-500">
              {orders.length === 0 ? (
                <div className="bg-white p-20 rounded-[3rem] text-center border-2 border-dashed border-gray-100">
                   <ShoppingBag className="w-16 h-16 text-gray-200 mx-auto mb-6" />
                   <p className="text-gray-400 font-bold uppercase tracking-widest">No orders tracked yet.</p>
                </div>
              ) : (
                <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                   <table className="w-full text-left">
                      <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                           <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Order ID</th>
                           <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Customer</th>
                           <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Date</th>
                           <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                           <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                         {orders.map(order => (
                           <tr key={order.id}>
                              <td className="p-6 font-mono text-[10px] font-black text-blue-600">{order.id}</td>
                              <td className="p-6">
                                 <p className="font-black text-sm uppercase">{order.customerName}</p>
                                 <p className="text-[10px] text-gray-400">{order.email}</p>
                              </td>
                              <td className="p-6 text-xs font-bold text-gray-500">{new Date(order.date).toLocaleDateString()}</td>
                              <td className="p-6">
                                 <span className="bg-orange-50 text-orange-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">{order.status}</span>
                              </td>
                              <td className="p-6 text-right font-black text-sm">₹{order.total.toLocaleString()}</td>
                           </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
              )}
           </div>
        )}

        {currentTab === 'site' && (
          <div className="space-y-12 animate-in fade-in duration-500 pb-20">
             <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
                <div className="flex items-center gap-4 mb-10">
                   <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><Palette className="w-6 h-6" /></div>
                   <h3 className="text-2xl font-black uppercase tracking-tight">Global Branding</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                   <ColorInput label="Primary Theme Color" value={tempConfig.primaryColor} onChange={val => setTempConfig({...tempConfig, primaryColor: val})} />
                   <ColorInput label="Accent Theme Color" value={tempConfig.accentColor} onChange={val => setTempConfig({...tempConfig, accentColor: val})} />
                   <InputGroup label="Logo Text" value={tempConfig.logoText} onChange={val => setTempConfig({...tempConfig, logoText: val})} />
                   <InputGroup label="Logo Accent Text" value={tempConfig.logoAccentText} onChange={val => setTempConfig({...tempConfig, logoAccentText: val})} />
                </div>
             </div>

             <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-10">
                   <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><Monitor className="w-6 h-6" /></div>
                      <h3 className="text-2xl font-black uppercase tracking-tight">Hero Banners Manager</h3>
                   </div>
                   <button onClick={handleAddHeroBanner} className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase border-2 border-blue-100 px-6 py-3 rounded-full hover:bg-blue-600 hover:text-white transition-all">
                     <Plus className="w-4 h-4" /> Add New Banner
                   </button>
                </div>
                <div className="space-y-8">
                   {tempConfig.heroBanners && tempConfig.heroBanners.map((banner, idx) => (
                     <div key={banner.id} className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 relative group overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 flex gap-2">
                           <button onClick={() => handleDeleteBanner(banner.id)} className="p-4 bg-white/80 hover:bg-red-600 hover:text-white rounded-2xl transition-all shadow-sm"><Trash2 className="w-4 h-4" /></button>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                           <div className="space-y-6">
                              <InputGroup label="Campaign Title" value={banner.title} onChange={val => handleUpdateBanner(banner.id, { title: val })} />
                              <InputGroup label="Subtitle Tagline" value={banner.subtitle} onChange={val => handleUpdateBanner(banner.id, { subtitle: val })} />
                           </div>
                           <div className="space-y-6">
                              <InputGroup label="Image Background URL" value={banner.image} onChange={val => handleUpdateBanner(banner.id, { image: val })} />
                              <div className="grid grid-cols-2 gap-4">
                                 <ColorInput label="Accent Color" value={banner.accentColor} onChange={val => handleUpdateBanner(banner.id, { accentColor: val })} />
                                 <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-2">Redirect Page</label>
                                    <select 
                                      value={banner.linkTo} 
                                      onChange={e => handleUpdateBanner(banner.id, { linkTo: e.target.value as Page })}
                                      className="w-full bg-white border border-gray-100 p-4 rounded-2xl font-bold text-xs outline-none"
                                    >
                                       <option value={Page.Supercars}>Supercars</option>
                                       <option value={Page.Anime}>Anime</option>
                                       <option value={Page.Toys}>Toys</option>
                                    </select>
                                 </div>
                              </div>
                           </div>
                           <div className="flex flex-col items-center justify-center bg-white rounded-3xl p-4 border border-gray-100 relative overflow-hidden">
                              {banner.image ? (
                                <>
                                  <img src={banner.image} className="w-full h-40 object-cover rounded-2xl" />
                                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-4">
                                     <span className="text-white font-black text-[8px] uppercase tracking-widest mb-1">{banner.subtitle}</span>
                                     <h4 className="text-white font-black text-xl uppercase tracking-tighter" style={{ color: banner.accentColor }}>{banner.title}</h4>
                                  </div>
                                </>
                              ) : (
                                <div className="text-gray-300 flex flex-col items-center gap-2">
                                   <ImageIconLucide className="w-12 h-12" />
                                   <span className="text-[10px] font-black uppercase tracking-widest">Preview Mode</span>
                                </div>
                              )}
                           </div>
                        </div>
                     </div>
                   ))}
                </div>
             </div>

             <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
                <div className="flex items-center gap-4 mb-10">
                   <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl"><Sparkles className="w-6 h-6" /></div>
                   <h3 className="text-2xl font-black uppercase tracking-tight">Spotlight Drop Control</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                   <div className="space-y-6">
                      <InputGroup label="Spotlight Title" value={tempConfig.spotlightTitle} onChange={val => setTempConfig({ ...tempConfig, spotlightTitle: val })} />
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-2">Description</label>
                         <textarea 
                           value={tempConfig.spotlightDesc} 
                           onChange={e => setTempConfig({ ...tempConfig, spotlightDesc: e.target.value })} 
                           className="w-full bg-gray-50 border border-gray-100 p-6 rounded-[2rem] font-bold text-sm outline-none focus:ring-2 focus:ring-blue-500 h-40"
                         />
                      </div>
                   </div>
                   <div className="space-y-6">
                      <InputGroup label="Spotlight Image URL" value={tempConfig.spotlightImage} onChange={val => setTempConfig({ ...tempConfig, spotlightImage: val })} />
                      <div className="grid grid-cols-2 gap-6">
                         <InputGroup label="Market Rarity Score" value={tempConfig.spotlightRarity} onChange={val => setTempConfig({ ...tempConfig, spotlightRarity: val })} />
                         <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100 flex items-center justify-center overflow-hidden">
                            {tempConfig.spotlightImage ? <img src={tempConfig.spotlightImage} className="w-full h-full object-cover rounded-xl" /> : <ImageIconLucide className="text-gray-200" />}
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}

        {currentTab === 'system' && (
          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-10 animate-in fade-in duration-500">
             <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl"><Share2 className="w-6 h-6" /></div>
                <h3 className="text-2xl font-black uppercase tracking-tight">Global Cloud Sync</h3>
             </div>
             <p className="text-gray-500 font-medium max-w-2xl leading-relaxed">Generated an encrypted link to synchronize this exact site configuration, inventory, and order data across other devices.</p>
             <button 
               onClick={() => {
                 const link = generateSyncLink();
                 navigator.clipboard.writeText(link);
                 setSyncLinkSuccess(true);
                 setTimeout(() => setSyncLinkSuccess(false), 3000);
               }}
               className={`w-full flex items-center justify-center gap-4 py-6 rounded-[2rem] font-black uppercase tracking-widest text-xs transition-all shadow-xl ${syncLinkSuccess ? 'bg-emerald-600 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
             >
               {syncLinkSuccess ? <CheckCircle2 /> : <Link />}
               <span>{syncLinkSuccess ? 'Encrypted Sync Link Copied!' : 'Generate Secure Sync Link'}</span>
             </button>
             <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-[10px] text-gray-400 font-mono break-all leading-tight">
                {generateSyncLink()}
             </div>
          </div>
        )}
      </main>

      {/* Inventory Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
           <div className="bg-white w-full max-w-4xl rounded-[3rem] overflow-hidden flex flex-col max-h-[90vh] shadow-2xl animate-in zoom-in-95 duration-300">
              <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                 <h2 className="text-2xl font-black uppercase tracking-tight">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                 <button onClick={() => setIsModalOpen(false)} className="p-3 hover:bg-white rounded-2xl transition-all"><X /></button>
              </div>
              <form onSubmit={handleSaveProduct} className="p-10 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-6">
                    <InputGroup label="Product Name" name="name" defaultValue={editingProduct?.name} />
                    <InputGroup label="Brand" name="brand" defaultValue={editingProduct?.brand} />
                    <div className="grid grid-cols-2 gap-4">
                       <InputGroup label="Price (₹)" name="price" type="number" defaultValue={editingProduct?.price} />
                       <InputGroup label="Stock" name="stock" type="number" defaultValue={editingProduct?.stock} />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Category</label>
                       <select name="category" defaultValue={editingProduct?.category} className="w-full bg-gray-50 border border-gray-100 p-5 rounded-2xl font-bold text-sm outline-none">
                          <option value="Supercars">Supercars</option>
                          <option value="Anime Figurines">Anime Figurines</option>
                          <option value="Toys">Toys</option>
                          <option value="Baby Care">Baby Care</option>
                          <option value="Books">Books</option>
                          <option value="Art & Craft">Art & Craft</option>
                       </select>
                    </div>
                 </div>
                 <div className="space-y-6">
                    <InputGroup label="Main Image URL" name="image" defaultValue={editingProduct?.images[0]} />
                    <div className="grid grid-cols-2 gap-4">
                       <InputGroup label="Scale (Optional)" name="scale" defaultValue={editingProduct?.scale} />
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Rarity</label>
                          <select name="rarity" defaultValue={editingProduct?.rarity} className="w-full bg-gray-50 border border-gray-100 p-5 rounded-2xl font-bold text-sm outline-none">
                             <option value="Common">Common</option>
                             <option value="Rare">Rare</option>
                             <option value="Limited">Limited</option>
                             <option value="Premium">Premium</option>
                          </select>
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Description</label>
                       <textarea name="description" defaultValue={editingProduct?.description} className="w-full bg-gray-50 border border-gray-100 p-5 rounded-2xl font-bold text-sm outline-none h-32" />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white py-6 rounded-3xl font-black uppercase tracking-widest shadow-xl hover:bg-blue-700 transition-all">
                       {editingProduct ? 'Save Changes' : 'Ignite Product'}
                    </button>
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

const StatCard: React.FC<{ label: string, value: any, icon: any, color: string }> = ({ label, value, icon, color }) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center justify-between group hover:-translate-y-2 transition-all duration-300">
     <div>
        <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">{label}</p>
        <p className="text-3xl font-black text-gray-900 tracking-tighter">{value}</p>
     </div>
     <div className={`w-14 h-14 ${color} text-white rounded-2xl flex items-center justify-center shadow-lg`}>
        {/* Fix: Added typing to icon as React.ReactElement<any> to avoid className error */}
        {React.cloneElement(icon as React.ReactElement<any>, { className: 'w-6 h-6' })}
     </div>
  </div>
);

const ColorInput: React.FC<{ label: string, value: string, onChange: (v: string) => void }> = ({ label, value, onChange }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-2">{label}</label>
    <div className="flex gap-3">
       <input 
         type="color" 
         value={value} 
         onChange={e => onChange(e.target.value)} 
         className="w-14 h-14 rounded-2xl cursor-pointer border-0 bg-transparent"
       />
       <input 
         type="text" 
         value={value} 
         onChange={e => onChange(e.target.value)} 
         className="flex-1 bg-gray-50 border border-gray-100 px-5 rounded-2xl font-black text-xs outline-none"
       />
    </div>
  </div>
);

const InputGroup: React.FC<{ label: string, name?: string, type?: string, defaultValue?: any, value?: string, onChange?: (v: string) => void }> = ({ label, name, type = "text", defaultValue, value, onChange }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-2">{label}</label>
    <input 
      name={name}
      type={type}
      value={value}
      defaultValue={defaultValue}
      onChange={e => onChange?.(e.target.value)}
      className="w-full bg-gray-50 border border-gray-100 p-5 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
    />
  </div>
);

export default Admin;
