'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, signOut } from '@/lib/auth';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Package, 
  ShoppingBag, 
  Users, 
  DollarSign,
  Settings,
  LogOut,
  Home,
  BarChart3,
  Menu,
  X,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Filter,
  Calendar,
  Eye,
  ShoppingCart,
  CreditCard,
  Percent,
  Target,
  Activity,
  Clock,
  Star,
  Globe
} from 'lucide-react';

// Shared Sidebar Component
interface AdminSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  handleSignOut: () => void;
}

function AdminSidebar({ sidebarOpen, setSidebarOpen, handleSignOut }: AdminSidebarProps) {
  return (
    <>
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 h-screen w-64 bg-white border-r border-neutral-200
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-neutral-200">
            <Link href="/admin" className="text-xl font-bold text-purple-600">
              Admin
            </Link>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 hover:bg-neutral-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            <Link 
              href="/admin"
              className="flex items-center gap-3 px-3 py-2.5 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 rounded-lg transition-colors"
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">Dashboard</span>
            </Link>
            <Link 
              href="/admin/products"
              className="flex items-center gap-3 px-3 py-2.5 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 rounded-lg transition-colors"
            >
              <Package className="w-5 h-5" />
              <span className="font-medium">Products</span>
            </Link>
            <Link 
              href="/admin/orders"
              className="flex items-center gap-3 px-3 py-2.5 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 rounded-lg transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="font-medium">Orders</span>
            </Link>
            <Link 
              href="/admin/customers"
              className="flex items-center gap-3 px-3 py-2.5 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 rounded-lg transition-colors"
            >
              <Users className="w-5 h-5" />
              <span className="font-medium">Customers</span>
            </Link>
            <Link 
              href="/admin/analytics"
              className="flex items-center gap-3 px-3 py-2.5 bg-purple-50 text-purple-600 rounded-lg"
            >
              <BarChart3 className="w-5 h-5" />
              <span className="font-medium">Analytics</span>
            </Link>
            <Link 
              href="/admin/settings"
              className="flex items-center gap-3 px-3 py-2.5 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 rounded-lg transition-colors"
            >
              <Settings className="w-5 h-5" />
              <span className="font-medium">Settings</span>
            </Link>
          </nav>

          {/* User section */}
          <div className="p-3 border-t border-neutral-200">
            <Link 
              href="/"
              className="flex items-center gap-3 px-3 py-2.5 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors mb-1"
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">Visit Store</span>
            </Link>
            <button 
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default function AdminAnalyticsPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('7d');

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

  // Mock analytics data
  const revenueData = [
    { month: 'Jan', revenue: 12500, orders: 145 },
    { month: 'Feb', revenue: 18900, orders: 198 },
    { month: 'Mar', revenue: 22100, orders: 234 },
    { month: 'Apr', revenue: 19800, orders: 212 },
    { month: 'May', revenue: 25600, orders: 267 },
    { month: 'Jun', revenue: 31200, orders: 321 },
    { month: 'Jul', revenue: 28900, orders: 289 },
    { month: 'Aug', revenue: 34500, orders: 356 },
    { month: 'Sep', revenue: 38900, orders: 401 },
    { month: 'Oct', revenue: 45231, orders: 478 },
  ];

  const topProducts = [
    { name: 'Premium Wireless Earbuds', sales: 234, revenue: 18706.66 },
    { name: 'Smart Fitness Tracker', sales: 198, revenue: 20590.02 },
    { name: 'Designer Handbag Collection', sales: 156, revenue: 23398.44 },
    { name: 'Wireless Speaker Pro', sales: 145, revenue: 8698.55 },
    { name: 'Premium Laptop Backpack', sales: 123, revenue: 11068.77 },
  ];

  const categoryPerformance = [
    { category: 'Electronics', revenue: 45231.89, percentage: 42 },
    { category: 'Fashion', revenue: 32145.67, percentage: 30 },
    { category: 'Accessories', revenue: 21543.21, percentage: 20 },
    { category: 'Home', revenue: 8765.43, percentage: 8 },
  ];

  const maxRevenue = Math.max(...revenueData.map(d => d.revenue));

  return (
    <div className="min-h-screen bg-neutral-50">
      <AdminSidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen}
        handleSignOut={handleSignOut}
      />

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 h-16 bg-white border-b border-neutral-200">
          <div className="flex items-center justify-between h-full px-4 lg:px-8">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-neutral-100 rounded-lg"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-semibold text-neutral-900">Analytics</h1>
            </div>
            
            <div className="flex items-center gap-3">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 border border-neutral-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 lg:p-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl p-6 border border-neutral-200">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-neutral-600">Total Revenue</span>
                <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                  <TrendingUp className="w-4 h-4" />
                  <span>+24.3%</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-neutral-900 mb-1">GH₵ 45,231</div>
              <div className="text-sm text-neutral-500">This month</div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-neutral-200">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-neutral-600">Total Orders</span>
                <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                  <TrendingUp className="w-4 h-4" />
                  <span>+18.2%</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-neutral-900 mb-1">478</div>
              <div className="text-sm text-neutral-500">This month</div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-neutral-200">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-neutral-600">Avg Order Value</span>
                <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                  <TrendingUp className="w-4 h-4" />
                  <span>+5.1%</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-neutral-900 mb-1">GH₵ 94.63</div>
              <div className="text-sm text-neutral-500">Per order</div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-neutral-200">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-neutral-600">Conversion Rate</span>
                <div className="flex items-center gap-1 text-red-600 text-sm font-medium">
                  <TrendingDown className="w-4 h-4" />
                  <span>-2.4%</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-neutral-900 mb-1">3.24%</div>
              <div className="text-sm text-neutral-500">From visitors</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Revenue Chart */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-neutral-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-neutral-900">Revenue Overview</h2>
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                    <span>Revenue</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                {revenueData.map((data, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-12 text-sm font-medium text-neutral-600">{data.month}</div>
                    <div className="flex-1">
                      <div className="relative h-8 bg-neutral-100 rounded-lg overflow-hidden">
                        <div 
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-600 to-purple-400 rounded-lg transition-all duration-500"
                          style={{ width: `${(data.revenue / maxRevenue) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="w-24 text-right">
                      <div className="text-sm font-semibold text-neutral-900">GH₵ {(data.revenue / 1000).toFixed(1)}k</div>
                      <div className="text-xs text-neutral-500">{data.orders} orders</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Performance */}
            <div className="bg-white rounded-xl border border-neutral-200 p-6">
              <h2 className="text-lg font-semibold text-neutral-900 mb-6">Category Performance</h2>
              <div className="space-y-4">
                {categoryPerformance.map((category, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-neutral-900">{category.category}</span>
                      <span className="text-sm font-semibold text-neutral-900">
                        GH₵ {(category.revenue / 1000).toFixed(1)}k
                      </span>
                    </div>
                    <div className="relative h-2 bg-neutral-100 rounded-full overflow-hidden">
                      <div 
                        className="absolute inset-y-0 left-0 bg-purple-600 rounded-full"
                        style={{ width: `${category.percentage}%` }}
                      />
                    </div>
                    <div className="text-xs text-neutral-500 mt-1">{category.percentage}% of total</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Products */}
            <div className="bg-white rounded-xl border border-neutral-200 p-6">
              <h2 className="text-lg font-semibold text-neutral-900 mb-6">Top Selling Products</h2>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-bold text-purple-600">#{index + 1}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-neutral-900 truncate">{product.name}</div>
                      <div className="text-xs text-neutral-500">{product.sales} units sold</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-neutral-900">
                        GH₵ {(product.revenue / 1000).toFixed(1)}k
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl border border-neutral-200 p-6">
              <h2 className="text-lg font-semibold text-neutral-900 mb-6">Quick Stats</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div>
                    <div className="text-sm font-medium text-neutral-600">New Customers</div>
                    <div className="text-2xl font-bold text-neutral-900 mt-1">142</div>
                  </div>
                  <div className="flex items-center gap-1 text-green-600">
                    <ArrowUpRight className="w-5 h-5" />
                    <span className="text-sm font-medium">+28%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div>
                    <div className="text-sm font-medium text-neutral-600">Return Rate</div>
                    <div className="text-2xl font-bold text-neutral-900 mt-1">2.4%</div>
                  </div>
                  <div className="flex items-center gap-1 text-blue-600">
                    <ArrowDownRight className="w-5 h-5" />
                    <span className="text-sm font-medium">-1.2%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                  <div>
                    <div className="text-sm font-medium text-neutral-600">Cart Abandonment</div>
                    <div className="text-2xl font-bold text-neutral-900 mt-1">68.5%</div>
                  </div>
                  <div className="flex items-center gap-1 text-purple-600">
                    <ArrowDownRight className="w-5 h-5" />
                    <span className="text-sm font-medium">-5.2%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                  <div>
                    <div className="text-sm font-medium text-neutral-600">Avg Session Time</div>
                    <div className="text-2xl font-bold text-neutral-900 mt-1">4m 32s</div>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-600">
                    <ArrowUpRight className="w-5 h-5" />
                    <span className="text-sm font-medium">+12%</span>
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
