'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, signOut } from '@/lib/auth';
import Link from 'next/link';
import { 
  Package, 
  ShoppingBag, 
  Heart, 
  User, 
  Settings,
  LogOut,
  Home,
  Clock,
  TrendingUp,
  DollarSign,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { useCart } from '@/store/useCart';

export default function DashboardPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const totalItems = useCart((state) => state.totalItems());
  const subtotal = useCart((state) => state.subtotal());

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

  // Mock data for recent orders
  const recentOrders = [
    { id: '1234', date: '2025-10-15', status: 'Delivered', total: 299.99, items: 3 },
    { id: '1235', date: '2025-10-10', status: 'In Transit', total: 149.50, items: 2 },
    { id: '1236', date: '2025-10-05', status: 'Processing', total: 89.99, items: 1 },
  ];

  // Mock spending data for chart
  const spendingData = [
    { month: 'Jun', amount: 120 },
    { month: 'Jul', amount: 250 },
    { month: 'Aug', amount: 180 },
    { month: 'Sep', amount: 320 },
    { month: 'Oct', amount: 540 },
  ];

  const maxSpending = Math.max(...spendingData.map(d => d.amount));

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
            <h1 className="text-xl font-semibold text-neutral-900">Dashboard</h1>
          </div>
          <div className="flex items-center space-x-3">
            <Link href="/">
              <button className="px-4 py-2 text-sm text-neutral-700 hover:text-neutral-900 transition-colors">
                Back to Store
              </button>
            </Link>
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
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
            <Link href="/dashboard">
              <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium text-white bg-blue-500 rounded-lg transition-colors">
                <Home className="w-5 h-5" />
                <span>Overview</span>
              </button>
            </Link>
            <Link href="/dashboard/orders">
              <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50 rounded-lg transition-colors">
                <Package className="w-5 h-5" />
                <span>My Orders</span>
              </button>
            </Link>
            <Link href="/shop/cart">
              <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50 rounded-lg transition-colors">
                <ShoppingBag className="w-5 h-5" />
                <span>Shopping Cart</span>
                {totalItems > 0 && (
                  <span className="ml-auto bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                    {totalItems}
                  </span>
                )}
              </button>
            </Link>
            <Link href="/dashboard/wishlist">
              <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50 rounded-lg transition-colors">
                <Heart className="w-5 h-5" />
                <span>Wishlist</span>
              </button>
            </Link>
            <Link href="/dashboard/profile">
              <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50 rounded-lg transition-colors">
                <User className="w-5 h-5" />
                <span>Profile</span>
              </button>
            </Link>
            <Link href="/dashboard/settings">
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
              <h2 className="text-2xl font-bold text-neutral-900 mb-1">Welcome back, {user.name}!</h2>
              <p className="text-neutral-600">Here&apos;s what&apos;s happening with your account today.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg border border-neutral-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Package className="w-6 h-6 text-blue-500" />
                  </div>
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    +12%
                  </span>
                </div>
                <p className="text-2xl font-bold text-neutral-900 mb-1">3</p>
                <p className="text-sm text-neutral-600">Total Orders</p>
              </div>

              <div className="bg-white rounded-lg border border-neutral-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-purple-500" />
                  </div>
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    +8%
                  </span>
                </div>
                <p className="text-2xl font-bold text-neutral-900 mb-1">GH₵ {subtotal.toFixed(2)}</p>
                <p className="text-sm text-neutral-600">Cart Value</p>
              </div>

              <div className="bg-white rounded-lg border border-neutral-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6 text-orange-500" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-neutral-900 mb-1">{totalItems}</p>
                <p className="text-sm text-neutral-600">Items in Cart</p>
              </div>

              <div className="bg-white rounded-lg border border-neutral-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                    <Heart className="w-6 h-6 text-pink-500" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-neutral-900 mb-1">0</p>
                <p className="text-sm text-neutral-600">Wishlist Items</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Spending Chart */}
              <div className="lg:col-span-2 bg-white rounded-lg border border-neutral-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-neutral-900">Monthly Spending</h3>
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <div className="space-y-4">
                  {spendingData.map((data) => (
                    <div key={data.month}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-neutral-700">{data.month}</span>
                        <span className="text-sm font-semibold text-neutral-900">${data.amount}</span>
                      </div>
                      <div className="w-full bg-neutral-100 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(data.amount / maxSpending) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg border border-neutral-200 p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Link href="/shop">
                    <button className="w-full flex items-center justify-between px-4 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors">
                      <span className="text-sm font-medium">Browse Products</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </Link>
                  <Link href="/shop/cart">
                    <button className="w-full flex items-center justify-between px-4 py-3 bg-neutral-50 hover:bg-neutral-100 text-neutral-700 rounded-lg transition-colors">
                      <span className="text-sm font-medium">View Cart</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </Link>
                  <Link href="/dashboard/orders">
                    <button className="w-full flex items-center justify-between px-4 py-3 bg-neutral-50 hover:bg-neutral-100 text-neutral-700 rounded-lg transition-colors">
                      <span className="text-sm font-medium">Track Orders</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </Link>
                  <Link href="/contact">
                    <button className="w-full flex items-center justify-between px-4 py-3 bg-neutral-50 hover:bg-neutral-100 text-neutral-700 rounded-lg transition-colors">
                      <span className="text-sm font-medium">Contact Support</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="mt-6 bg-white rounded-lg border border-neutral-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-neutral-900">Recent Orders</h3>
                <Link href="/dashboard/orders">
                  <button className="text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors">
                    View All
                  </button>
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="text-left py-3 px-4 text-sm font-medium text-neutral-600">Order ID</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-neutral-600">Date</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-neutral-600">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-neutral-600">Items</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-neutral-600">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                        <td className="py-4 px-4">
                          <span className="text-sm font-medium text-neutral-900">#{order.id}</span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-neutral-400" />
                            <span className="text-sm text-neutral-600">{order.date}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                            order.status === 'In Transit' ? 'bg-blue-100 text-blue-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm text-neutral-600">{order.items} items</span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <span className="text-sm font-semibold text-neutral-900">${order.total.toFixed(2)}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
