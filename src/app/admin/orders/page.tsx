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
  Search,
  Menu,
  X,
  Eye,
  Download,
  Filter,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  AlertCircle
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
              className="flex items-center gap-3 px-3 py-2.5 bg-purple-50 text-purple-600 rounded-lg"
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
              className="flex items-center gap-3 px-3 py-2.5 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 rounded-lg transition-colors"
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

export default function AdminOrdersPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedTimeRange, setSelectedTimeRange] = useState('All Time');

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

  // Mock orders data
  const orders = [
    { 
      id: 'ORD-2345', 
      customer: { name: 'John Doe', email: 'john@example.com' },
      product: 'Premium Wireless Earbuds', 
      amount: 79.99, 
      status: 'Pending',
      paymentStatus: 'Paid',
      date: '2025-10-17',
      time: '10:30 AM',
      items: 2
    },
    { 
      id: 'ORD-2344', 
      customer: { name: 'Sarah Johnson', email: 'sarah@example.com' },
      product: 'Designer Handbag', 
      amount: 149.99, 
      status: 'Processing',
      paymentStatus: 'Paid',
      date: '2025-10-17',
      time: '09:15 AM',
      items: 1
    },
    { 
      id: 'ORD-2343', 
      customer: { name: 'Michael Chen', email: 'michael@example.com' },
      product: 'Smart Fitness Tracker', 
      amount: 103.99, 
      status: 'Shipped',
      paymentStatus: 'Paid',
      date: '2025-10-16',
      time: '03:45 PM',
      items: 3
    },
    { 
      id: 'ORD-2342', 
      customer: { name: 'Emma Rodriguez', email: 'emma@example.com' },
      product: 'Wireless Speaker Pro', 
      amount: 59.99, 
      status: 'Delivered',
      paymentStatus: 'Paid',
      date: '2025-10-16',
      time: '11:20 AM',
      items: 1
    },
    { 
      id: 'ORD-2341', 
      customer: { name: 'David Wilson', email: 'david@example.com' },
      product: 'Gaming Gear Special', 
      amount: 69.99, 
      status: 'Cancelled',
      paymentStatus: 'Refunded',
      date: '2025-10-15',
      time: '02:30 PM',
      items: 2
    },
    { 
      id: 'ORD-2340', 
      customer: { name: 'Lisa Anderson', email: 'lisa@example.com' },
      product: 'Smart Home Hub', 
      amount: 129.99, 
      status: 'Pending',
      paymentStatus: 'Paid',
      date: '2025-10-15',
      time: '08:50 AM',
      items: 1
    },
    { 
      id: 'ORD-2339', 
      customer: { name: 'Robert Taylor', email: 'robert@example.com' },
      product: 'Premium Laptop Backpack', 
      amount: 89.99, 
      status: 'Processing',
      paymentStatus: 'Paid',
      date: '2025-10-14',
      time: '04:15 PM',
      items: 2
    },
    { 
      id: 'ORD-2338', 
      customer: { name: 'Jennifer Lee', email: 'jennifer@example.com' },
      product: 'Wireless Earbuds Pro', 
      amount: 119.99, 
      status: 'Shipped',
      paymentStatus: 'Paid',
      date: '2025-10-14',
      time: '01:00 PM',
      items: 1
    },
  ];

  const statuses = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
  const timeRanges = ['All Time', 'Today', 'This Week', 'This Month', 'This Year'];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-700';
      case 'Shipped': return 'bg-blue-100 text-blue-700';
      case 'Processing': return 'bg-yellow-100 text-yellow-700';
      case 'Pending': return 'bg-orange-100 text-orange-700';
      case 'Cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-neutral-100 text-neutral-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered': return <CheckCircle className="w-4 h-4" />;
      case 'Shipped': return <Truck className="w-4 h-4" />;
      case 'Processing': return <Clock className="w-4 h-4" />;
      case 'Pending': return <AlertCircle className="w-4 h-4" />;
      case 'Cancelled': return <XCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  const totalRevenue = orders.reduce((sum, order) => order.status !== 'Cancelled' ? sum + order.amount : sum, 0);
  const pendingOrders = orders.filter(o => o.status === 'Pending').length;
  const shippedOrders = orders.filter(o => o.status === 'Shipped').length;

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
              <h1 className="text-xl font-semibold text-neutral-900">Orders</h1>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="inline-flex items-center gap-2 px-4 py-2 border border-neutral-200 rounded-lg font-medium text-neutral-700 hover:bg-neutral-50 transition-colors">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 lg:p-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-6 border border-neutral-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-neutral-600">Total Orders</span>
                <ShoppingBag className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-neutral-900">{orders.length}</div>
              <div className="text-sm text-neutral-500 mt-1">All time</div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-neutral-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-neutral-600">Revenue</span>
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-neutral-900">GH₵ {totalRevenue.toFixed(2)}</div>
              <div className="text-sm text-green-600 mt-1">+12.5% vs last month</div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-neutral-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-neutral-600">Pending</span>
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-neutral-900">{pendingOrders}</div>
              <div className="text-sm text-neutral-500 mt-1">Awaiting processing</div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-neutral-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-neutral-600">Shipped</span>
                <Truck className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-neutral-900">{shippedOrders}</div>
              <div className="text-sm text-neutral-500 mt-1">In transit</div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl border border-neutral-200 p-4 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Search by order ID, customer name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Status Filter */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>

              {/* Time Range */}
              <select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="px-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {timeRanges.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-50 border-b border-neutral-200">
                  <tr>
                    <th className="px-6 py-4 text-left">
                      <input type="checkbox" className="rounded border-neutral-300" />
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Order ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Customer</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Product</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Items</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Amount</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Payment</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Status</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-neutral-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-neutral-50 transition-colors">
                      <td className="px-6 py-4">
                        <input type="checkbox" className="rounded border-neutral-300" />
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-neutral-900">{order.id}</div>
                        <div className="text-xs text-neutral-500">{order.time}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-neutral-900">{order.customer.name}</div>
                        <div className="text-sm text-neutral-500">{order.customer.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-neutral-900 max-w-xs truncate">{order.product}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-neutral-600">{order.date}</td>
                      <td className="px-6 py-4 text-sm text-neutral-600">{order.items}</td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-neutral-900">GH₵ {order.amount.toFixed(2)}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          order.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <select className="px-3 py-1.5 border border-neutral-200 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors">
                            <option>Update Status</option>
                            <option>Pending</option>
                            <option>Processing</option>
                            <option>Shipped</option>
                            <option>Delivered</option>
                            <option>Cancelled</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-neutral-200">
              <div className="text-sm text-neutral-600">
                Showing <span className="font-medium">{filteredOrders.length}</span> of <span className="font-medium">{orders.length}</span> orders
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 border border-neutral-200 rounded-lg text-sm font-medium text-neutral-600 hover:bg-neutral-50 transition-colors">
                  Previous
                </button>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                  1
                </button>
                <button className="px-4 py-2 border border-neutral-200 rounded-lg text-sm font-medium text-neutral-600 hover:bg-neutral-50 transition-colors">
                  2
                </button>
                <button className="px-4 py-2 border border-neutral-200 rounded-lg text-sm font-medium text-neutral-600 hover:bg-neutral-50 transition-colors">
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
