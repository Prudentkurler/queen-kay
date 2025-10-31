'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, signOut } from '@/lib/auth';
import Image from 'next/image';
import { 
  Package, 
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Search,
  Filter,
  Download,
  Upload,
  RefreshCw,
  Plus,
  Edit,
  Archive,
  BarChart3,
  XCircle
} from 'lucide-react';

// Shared Admin Sidebar Component
function AdminSidebar({ 
  sidebarOpen, 
  setSidebarOpen, 
  handleSignOut 
}: { 
  sidebarOpen: boolean; 
  setSidebarOpen: (open: boolean) => void;
  handleSignOut: () => void;
}) {
  return (
    <>
      <aside className={`
        fixed lg:fixed top-0 left-0 h-screen w-64 bg-white border-r border-neutral-200
        transform transition-transform duration-300 ease-in-out z-40
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-6 h-16 border-b border-neutral-200">
            <h1 className="text-xl font-bold text-neutral-900">Queen Kay</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <XCircle className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            <a href="/admin" className="flex items-center space-x-3 px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50 rounded-lg transition-colors">
              <Package className="w-5 h-5" />
              <span>Dashboard</span>
            </a>
            <a href="/admin/orders" className="flex items-center space-x-3 px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50 rounded-lg transition-colors">
              <Package className="w-5 h-5" />
              <span>Orders</span>
            </a>
            <a href="/admin/products" className="flex items-center space-x-3 px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50 rounded-lg transition-colors">
              <Package className="w-5 h-5" />
              <span>Products</span>
            </a>
            <a href="/admin/customers" className="flex items-center space-x-3 px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50 rounded-lg transition-colors">
              <Package className="w-5 h-5" />
              <span>Customers</span>
            </a>
            <a href="/admin/shipping" className="flex items-center space-x-3 px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50 rounded-lg transition-colors">
              <Package className="w-5 h-5" />
              <span>Shipping</span>
            </a>
            <a href="/admin/inventory" className="flex items-center space-x-3 px-4 py-3 text-sm font-medium text-white bg-purple-600 rounded-lg transition-colors">
              <Package className="w-5 h-5" />
              <span>Inventory</span>
            </a>
            <a href="/admin/analytics" className="flex items-center space-x-3 px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50 rounded-lg transition-colors">
              <BarChart3 className="w-5 h-5" />
              <span>Analytics</span>
            </a>
            <a href="/admin/settings" className="flex items-center space-x-3 px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50 rounded-lg transition-colors">
              <Package className="w-5 h-5" />
              <span>Settings</span>
            </a>
          </nav>

          <div className="p-4 border-t border-neutral-200">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <XCircle className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
}

export default function AdminInventoryPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      router.push('/signin');
    }
  }, [router]);

  const user = getCurrentUser();
  if (!user) return null;

  const handleSignOut = () => {
    signOut();
    router.push('/');
  };

  // Mock inventory data
  const inventory = [
    {
      id: '1',
      name: 'Premium Wireless Earbuds',
      sku: 'EAR-001',
      category: 'Electronics',
      currentStock: 45,
      reorderLevel: 20,
      reorderQuantity: 50,
      supplier: 'TechSupply Co.',
      lastRestocked: '2025-10-10',
      unitCost: 45.00,
      status: 'In Stock',
      image: '/products/1g.png',
      movement: '+15'
    },
    {
      id: '2',
      name: 'Designer Handbag Collection',
      sku: 'BAG-002',
      category: 'Fashion',
      currentStock: 12,
      reorderLevel: 15,
      reorderQuantity: 30,
      supplier: 'Fashion Hub',
      lastRestocked: '2025-10-08',
      unitCost: 95.00,
      status: 'Low Stock',
      image: '/products/2g.png',
      movement: '-8'
    },
    {
      id: '3',
      name: 'Smart Fitness Tracker',
      sku: 'FIT-003',
      category: 'Electronics',
      currentStock: 0,
      reorderLevel: 10,
      reorderQuantity: 40,
      supplier: 'TechSupply Co.',
      lastRestocked: '2025-09-25',
      unitCost: 65.00,
      status: 'Out of Stock',
      image: '/products/3g.png',
      movement: '-12'
    },
    {
      id: '4',
      name: 'Wireless Speaker Pro',
      sku: 'SPK-004',
      category: 'Electronics',
      currentStock: 78,
      reorderLevel: 25,
      reorderQuantity: 50,
      supplier: 'Audio Direct',
      lastRestocked: '2025-10-12',
      unitCost: 35.00,
      status: 'In Stock',
      image: '/products/4g.png',
      movement: '+22'
    },
    {
      id: '5',
      name: 'Gaming Gear Special',
      sku: 'GAME-005',
      category: 'Electronics',
      currentStock: 8,
      reorderLevel: 15,
      reorderQuantity: 35,
      supplier: 'GameTech Ltd',
      lastRestocked: '2025-10-05',
      unitCost: 42.00,
      status: 'Reorder Needed',
      image: '/products/5g.png',
      movement: '-18'
    },
  ];

  const stats = [
    {
      label: 'Total Products',
      value: '287',
      change: '+12 this month',
      icon: Package,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      label: 'Low Stock Items',
      value: '18',
      change: 'Needs attention',
      icon: AlertTriangle,
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      label: 'Out of Stock',
      value: '5',
      change: 'Reorder now',
      icon: XCircle,
      color: 'bg-red-100 text-red-600'
    },
    {
      label: 'Total Value',
      value: 'GH₵ 125.4K',
      change: '+8.2% vs last month',
      icon: TrendingUp,
      color: 'bg-green-100 text-green-600'
    },
  ];

  const categories = ['All', 'Electronics', 'Fashion', 'Accessories', 'Home', 'Sports'];
  const statuses = ['All', 'In Stock', 'Low Stock', 'Out of Stock', 'Reorder Needed'];

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock': return 'bg-green-100 text-green-700';
      case 'Low Stock': return 'bg-yellow-100 text-yellow-700';
      case 'Out of Stock': return 'bg-red-100 text-red-700';
      case 'Reorder Needed': return 'bg-orange-100 text-orange-700';
      default: return 'bg-neutral-100 text-neutral-700';
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <AdminSidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen}
        handleSignOut={handleSignOut}
      />

      <div className="lg:pl-64">
        <main className="p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-3xl font-bold text-neutral-900">Inventory Management</h1>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-4 py-2.5 border border-neutral-200 text-neutral-700 rounded-lg font-medium hover:bg-neutral-50 transition-colors">
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2.5 border border-neutral-200 text-neutral-700 rounded-lg font-medium hover:bg-neutral-50 transition-colors">
                    <Upload className="w-4 h-4" />
                    Import
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors">
                    <Plus className="w-4 h-4" />
                    Add Stock
                  </button>
                </div>
              </div>
              <p className="text-neutral-600">Monitor and manage your inventory levels</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl border border-neutral-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-neutral-900 mb-1">{stat.value}</p>
                  <p className="text-sm text-neutral-600 mb-1">{stat.label}</p>
                  <p className="text-xs text-neutral-500">{stat.change}</p>
                </div>
              ))}
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl border border-neutral-200 p-6 mb-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Search by product name or SKU..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div className="flex gap-3">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                  <button className="p-2.5 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
                    <RefreshCw className="w-5 h-5 text-neutral-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Inventory Table */}
            <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-neutral-50 border-b border-neutral-200">
                    <tr>
                      <th className="text-left py-4 px-6 text-xs font-semibold text-neutral-600 uppercase tracking-wider">Product</th>
                      <th className="text-left py-4 px-6 text-xs font-semibold text-neutral-600 uppercase tracking-wider">Stock Level</th>
                      <th className="text-left py-4 px-6 text-xs font-semibold text-neutral-600 uppercase tracking-wider">Reorder Info</th>
                      <th className="text-left py-4 px-6 text-xs font-semibold text-neutral-600 uppercase tracking-wider">Supplier</th>
                      <th className="text-left py-4 px-6 text-xs font-semibold text-neutral-600 uppercase tracking-wider">Movement</th>
                      <th className="text-left py-4 px-6 text-xs font-semibold text-neutral-600 uppercase tracking-wider">Status</th>
                      <th className="text-right py-4 px-6 text-xs font-semibold text-neutral-600 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {filteredInventory.map((item) => (
                      <tr key={item.id} className="hover:bg-neutral-50 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12 bg-neutral-100 rounded-lg overflow-hidden flex-shrink-0">
                              {item.image ? (
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  fill
                                  className="object-cover"
                                />
                              ) : (
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <Package className="w-6 h-6 text-neutral-400" />
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-neutral-900">{item.name}</p>
                              <p className="text-xs text-neutral-500">{item.sku} • {item.category}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-neutral-900">{item.currentStock} units</span>
                            <span className="text-xs text-neutral-500">GH₵ {item.unitCost.toFixed(2)} per unit</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex flex-col">
                            <span className="text-sm text-neutral-900">Level: {item.reorderLevel}</span>
                            <span className="text-xs text-neutral-500">Qty: {item.reorderQuantity} units</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex flex-col">
                            <span className="text-sm text-neutral-900">{item.supplier}</span>
                            <span className="text-xs text-neutral-500">Last: {item.lastRestocked}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-1">
                            {item.movement.startsWith('+') ? (
                              <TrendingUp className="w-4 h-4 text-green-600" />
                            ) : (
                              <TrendingDown className="w-4 h-4 text-red-600" />
                            )}
                            <span className={`text-sm font-medium ${item.movement.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                              {item.movement}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                            {item.status === 'Out of Stock' && <XCircle className="w-3.5 h-3.5" />}
                            {(item.status === 'Low Stock' || item.status === 'Reorder Needed') && <AlertTriangle className="w-3.5 h-3.5" />}
                            {item.status}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors" title="Edit">
                              <Edit className="w-4 h-4 text-neutral-600" />
                            </button>
                            <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors" title="Restock">
                              <Plus className="w-4 h-4 text-neutral-600" />
                            </button>
                            <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors" title="Archive">
                              <Archive className="w-4 h-4 text-neutral-600" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-neutral-600">
                Showing <span className="font-medium">{filteredInventory.length}</span> of <span className="font-medium">{inventory.length}</span> items
              </p>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 border border-neutral-200 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors">
                  Previous
                </button>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                  1
                </button>
                <button className="px-4 py-2 border border-neutral-200 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors">
                  Next
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
