'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, signOut } from '@/lib/auth';
import Link from 'next/link';
import { 
  Package, 
  ShoppingBag, 
  Users, 
  DollarSign,
  Settings,
  LogOut,
  Home,
  BarChart3,
  Plus,
  Search,
  Menu,
  X,
  TrendingUp,
  TrendingDown,
  Edit,
  Trash2,
  Eye,
  Filter
} from 'lucide-react';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      router.push('/signin');
    }
    // In production, add admin role check here
  }, [router]);

  const user = getCurrentUser();
  if (!user) return null;

  const handleSignOut = () => {
    signOut();
    router.push('/');
  };

  // Enhanced admin stats with more detail
  const stats = [
    { 
      label: 'Total Revenue', 
      value: 'GH₵ 45,231.89', 
      change: '+20.1%', 
      trend: 'up',
      icon: DollarSign,
      color: 'bg-gradient-to-br from-green-500 to-emerald-600',
      description: 'vs last month',
      subValue: 'GH₵ 1,507/day avg'
    },
    { 
      label: 'Total Orders', 
      value: '2,345', 
      change: '+15.3%', 
      trend: 'up',
      icon: ShoppingBag,
      color: 'bg-gradient-to-br from-blue-500 to-cyan-600',
      description: 'vs last month',
      subValue: '78 orders today'
    },
    { 
      label: 'Total Products', 
      value: '287', 
      change: '+12', 
      trend: 'up',
      icon: Package,
      color: 'bg-gradient-to-br from-purple-500 to-violet-600',
      description: 'in catalog',
      subValue: '18 low stock'
    },
    { 
      label: 'Active Customers', 
      value: '1,234', 
      change: '+8.2%', 
      trend: 'up',
      icon: Users,
      color: 'bg-gradient-to-br from-orange-500 to-red-600',
      description: 'this month',
      subValue: '42 new signups'
    },
  ];

  // Mock recent orders
  const recentOrders = [
    { id: 'ORD-2345', customer: 'John Doe', product: 'Premium Wireless Earbuds', amount: 79.99, status: 'Pending', date: '2025-10-17' },
    { id: 'ORD-2344', customer: 'Sarah Johnson', product: 'Designer Handbag', amount: 149.99, status: 'Processing', date: '2025-10-17' },
    { id: 'ORD-2343', customer: 'Michael Chen', product: 'Smart Fitness Tracker', amount: 103.99, status: 'Shipped', date: '2025-10-16' },
    { id: 'ORD-2342', customer: 'Emma Rodriguez', product: 'Wireless Speaker Pro', amount: 59.99, status: 'Delivered', date: '2025-10-16' },
    { id: 'ORD-2341', customer: 'David Wilson', product: 'Gaming Gear Special', amount: 69.99, status: 'Cancelled', date: '2025-10-15' },
  ];

  // Mock products
  const products = [
    { id: '1', name: 'Premium Wireless Earbuds', category: 'Electronics', price: 79.99, stock: 45, status: 'In Stock' },
    { id: '2', name: 'Designer Handbag Collection', category: 'Fashion', price: 149.99, stock: 12, status: 'Low Stock' },
    { id: '3', name: 'Smart Fitness Tracker', category: 'Electronics', price: 103.99, stock: 0, status: 'Out of Stock' },
    { id: '4', name: 'Wireless Speaker Pro', category: 'Electronics', price: 59.99, stock: 78, status: 'In Stock' },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-neutral-200 sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h1 className="text-xl font-semibold text-neutral-900">Admin Dashboard</h1>
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
              <Search className="w-5 h-5 text-neutral-600" />
            </button>
            <Link href="/">
              <button className="px-4 py-2 text-sm text-neutral-700 hover:text-neutral-900 transition-colors">
                Visit Store
              </button>
            </Link>
            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white border-r border-neutral-200 
          transform transition-transform duration-300 ease-in-out z-30
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <nav className="p-4 space-y-1">
            <Link href="/admin">
              <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium text-white bg-purple-500 rounded-lg transition-colors">
                <Home className="w-5 h-5" />
                <span>Dashboard</span>
              </button>
            </Link>
            <Link href="/admin/orders">
              <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50 rounded-lg transition-colors">
                <ShoppingBag className="w-5 h-5" />
                <span>Orders</span>
              </button>
            </Link>
            <Link href="/admin/products">
              <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50 rounded-lg transition-colors">
                <Package className="w-5 h-5" />
                <span>Products</span>
              </button>
            </Link>
            <Link href="/admin/customers">
              <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50 rounded-lg transition-colors">
                <Users className="w-5 h-5" />
                <span>Customers</span>
              </button>
            </Link>
            <Link href="/admin/analytics">
              <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50 rounded-lg transition-colors">
                <BarChart3 className="w-5 h-5" />
                <span>Analytics</span>
              </button>
            </Link>
            <Link href="/admin/settings">
              <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </button>
            </Link>

            <div className="pt-4 border-t border-neutral-200">
              <button
                onClick={handleSignOut}
                className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </nav>
        </aside>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-1">Welcome back, Admin!</h2>
              <p className="text-neutral-600">Here&apos;s what&apos;s happening with your store today.</p>
            </div>

            {/* Enhanced Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="group relative bg-white rounded-2xl border border-neutral-200 p-6 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 overflow-hidden">
                  {/* Background Gradient Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-14 h-14 ${stat.color} rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                        <stat.icon className="w-7 h-7 text-white" />
                      </div>
                      <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm ${
                        stat.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {stat.trend === 'up' ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                        {stat.change}
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-neutral-900 mb-2">{stat.value}</p>
                    <p className="text-sm font-medium text-neutral-900 mb-1">{stat.label}</p>
                    <p className="text-xs text-neutral-500">{stat.description}</p>
                    <div className="mt-3 pt-3 border-t border-neutral-100">
                      <p className="text-xs font-medium text-neutral-600">{stat.subValue}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Orders */}
              <div className="lg:col-span-2 bg-white rounded-lg border border-neutral-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-neutral-900">Recent Orders</h3>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
                      <Filter className="w-4 h-4 text-neutral-600" />
                    </button>
                    <Link href="/admin/orders">
                      <button className="text-sm font-medium text-purple-500 hover:text-purple-600 transition-colors">
                        View All
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-neutral-200">
                        <th className="text-left py-3 px-2 text-xs font-medium text-neutral-600">Order ID</th>
                        <th className="text-left py-3 px-2 text-xs font-medium text-neutral-600">Customer</th>
                        <th className="text-left py-3 px-2 text-xs font-medium text-neutral-600">Product</th>
                        <th className="text-left py-3 px-2 text-xs font-medium text-neutral-600">Amount</th>
                        <th className="text-left py-3 px-2 text-xs font-medium text-neutral-600">Status</th>
                        <th className="text-right py-3 px-2 text-xs font-medium text-neutral-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                          <td className="py-3 px-2">
                            <span className="text-sm font-medium text-neutral-900">{order.id}</span>
                          </td>
                          <td className="py-3 px-2">
                            <span className="text-sm text-neutral-600">{order.customer}</span>
                          </td>
                          <td className="py-3 px-2">
                            <span className="text-sm text-neutral-600 line-clamp-1">{order.product}</span>
                          </td>
                          <td className="py-3 px-2">
                            <span className="text-sm font-medium text-neutral-900">GH₵ {order.amount}</span>
                          </td>
                          <td className="py-3 px-2">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                              order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                              order.status === 'Processing' ? 'bg-yellow-100 text-yellow-700' :
                              order.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="py-3 px-2">
                            <div className="flex items-center justify-end space-x-2">
                              <button className="p-1 hover:bg-neutral-100 rounded transition-colors">
                                <Eye className="w-4 h-4 text-neutral-600" />
                              </button>
                              <button className="p-1 hover:bg-neutral-100 rounded transition-colors">
                                <Edit className="w-4 h-4 text-neutral-600" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Quick Actions & Products */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <div className="bg-white rounded-lg border border-neutral-200 p-6">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Link href="/admin/products/new">
                      <button className="w-full flex items-center justify-center px-4 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors">
                        <Plus className="w-4 h-4 mr-2" />
                        <span className="text-sm font-medium">Add Product</span>
                      </button>
                    </Link>
                    <Link href="/admin/orders">
                      <button className="w-full flex items-center justify-center px-4 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 rounded-lg transition-colors">
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        <span className="text-sm font-medium">View Orders</span>
                      </button>
                    </Link>
                    <Link href="/admin/customers">
                      <button className="w-full flex items-center justify-center px-4 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 rounded-lg transition-colors">
                        <Users className="w-4 h-4 mr-2" />
                        <span className="text-sm font-medium">Manage Customers</span>
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Low Stock Products */}
                <div className="bg-white rounded-lg border border-neutral-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-neutral-900">Low Stock Alert</h3>
                    <span className="bg-red-100 text-red-700 text-xs font-medium px-2 py-1 rounded-full">
                      2 Items
                    </span>
                  </div>
                  <div className="space-y-3">
                    {products.filter(p => p.status !== 'In Stock').map((product) => (
                      <div key={product.id} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-neutral-900 line-clamp-1">{product.name}</p>
                          <p className="text-xs text-neutral-600">{product.category}</p>
                        </div>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          product.status === 'Out of Stock' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {product.stock} left
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
