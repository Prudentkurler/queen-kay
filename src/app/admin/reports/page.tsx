'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, signOut } from '@/lib/auth';
import Image from 'next/image';
import { 
  Package, 
  TrendingUp,
  TrendingDown,
  Download,
  Calendar,
  ShoppingCart,
  DollarSign,
  Users,
  Eye,
  Percent,
  Target,
  Activity,
  Clock,
  Star,
  Globe,
  CreditCard,
  ShoppingBag,
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
              <ShoppingBag className="w-5 h-5" />
              <span>Orders</span>
            </a>
            <a href="/admin/products" className="flex items-center space-x-3 px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50 rounded-lg transition-colors">
              <Package className="w-5 h-5" />
              <span>Products</span>
            </a>
            <a href="/admin/customers" className="flex items-center space-x-3 px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50 rounded-lg transition-colors">
              <Users className="w-5 h-5" />
              <span>Customers</span>
            </a>
            <a href="/admin/shipping" className="flex items-center space-x-3 px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50 rounded-lg transition-colors">
              <Package className="w-5 h-5" />
              <span>Shipping</span>
            </a>
            <a href="/admin/inventory" className="flex items-center space-x-3 px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50 rounded-lg transition-colors">
              <Package className="w-5 h-5" />
              <span>Inventory</span>
            </a>
            <a href="/admin/analytics" className="flex items-center space-x-3 px-4 py-3 text-sm font-medium text-white bg-purple-600 rounded-lg transition-colors">
              <Activity className="w-5 h-5" />
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

export default function AdvancedAnalyticsPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

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

  // Advanced Analytics Data
  const keyMetrics = [
    {
      label: 'Total Revenue',
      value: 'GH₵ 125,430',
      change: '+23.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'bg-green-500',
      description: 'vs last period'
    },
    {
      label: 'Conversion Rate',
      value: '3.24%',
      change: '+0.8%',
      trend: 'up',
      icon: Target,
      color: 'bg-blue-500',
      description: 'of all visitors'
    },
    {
      label: 'Avg Order Value',
      value: 'GH₵ 142.50',
      change: '+12.3%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'bg-purple-500',
      description: 'per transaction'
    },
    {
      label: 'Customer LTV',
      value: 'GH₵ 487.20',
      change: '+18.4%',
      trend: 'up',
      icon: Users,
      color: 'bg-orange-500',
      description: 'lifetime value'
    },
  ];

  // Revenue Chart Data (Last 30 days)
  const revenueChart = [
    { day: '1', revenue: 3200, orders: 28 },
    { day: '3', revenue: 3800, orders: 32 },
    { day: '5', revenue: 4100, orders: 35 },
    { day: '7', revenue: 3900, orders: 31 },
    { day: '9', revenue: 4500, orders: 38 },
    { day: '11', revenue: 5200, orders: 42 },
    { day: '13', revenue: 4800, orders: 39 },
    { day: '15', revenue: 5600, orders: 45 },
    { day: '17', revenue: 6100, orders: 48 },
    { day: '19', revenue: 5800, orders: 46 },
    { day: '21', revenue: 6500, orders: 51 },
    { day: '23', revenue: 7200, orders: 56 },
    { day: '25', revenue: 6800, orders: 53 },
    { day: '27', revenue: 7500, orders: 58 },
    { day: '29', revenue: 8200, orders: 62 },
    { day: '30', revenue: 7800, orders: 59 },
  ];

  const topProducts = [
    {
      id: '1',
      name: 'Premium Wireless Earbuds',
      sales: 342,
      revenue: 27336,
      image: '/products/1g.png',
      trend: '+23%',
      rating: 4.8
    },
    {
      id: '2',
      name: 'Smart Fitness Tracker',
      sales: 289,
      revenue: 30053,
      image: '/products/3g.png',
      trend: '+18%',
      rating: 4.6
    },
    {
      id: '3',
      name: 'Designer Handbag',
      sales: 234,
      revenue: 35098,
      image: '/products/2g.png',
      trend: '+31%',
      rating: 4.9
    },
    {
      id: '4',
      name: 'Wireless Speaker Pro',
      sales: 198,
      revenue: 11880,
      image: '/products/4g.png',
      trend: '+12%',
      rating: 4.5
    },
  ];

  const trafficSources = [
    { source: 'Direct', visitors: 12430, percentage: 42, color: 'bg-purple-500' },
    { source: 'Social Media', visitors: 8920, percentage: 30, color: 'bg-blue-500' },
    { source: 'Search', visitors: 5960, percentage: 20, color: 'bg-green-500' },
    { source: 'Referral', visitors: 2380, percentage: 8, color: 'bg-orange-500' },
  ];

  const recentActivity = [
    { action: 'New order placed', customer: 'John Doe', time: '2 min ago', amount: 'GH₵ 142.50', type: 'order' },
    { action: 'Product review', customer: 'Sarah Johnson', time: '15 min ago', rating: 5, type: 'review' },
    { action: 'New customer signup', customer: 'Michael Chen', time: '32 min ago', type: 'customer' },
    { action: 'Payment received', customer: 'Emma Rodriguez', time: '1 hour ago', amount: 'GH₵ 89.99', type: 'payment' },
    { action: 'Order shipped', customer: 'David Wilson', time: '2 hours ago', tracking: 'DHL-123456', type: 'shipping' },
  ];

  const maxRevenue = Math.max(...revenueChart.map(d => d.revenue));

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-purple-50/30 to-neutral-50">
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
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-neutral-900 mb-2">Analytics Dashboard</h1>
                  <p className="text-neutral-600">Comprehensive insights into your business performance</p>
                </div>
                <div className="flex items-center gap-3">
                  <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="px-4 py-2.5 border border-neutral-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm font-medium"
                  >
                    <option value="7d">Last 7 days</option>
                    <option value="30d">Last 30 days</option>
                    <option value="90d">Last 90 days</option>
                    <option value="365d">Last year</option>
                  </select>
                  <button className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors">
                    <Download className="w-4 h-4" />
                    Export Report
                  </button>
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {keyMetrics.map((metric, index) => (
                <div key={index} className="group bg-white rounded-2xl border border-neutral-200 p-6 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${metric.color} rounded-xl flex items-center justify-center shadow-lg`}>
                      <metric.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                      metric.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {metric.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {metric.change}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900 mb-1">{metric.value}</h3>
                  <p className="text-sm text-neutral-600 mb-1">{metric.label}</p>
                  <p className="text-xs text-neutral-500">{metric.description}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Revenue Chart */}
              <div className="lg:col-span-2 bg-white rounded-2xl border border-neutral-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900">Revenue Trend</h3>
                    <p className="text-sm text-neutral-600">Daily revenue for the past 30 days</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      selectedMetric === 'revenue' ? 'bg-purple-100 text-purple-700' : 'text-neutral-600 hover:bg-neutral-100'
                    }`} onClick={() => setSelectedMetric('revenue')}>
                      Revenue
                    </button>
                    <button className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      selectedMetric === 'orders' ? 'bg-purple-100 text-purple-700' : 'text-neutral-600 hover:bg-neutral-100'
                    }`} onClick={() => setSelectedMetric('orders')}>
                      Orders
                    </button>
                  </div>
                </div>
                
                {/* Simple Bar Chart */}
                <div className="relative h-64">
                  <div className="absolute inset-0 flex items-end justify-between gap-2">
                    {revenueChart.map((data, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center group">
                        <div className="relative w-full">
                          <div 
                            className="w-full bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-lg hover:from-purple-700 hover:to-purple-500 transition-all duration-300 cursor-pointer"
                            style={{ height: `${(data.revenue / maxRevenue) * 240}px` }}
                          >
                            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-900 text-white px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap shadow-xl">
                              <div className="font-bold">GH₵ {data.revenue.toLocaleString()}</div>
                              <div className="text-neutral-300">{data.orders} orders</div>
                            </div>
                          </div>
                        </div>
                        <span className="text-xs text-neutral-500 mt-2">{data.day}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Traffic Sources */}
              <div className="bg-white rounded-2xl border border-neutral-200 p-6">
                <h3 className="text-lg font-bold text-neutral-900 mb-1">Traffic Sources</h3>
                <p className="text-sm text-neutral-600 mb-6">Visitor distribution by channel</p>
                
                <div className="space-y-4">
                  {trafficSources.map((source, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 ${source.color} rounded-full`}></div>
                          <span className="text-sm font-medium text-neutral-900">{source.source}</span>
                        </div>
                        <span className="text-sm font-bold text-neutral-900">{source.percentage}%</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-neutral-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${source.color} rounded-full transition-all duration-500`}
                            style={{ width: `${source.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-neutral-500 min-w-[60px] text-right">
                          {source.visitors.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Products */}
              <div className="bg-white rounded-2xl border border-neutral-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900">Top Performing Products</h3>
                    <p className="text-sm text-neutral-600">Best sellers this month</p>
                  </div>
                  <Star className="w-5 h-5 text-yellow-500" />
                </div>
                
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div key={product.id} className="flex items-center gap-4 p-4 rounded-xl hover:bg-neutral-50 transition-colors group">
                      <div className="flex-shrink-0 w-16 h-16 bg-neutral-100 rounded-xl overflow-hidden relative">
                        {product.image ? (
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Package className="w-6 h-6 text-neutral-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-neutral-900 truncate">{product.name}</h4>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-neutral-600">{product.sales} sales</span>
                          <span className="text-xs text-neutral-400">•</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                            <span className="text-xs text-neutral-600">{product.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-neutral-900">
                          GH₵ {product.revenue.toLocaleString()}
                        </div>
                        <div className="text-xs text-green-600 font-medium">{product.trend}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-2xl border border-neutral-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900">Recent Activity</h3>
                    <p className="text-sm text-neutral-600">Live updates from your store</p>
                  </div>
                  <Activity className="w-5 h-5 text-purple-500 animate-pulse" />
                </div>
                
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        activity.type === 'order' ? 'bg-blue-100' :
                        activity.type === 'review' ? 'bg-yellow-100' :
                        activity.type === 'customer' ? 'bg-green-100' :
                        activity.type === 'payment' ? 'bg-purple-100' :
                        'bg-orange-100'
                      }`}>
                        {activity.type === 'order' && <ShoppingCart className="w-5 h-5 text-blue-600" />}
                        {activity.type === 'review' && <Star className="w-5 h-5 text-yellow-600" />}
                        {activity.type === 'customer' && <Users className="w-5 h-5 text-green-600" />}
                        {activity.type === 'payment' && <CreditCard className="w-5 h-5 text-purple-600" />}
                        {activity.type === 'shipping' && <Package className="w-5 h-5 text-orange-600" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-neutral-900">{activity.action}</p>
                        <p className="text-xs text-neutral-600 mt-0.5">{activity.customer}</p>
                        {activity.amount && (
                          <p className="text-xs font-semibold text-neutral-900 mt-1">{activity.amount}</p>
                        )}
                      </div>
                      <span className="text-xs text-neutral-500 whitespace-nowrap">
                        {activity.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
