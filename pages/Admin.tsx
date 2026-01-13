
import React, { useState } from 'react';
import { 
  LayoutDashboard, Package, ShoppingBag, Users, Settings, 
  Plus, Search, Edit2, Trash2, X, TrendingUp, DollarSign, Box, Home, ChevronRight, AlertCircle, Clock, Eye, User, Phone, MapPin, CreditCard, Lock, Shield
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Product, Page, Order, Customer } from '../types';
import { SUPERCAR_BRANDS } from '../constants';

type AdminTab = 'dashboard' | 'inventory' | 'orders' | 'customers';

const Admin: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct, navigateTo, orders, customers } = useApp();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState(false);
  
  const [currentTab, setCurrentTab] = useState<AdminTab>('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCode === '2025') { // Set your secret code here
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-[40px] p-10 shadow-2xl animate-in zoom-in-95 duration-500">
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="w-10 h-10 text-blue-500" />
            </div>
            <h1 className="text-3xl font-montserrat font-black text-white uppercase tracking-tighter">Owner Access</h1>
            <p className="text-gray-500 mt-2 font-medium">Enter secret code to manage Vroommkart.</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input 
                type="password" 
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                placeholder="Secret Access Code"
                className={`w-full bg-black border ${error ? 'border-red-500' : 'border-gray-800'} rounded-2xl py-5 px-6 text-white text-center text-2xl tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-black placeholder:text-gray-700 placeholder:tracking-normal placeholder:text-sm`}
                autoFocus
              />
              {error && <p className="text-red-500 text-xs font-bold text-center mt-3 animate-pulse">ACCESS DENIED. TRY AGAIN.</p>}
            </div>
            <button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl transition-all active:scale-95"
            >
              Unlock Dashboard
            </button>
          </form>

          <button 
            onClick={() => navigateTo(Page.Home)}
            className="w-full mt-10 text-gray-600 hover:text-white transition-colors font-bold text-sm uppercase tracking-widest"
          >
            Return to Store
          </button>
        </div>
      </div>
    );
  }

  // Stats
  const totalValue = products.reduce((acc, p) => acc + (p.price * p.stock), 0);
  const totalStock = products.reduce((acc, p) => acc + p.stock, 0);
  const lowStockCount = products.filter(p => p.stock > 0 && p.stock <= 5).length;
  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const imagesRaw = formData.get('images') as string;
    
    const imagesArray = imagesRaw
      .split(/[\n,]/)
      .map(url => url.trim())
      .filter(url => url.length > 0 && (url.startsWith('http') || url.startsWith('data:')));

    const productData: Product = {
      id: editingProduct?.id || Date.now().toString(),
      name: formData.get('name') as string,
      brand: formData.get('brand') as string,
      price: Number(formData.get('price')),
      stock: Number(formData.get('stock')),
      category: formData.get('category') as Product['category'],
      scale: formData.get('scale') as string,
      rarity: formData.get('rarity') as Product['rarity'],
      images: imagesArray.length > 0 ? imagesArray : (editingProduct ? editingProduct.images : ['https://via.placeholder.com/400']),
      description: formData.get('description') as string,
      rating: editingProduct?.rating || 4.5,
      reviews: editingProduct?.reviews || 0,
    };

    if (editingProduct) {
      updateProduct(productData);
    } else {
      addProduct(productData);
    }
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'customers', label: 'Customers', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row animate-in fade-in duration-700">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-gray-900 text-white p-6 md:sticky md:top-0 md:h-screen flex flex-col z-20">
        <div className="flex items-center space-x-3 mb-10">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
             <Settings className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-black tracking-tighter uppercase">Vroomm<span className="text-blue-400">Admin</span></span>
        </div>

        <nav className="space-y-2 flex-1">
          {sidebarItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => setCurrentTab(item.id as AdminTab)}
              className={`w-full flex items-center justify-between p-3 rounded-xl font-bold transition-all ${
                currentTab === item.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </div>
              {currentTab === item.id && <ChevronRight className="w-4 h-4" />}
            </button>
          ))}
        </nav>

        <button 
          onClick={() => navigateTo(Page.Home)}
          className="w-full flex items-center space-x-3 text-gray-400 hover:text-white hover:bg-gray-800 p-3 rounded-xl font-bold transition-all mt-6 pt-6 border-t border-gray-800"
        >
          <Home className="w-5 h-5" />
          <span>Go to Store</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-gray-900 capitalize">{currentTab}</h1>
            <p className="text-gray-500 font-medium">Manage your Vroommkart operations.</p>
          </div>
          {currentTab === 'inventory' && (
            <button 
              onClick={() => { setEditingProduct(null); setIsModalOpen(true); }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold flex items-center space-x-2 shadow-lg"
            >
              <Plus className="w-5 h-5" />
              <span>Add Product</span>
            </button>
          )}
        </header>

        {currentTab === 'dashboard' && (
          <div className="animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              <StatCard icon={<Box className="text-blue-600" />} label="Live Stock" value={totalStock.toString()} color="bg-blue-50" />
              <StatCard icon={<ShoppingBag className="text-green-600" />} label="Total Sales" value={orders.length.toString()} color="bg-green-50" />
              <StatCard icon={<DollarSign className="text-purple-600" />} label="Revenue" value={`₹${totalRevenue.toLocaleString()}`} color="bg-purple-50" />
              <StatCard icon={<AlertCircle className="text-yellow-600" />} label="Low Stock" value={lowStockCount.toString()} color="bg-yellow-50" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
                <h3 className="text-xl font-black mb-6">Recent Customer Activity</h3>
                <div className="space-y-4">
                  {orders.slice(0, 5).map(o => (
                    <div key={o.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl cursor-pointer hover:bg-gray-100 transition-all" onClick={() => setSelectedOrder(o)}>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                          {o.customerName[0]}
                        </div>
                        <div>
                          <p className="font-bold text-sm">{o.customerName}</p>
                          <p className="text-[10px] text-gray-400 uppercase font-black">{o.id}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-blue-600 text-sm">₹{o.total.toLocaleString()}</p>
                        <p className="text-[10px] text-gray-400">{new Date(o.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                  {orders.length === 0 && <p className="text-center text-gray-400 italic">No activity yet.</p>}
                </div>
              </div>
              <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
                <h3 className="text-xl font-black mb-6">Inventory Health</h3>
                <div className="space-y-4">
                  {products.filter(p => p.stock <= 5).slice(0, 5).map(p => (
                    <div key={p.id} className="flex items-center justify-between p-4 bg-yellow-50 rounded-2xl border border-yellow-100">
                      <div className="flex items-center space-x-3">
                        <img src={p.images[0]} className="w-10 h-10 rounded-lg object-cover" />
                        <div>
                          <p className="font-bold text-sm line-clamp-1">{p.name}</p>
                          <p className="text-[10px] text-yellow-700 font-black">STOCK: {p.stock}</p>
                        </div>
                      </div>
                      <button onClick={() => { setCurrentTab('inventory'); openEditProduct(p); }} className="text-xs font-black text-yellow-800 bg-yellow-200 px-3 py-1 rounded-lg">RESTOCK</button>
                    </div>
                  ))}
                  {products.filter(p => p.stock <= 5).length === 0 && <p className="text-center text-green-500 font-bold italic py-10">Stock levels are healthy! 🏎️</p>}
                </div>
              </div>
            </div>
          </div>
        )}

        {currentTab === 'inventory' && (
          <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
             <div className="p-8 border-b flex items-center space-x-4">
                <Search className="text-gray-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Filter stock by name or brand..." 
                  className="bg-transparent border-none outline-none flex-1 font-medium"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>
             <div className="overflow-x-auto">
               <table className="w-full text-left">
                 <thead className="bg-gray-50 text-[10px] font-black uppercase tracking-widest text-gray-500">
                   <tr>
                     <th className="px-8 py-4">Product Info</th>
                     <th className="px-8 py-4">Category</th>
                     <th className="px-8 py-4">Price</th>
                     <th className="px-8 py-4">In Stock</th>
                     <th className="px-8 py-4 text-right">Actions</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100">
                   {filteredProducts.map(p => (
                     <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                       <td className="px-8 py-4">
                         <div className="flex items-center space-x-3">
                           <img src={p.images[0]} className="w-12 h-12 rounded-xl object-cover bg-gray-100 border" />
                           <div>
                             <p className="font-bold text-gray-900">{p.name}</p>
                             <p className="text-xs text-gray-400 uppercase font-black">{p.brand}</p>
                           </div>
                         </div>
                       </td>
                       <td className="px-8 py-4">
                          <span className="text-[10px] font-black uppercase px-3 py-1 bg-blue-50 text-blue-600 rounded-full">{p.category}</span>
                       </td>
                       <td className="px-8 py-4 font-black">₹{p.price.toLocaleString()}</td>
                       <td className="px-8 py-4">
                          <div className={`flex items-center space-x-2 font-black ${p.stock === 0 ? 'text-red-500' : p.stock <= 5 ? 'text-yellow-600' : 'text-green-600'}`}>
                             <div className={`w-2 h-2 rounded-full ${p.stock === 0 ? 'bg-red-500 animate-pulse' : p.stock <= 5 ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                             <span>{p.stock} Units</span>
                          </div>
                       </td>
                       <td className="px-8 py-4 text-right">
                          <button onClick={() => openEditProduct(p)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg mr-2"><Edit2 className="w-4 h-4" /></button>
                          <button onClick={() => deleteProduct(p.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          </div>
        )}

        {currentTab === 'orders' && (
          <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
             <div className="overflow-x-auto">
               <table className="w-full text-left">
                 <thead className="bg-gray-50 text-[10px] font-black uppercase tracking-widest text-gray-500">
                   <tr>
                     <th className="px-8 py-4">Order ID</th>
                     <th className="px-8 py-4">Customer</th>
                     <th className="px-8 py-4">Total</th>
                     <th className="px-8 py-4 text-center">Payment</th>
                     <th className="px-8 py-4">Status</th>
                     <th className="px-8 py-4 text-right">Details</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100">
                   {orders.map(o => (
                     <tr key={o.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedOrder(o)}>
                       <td className="px-8 py-6 font-mono text-xs text-blue-600 font-bold">{o.id}</td>
                       <td className="px-8 py-6">
                          <p className="font-bold">{o.customerName}</p>
                          <p className="text-xs text-gray-400">{o.email}</p>
                       </td>
                       <td className="px-8 py-6 font-black text-gray-900">₹{o.total.toLocaleString()}</td>
                       <td className="px-8 py-6 text-center">
                         <span className="text-[10px] font-black uppercase text-gray-500 border px-2 py-1 rounded-md">{o.paymentMethod || 'UPI'}</span>
                       </td>
                       <td className="px-8 py-6">
                          <span className="flex items-center space-x-1 text-[10px] font-black uppercase px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full w-fit">
                             <Clock className="w-3 h-3" />
                             <span>{o.status}</span>
                          </span>
                       </td>
                       <td className="px-8 py-6 text-right">
                          <button 
                            className="bg-gray-900 text-white text-xs font-black uppercase px-4 py-2 rounded-xl hover:bg-blue-600 transition-colors flex items-center space-x-2 ml-auto"
                          >
                             <Eye className="w-4 h-4" />
                             <span>Details</span>
                          </button>
                       </td>
                     </tr>
                   ))}
                   {orders.length === 0 && (
                     <tr><td colSpan={6} className="px-8 py-20 text-center text-gray-400 italic">No orders yet.</td></tr>
                   )}
                 </tbody>
               </table>
             </div>
          </div>
        )}

        {currentTab === 'customers' && (
          <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
             <div className="overflow-x-auto">
               <table className="w-full text-left">
                 <thead className="bg-gray-50 text-[10px] font-black uppercase tracking-widest text-gray-500">
                   <tr>
                     <th className="px-8 py-4">Customer Info</th>
                     <th className="px-8 py-4">Contact</th>
                     <th className="px-8 py-4 text-center">Orders</th>
                     <th className="px-8 py-4 text-right">Total Spent</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100">
                   {customers.map(c => (
                     <tr key={c.id} className="hover:bg-gray-50">
                       <td className="px-8 py-6">
                          <div className="flex items-center space-x-3">
                             <div className="w-10 h-10 bg-purple-100 text-purple-600 font-black rounded-full flex items-center justify-center">{c.name[0]}</div>
                             <p className="font-bold">{c.name}</p>
                          </div>
                       </td>
                       <td className="px-8 py-6">
                          <p className="text-sm font-medium">{c.email}</p>
                          <p className="text-xs text-gray-400">{c.phone}</p>
                       </td>
                       <td className="px-8 py-6 text-center font-black">{c.totalOrders}</td>
                       <td className="px-8 py-6 text-right font-black text-blue-600">₹{c.totalSpent.toLocaleString()}</td>
                     </tr>
                   ))}
                   {customers.length === 0 && (
                     <tr><td colSpan={4} className="px-8 py-20 text-center text-gray-400 italic">No customer data yet.</td></tr>
                   )}
                 </tbody>
               </table>
             </div>
          </div>
        )}
      </main>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedOrder(null)} />
          <div className="relative bg-white w-full max-w-3xl rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95">
             <div className="bg-gray-900 p-8 text-white flex justify-between items-center">
                <div>
                   <h2 className="text-2xl font-black tracking-tighter uppercase">Full Order Info</h2>
                   <p className="text-blue-400 font-mono text-xs font-bold">{selectedOrder.id}</p>
                </div>
                <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-white/10 rounded-full"><X /></button>
             </div>
             
             <div className="p-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                   <div className="p-6 bg-blue-50 rounded-3xl">
                      <p className="text-[10px] font-black text-blue-400 uppercase mb-3 flex items-center"><User className="w-3 h-3 mr-1" /> Customer</p>
                      <p className="font-bold text-blue-900 text-lg">{selectedOrder.customerName}</p>
                      <p className="text-xs text-blue-700/60 font-medium">{selectedOrder.email}</p>
                   </div>
                   <div className="p-6 bg-green-50 rounded-3xl">
                      <p className="text-[10px] font-black text-green-400 uppercase mb-3 flex items-center"><Phone className="w-3 h-3 mr-1" /> Contact</p>
                      <p className="font-bold text-green-900">{selectedOrder.phone}</p>
                      <p className="text-xs text-green-700/60 font-medium mt-1">Payment: {selectedOrder.paymentMethod}</p>
                   </div>
                   <div className="p-6 bg-purple-50 rounded-3xl">
                      <p className="text-[10px] font-black text-purple-400 uppercase mb-3 flex items-center"><MapPin className="w-3 h-3 mr-1" /> Address</p>
                      <p className="text-xs text-purple-900 leading-relaxed font-bold">{selectedOrder.address}</p>
                   </div>
                </div>

                <div className="mb-8">
                   <div className="flex items-center justify-between mb-4">
                      <p className="text-[10px] font-black text-gray-400 uppercase flex items-center"><Package className="w-3 h-3 mr-1" /> Order Inventory</p>
                      <span className="text-xs font-bold text-gray-500">{selectedOrder.items.length} unique items</span>
                   </div>
                   <div className="space-y-3">
                      {selectedOrder.items.map(item => (
                        <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-3xl hover:border-blue-200 transition-all">
                           <img src={item.images[0]} className="w-16 h-16 rounded-2xl object-cover bg-gray-100 border" />
                           <div className="flex-1">
                              <p className="font-bold text-gray-900">{item.name}</p>
                              <p className="text-[10px] text-gray-400 font-black uppercase">{item.brand} • QTY: {item.quantity}</p>
                           </div>
                           <div className="text-right">
                              <p className="font-black text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</p>
                              <p className="text-[8px] text-gray-400 font-bold uppercase">₹{item.price.toLocaleString()} ea.</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="bg-gray-900 rounded-[32px] p-8 flex flex-col md:flex-row justify-between items-center text-white">
                   <div className="flex items-center space-x-4 mb-4 md:mb-0">
                      <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
                        <CreditCard className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Grand Total</p>
                        <p className="text-3xl font-black tracking-tighter">₹{selectedOrder.total.toLocaleString()}</p>
                      </div>
                   </div>
                   <div className="flex space-x-2">
                      <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-2xl font-black uppercase text-xs transition-all">Download Invoice</button>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-black uppercase text-xs transition-all">Mark as Shipped</button>
                   </div>
                </div>
             </div>
          </div>
        </div>
      )}

      {/* Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95">
            <div className="p-8 border-b flex justify-between items-center bg-gray-50">
              <h2 className="text-2xl font-black uppercase tracking-tighter">{editingProduct ? 'Edit Product' : 'Add Arrival'}</h2>
              <button onClick={() => setIsModalOpen(false)}><X /></button>
            </div>
            <form onSubmit={handleSaveProduct} className="p-8 grid grid-cols-2 gap-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="col-span-2">
                <label className="text-xs font-black text-gray-500 uppercase">Product Name</label>
                <input required name="name" defaultValue={editingProduct?.name} className="w-full p-4 bg-gray-50 rounded-xl border mt-2 outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
              </div>
              <div className="col-span-2">
                <label className="text-xs font-black text-gray-500 uppercase">Brand</label>
                <input required list="brand-suggestions" name="brand" defaultValue={editingProduct?.brand} className="w-full p-4 bg-gray-50 rounded-xl border mt-2 outline-none focus:ring-2 focus:ring-blue-500" />
                <datalist id="brand-suggestions">
                  {SUPERCAR_BRANDS.map(b => <option key={b} value={b} />)}
                </datalist>
              </div>
              <div>
                <label className="text-xs font-black text-gray-500 uppercase">Price</label>
                <input required name="price" type="number" defaultValue={editingProduct?.price} className="w-full p-4 bg-gray-50 rounded-xl border mt-2 outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="text-xs font-black text-gray-500 uppercase">Category</label>
                <select name="category" defaultValue={editingProduct?.category} className="w-full p-4 bg-gray-50 rounded-xl border mt-2 outline-none">
                  <option value="Supercars">Supercars</option>
                  <option value="Toys">Toys</option>
                  <option value="Anime Figurines">Anime</option>
                  <option value="Baby Care">Baby Care</option>
                  <option value="Books">Books</option>
                  <option value="Art & Craft">Art & Craft</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-black text-gray-500 uppercase">Stock Units</label>
                <input required name="stock" type="number" defaultValue={editingProduct?.stock} className="w-full p-4 bg-gray-50 rounded-xl border mt-2 outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="text-xs font-black text-gray-500 uppercase">Scale</label>
                <input name="scale" defaultValue={editingProduct?.scale} placeholder="e.g. 1:64" className="w-full p-4 bg-gray-50 rounded-xl border mt-2 outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="col-span-2">
                <label className="text-xs font-black text-gray-500 uppercase">Gallery Images (URLs)</label>
                <textarea 
                  required 
                  name="images" 
                  defaultValue={editingProduct?.images.join('\n')} 
                  className="w-full p-4 bg-gray-50 rounded-xl border mt-2 outline-none focus:ring-2 focus:ring-blue-500 font-mono text-xs" 
                  rows={4}
                />
              </div>
              <div className="col-span-2">
                <label className="text-xs font-black text-gray-500 uppercase">Description</label>
                <textarea required name="description" defaultValue={editingProduct?.description} className="w-full p-4 bg-gray-50 rounded-xl border mt-2 outline-none focus:ring-2 focus:ring-blue-500" rows={3} />
              </div>
              <button type="submit" className="col-span-2 bg-blue-600 text-white p-5 rounded-2xl font-black uppercase tracking-widest shadow-xl hover:bg-blue-700 active:scale-95 transition-all">Save Changes</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );

  function openEditProduct(p: Product) {
    setEditingProduct(p);
    setIsModalOpen(true);
  }
};

const StatCard: React.FC<{ icon: any, label: string, value: string, color: string }> = ({ icon, label, value, color }) => (
  <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
    <div className={`w-14 h-14 ${color} rounded-[20px] flex items-center justify-center mb-6`}>
      {React.cloneElement(icon as React.ReactElement<any>, { className: 'w-7 h-7' })}
    </div>
    <p className="text-gray-400 font-black text-[10px] uppercase tracking-[0.2em] mb-2">{label}</p>
    <p className="text-3xl font-black text-gray-900 tracking-tighter">{value}</p>
  </div>
);

export default Admin;
