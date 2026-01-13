
import React, { useState } from 'react';
import { 
  LayoutDashboard, Package, ShoppingBag, Users, Settings, 
  Plus, Search, Edit2, Trash2, X, TrendingUp, DollarSign, Box, Home, ChevronRight, AlertCircle, Clock, Eye, User, Phone, MapPin, CreditCard, Lock, Shield, Database, Download, Upload, Copy, CheckCircle2, Save, Image as ImageIcon
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Product, Page, Order, Customer } from '../types';
import { SUPERCAR_BRANDS } from '../constants';

type AdminTab = 'dashboard' | 'inventory' | 'orders' | 'customers' | 'system';

const Admin: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct, navigateTo, orders, customers, exportData, importData } = useApp();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState(false);
  
  const [currentTab, setCurrentTab] = useState<AdminTab>('inventory');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sync States
  const [syncCode, setSyncCode] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');

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

  const openAddModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
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
              placeholder="Secret Access Code"
              className={`w-full bg-black border ${error ? 'border-red-500' : 'border-gray-800'} rounded-2xl py-5 px-6 text-white text-center text-2xl tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-black placeholder:text-gray-700 placeholder:tracking-normal placeholder:text-sm`}
              autoFocus
            />
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl transition-all">Unlock Dashboard</button>
          </form>
          <button onClick={() => navigateTo(Page.Home)} className="w-full mt-10 text-gray-600 hover:text-white transition-colors font-bold text-sm uppercase tracking-widest">Return to Store</button>
        </div>
      </div>
    );
  }

  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);
  const totalStock = products.reduce((acc, p) => acc + p.stock, 0);
  const lowStockCount = products.filter(p => p.stock > 0 && p.stock <= 5).length;

  const handleExport = () => {
    const code = exportData();
    navigator.clipboard.writeText(code);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleImport = () => {
    const success = importData(syncCode);
    if (success) {
      setImportStatus('success');
      setSyncCode('');
      setTimeout(() => setImportStatus('idle'), 3000);
    } else {
      setImportStatus('error');
      setTimeout(() => setImportStatus('idle'), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-gray-900 text-white p-6 md:sticky md:top-0 md:h-screen flex flex-col z-20">
        <div className="flex items-center space-x-3 mb-10">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center"><Settings className="w-6 h-6 text-white" /></div>
          <span className="text-xl font-black tracking-tighter uppercase">Vroomm<span className="text-blue-400">Admin</span></span>
        </div>
        <nav className="space-y-2 flex-1">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'inventory', label: 'Inventory', icon: Package },
            { id: 'orders', label: 'Orders', icon: ShoppingBag },
            { id: 'customers', label: 'Customers', icon: Users },
            { id: 'system', label: 'System', icon: Database },
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => setCurrentTab(item.id as AdminTab)}
              className={`w-full flex items-center justify-between p-3 rounded-xl font-bold transition-all ${currentTab === item.id ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
            >
              <div className="flex items-center space-x-3"><item.icon className="w-5 h-5" /><span>{item.label}</span></div>
            </button>
          ))}
        </nav>
        <button onClick={() => navigateTo(Page.Home)} className="w-full flex items-center space-x-3 text-gray-400 hover:text-white p-3 rounded-xl font-bold mt-6 border-t border-gray-800"><Home className="w-5 h-5" /><span>Go to Store</span></button>
      </aside>

      <main className="flex-1 p-4 md:p-8 pb-32">
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 capitalize">{currentTab}</h1>
            <p className="text-gray-500 font-medium text-sm">Manage your Vroommkart operations.</p>
          </div>
          {currentTab === 'inventory' && (
            <button 
              onClick={openAddModal}
              className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-[11px] flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/20 active:scale-95 transition-transform"
            >
              <Plus className="w-4 h-4" />
              <span>Add Product</span>
            </button>
          )}
        </header>

        {currentTab === 'dashboard' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            <StatCard icon={<Box className="text-blue-600" />} label="Live Stock" value={totalStock.toString()} color="bg-blue-50" />
            <StatCard icon={<ShoppingBag className="text-green-600" />} label="Total Sales" value={orders.length.toString()} color="bg-green-50" />
            <StatCard icon={<DollarSign className="text-purple-600" />} label="Revenue" value={`₹${totalRevenue.toLocaleString()}`} color="bg-purple-50" />
            <StatCard icon={<AlertCircle className="text-yellow-600" />} label="Low Stock" value={lowStockCount.toString()} color="bg-yellow-50" />
          </div>
        )}

        {currentTab === 'inventory' && (
           <div className="bg-white rounded-3xl md:rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
             <div className="p-4 md:p-8 border-b flex items-center space-x-4">
                <Search className="text-gray-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Filter stock by name or brand..." 
                  className="bg-transparent border-none outline-none flex-1 font-medium text-sm md:text-base"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>
             <div className="overflow-x-auto">
               <table className="w-full text-left">
                 <thead className="bg-gray-50 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-500">
                   <tr>
                     <th className="px-4 md:px-8 py-4">Product Info</th>
                     <th className="hidden md:table-cell px-8 py-4">Category</th>
                     <th className="px-4 md:px-8 py-4">Price</th>
                     <th className="px-4 md:px-8 py-4">In Stock</th>
                     <th className="px-4 md:px-8 py-4 text-right">Actions</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100">
                   {products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.brand.toLowerCase().includes(searchTerm.toLowerCase())).map(p => (
                     <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                       <td className="px-4 md:px-8 py-4">
                         <div className="flex items-center space-x-3">
                           <img src={p.images[0]} className="w-10 h-10 md:w-12 md:h-12 rounded-xl object-cover bg-gray-100 border" />
                           <div className="min-w-0">
                             <p className="font-bold text-gray-900 text-xs md:text-sm truncate max-w-[120px] md:max-w-none">{p.name}</p>
                             <p className="text-[9px] text-gray-400 uppercase font-black">{p.brand}</p>
                           </div>
                         </div>
                       </td>
                       <td className="hidden md:table-cell px-8 py-4">
                          <span className="text-[9px] font-black uppercase px-3 py-1 bg-blue-50 text-blue-600 rounded-full">{p.category}</span>
                       </td>
                       <td className="px-4 md:px-8 py-4 font-black text-xs md:text-sm">₹{p.price.toLocaleString()}</td>
                       <td className="px-4 md:px-8 py-4">
                          <div className={`flex items-center space-x-2 font-black text-[10px] md:text-xs ${p.stock === 0 ? 'text-red-500' : p.stock <= 5 ? 'text-yellow-600' : 'text-green-600'}`}>
                             <span>{p.stock} Units</span>
                          </div>
                       </td>
                       <td className="px-4 md:px-8 py-4 text-right">
                          <div className="flex items-center justify-end space-x-1 md:space-x-2">
                            <button onClick={() => {setEditingProduct(p); setIsModalOpen(true);}} className="p-2 text-blue-500 bg-blue-50 rounded-lg"><Edit2 className="w-3 h-3 md:w-4 h-4" /></button>
                            <button onClick={() => deleteProduct(p.id)} className="p-2 text-red-500 bg-red-50 rounded-lg"><Trash2 className="w-3 h-3 md:w-4 h-4" /></button>
                          </div>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          </div>
        )}

        {currentTab === 'system' && (
          <div className="max-w-4xl space-y-8 animate-in fade-in duration-500">
            <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
              <div className="flex items-center space-x-3 mb-6">
                 <div className="p-3 bg-blue-100 rounded-2xl"><Download className="w-6 h-6 text-blue-600" /></div>
                 <div>
                    <h3 className="text-xl font-black">Export Catalog</h3>
                    <p className="text-sm text-gray-500">Copy this code from your PC to move data to your Phone.</p>
                 </div>
              </div>
              <button 
                onClick={handleExport}
                className="w-full flex items-center justify-center space-x-2 bg-gray-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-600 transition-all"
              >
                {copySuccess ? <CheckCircle2 className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                <span>{copySuccess ? 'Copied to Clipboard!' : 'Copy Backup Code'}</span>
              </button>
            </div>

            <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
              <div className="flex items-center space-x-3 mb-6">
                 <div className="p-3 bg-purple-100 rounded-2xl"><Upload className="w-6 h-6 text-purple-600" /></div>
                 <div>
                    <h3 className="text-xl font-black">Import Catalog</h3>
                    <p className="text-sm text-gray-500">Paste the backup code here to update this device's data.</p>
                 </div>
              </div>
              <textarea 
                value={syncCode}
                onChange={(e) => setSyncCode(e.target.value)}
                placeholder="Paste the backup code here..."
                className="w-full bg-gray-50 border border-gray-100 p-6 rounded-3xl h-32 mb-6 font-mono text-xs focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button 
                onClick={handleImport}
                disabled={!syncCode}
                className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest disabled:opacity-50 hover:bg-blue-700 transition-all shadow-xl"
              >
                {importStatus === 'success' ? 'Data Updated Successfully!' : importStatus === 'error' ? 'Invalid Code!' : 'Import Now'}
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Product Modal */}
      {isModalOpen && (
        <ProductModal 
          product={editingProduct} 
          onClose={() => setIsModalOpen(false)} 
          onSave={(p) => {
            if (editingProduct) updateProduct(p);
            else addProduct(p);
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onSave: (product: Product) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onSave }) => {
  const [formData, setFormData] = useState<Partial<Product>>(product || {
    id: `prod-${Date.now()}`,
    name: '',
    brand: '',
    price: 0,
    category: 'Toys',
    images: [''],
    description: '',
    rating: 5,
    reviews: 0,
    stock: 10,
    scale: '1:64'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as Product);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 max-h-[90vh] flex flex-col">
        <div className="p-6 md:p-8 bg-gray-50 border-b flex justify-between items-center">
          <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button onClick={onClose} className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 md:p-8 overflow-y-auto space-y-6 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Product Name</label>
              <input 
                required
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="e.g. Nissan Skyline R34" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Brand</label>
              <input 
                required
                value={formData.brand}
                onChange={e => setFormData({...formData, brand: e.target.value})}
                className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="e.g. Mini GT" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Price (₹)</label>
              <input 
                required
                type="number"
                value={formData.price}
                onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Stock Units</label>
              <input 
                required
                type="number"
                value={formData.stock}
                onChange={e => setFormData({...formData, stock: Number(e.target.value)})}
                className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Category</label>
              <select 
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value as any})}
                className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Toys">Toys</option>
                <option value="Supercars">Supercars</option>
                <option value="Anime Figurines">Anime Figurines</option>
                <option value="Baby Care">Baby Care</option>
                <option value="Books">Books</option>
                <option value="Art & Craft">Art & Craft</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Scale (Optional)</label>
              <input 
                value={formData.scale}
                onChange={e => setFormData({...formData, scale: e.target.value})}
                className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="e.g. 1:64" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Image URL</label>
            <div className="flex space-x-2">
              <input 
                required
                value={formData.images?.[0]}
                onChange={e => setFormData({...formData, images: [e.target.value]})}
                className="flex-1 bg-gray-50 border border-gray-100 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="https://images.unsplash.com/..." 
              />
              <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center border border-gray-200 overflow-hidden">
                {formData.images?.[0] ? <img src={formData.images[0]} className="w-full h-full object-cover" /> : <ImageIcon className="text-gray-400" />}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Description</label>
            <textarea 
              required
              rows={3}
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="Full product details..." 
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl flex items-center justify-center space-x-2 hover:bg-blue-700 active:scale-95 transition-all"
          >
            <Save className="w-5 h-5" />
            <span>Save Product</span>
          </button>
        </form>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ icon: any, label: string, value: string, color: string }> = ({ icon, label, value, color }) => (
  <div className="bg-white p-6 md:p-8 rounded-3xl md:rounded-[40px] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
    <div className={`w-10 h-10 md:w-14 md:h-14 ${color} rounded-xl md:rounded-[20px] flex items-center justify-center mb-4 md:mb-6`}>
      {React.cloneElement(icon as React.ReactElement<any>, { className: 'w-5 h-5 md:w-7 h-7' })}
    </div>
    <p className="text-gray-400 font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] mb-1 md:mb-2">{label}</p>
    <p className="text-xl md:text-3xl font-black text-gray-900 tracking-tighter">{value}</p>
  </div>
);

export default Admin;
