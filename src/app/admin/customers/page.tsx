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
  Mail,
  Phone,
  MapPin,
  Calendar,
  TrendingUp,
  Star
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
              className="flex items-center gap-3 px-3 py-2.5 bg-purple-50 text-purple-600 rounded-lg"
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

export default function AdminCustomersPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSegment, setSelectedSegment] = useState('All');

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

  // Mock customers data
  const customers = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234 567 8900',
      location: 'New York, USA',
      joinDate: '2024-03-15',
      totalOrders: 12,
      totalSpent: 1249.99,
      avgOrderValue: 104.17,
      segment: 'VIP',
      lastOrder: '2025-10-10'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      phone: '+1 234 567 8901',
      location: 'Los Angeles, USA',
      joinDate: '2024-05-20',
      totalOrders: 8,
      totalSpent: 899.50,
      avgOrderValue: 112.44,
      segment: 'Regular',
      lastOrder: '2025-10-12'
    },
    {
      id: '3',
      name: 'Michael Chen',
      email: 'michael@example.com',
      phone: '+1 234 567 8902',
      location: 'San Francisco, USA',
      joinDate: '2024-01-10',
      totalOrders: 23,
      totalSpent: 3456.78,
      avgOrderValue: 150.29,
      segment: 'VIP',
      lastOrder: '2025-10-15'
    },
    {
      id: '4',
      name: 'Emma Rodriguez',
      email: 'emma@example.com',
      phone: '+1 234 567 8903',
      location: 'Miami, USA',
      joinDate: '2024-07-08',
      totalOrders: 5,
      totalSpent: 456.25,
      avgOrderValue: 91.25,
      segment: 'Regular',
      lastOrder: '2025-10-08'
    },
    {
      id: '5',
      name: 'David Wilson',
      email: 'david@example.com',
      phone: '+1 234 567 8904',
      location: 'Chicago, USA',
      joinDate: '2024-09-22',
      totalOrders: 2,
      totalSpent: 189.99,
      avgOrderValue: 95.00,
      segment: 'New',
      lastOrder: '2025-10-01'
    },
    {
      id: '6',
      name: 'Lisa Anderson',
      email: 'lisa@example.com',
      phone: '+1 234 567 8905',
      location: 'Seattle, USA',
      joinDate: '2024-02-14',
      totalOrders: 18,
      totalSpent: 2345.67,
      avgOrderValue: 130.31,
      segment: 'VIP',
      lastOrder: '2025-10-14'
    },
  ];

  const segments = ['All', 'VIP', 'Regular', 'New'];

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.phone.includes(searchQuery);
    const matchesSegment = selectedSegment === 'All' || customer.segment === selectedSegment;
    return matchesSearch && matchesSegment;
  });

  const getSegmentColor = (segment: string) => {
    switch (segment) {
      case 'VIP': return 'bg-purple-100 text-purple-700';
      case 'Regular': return 'bg-blue-100 text-blue-700';
      case 'New': return 'bg-green-100 text-green-700';
      default: return 'bg-neutral-100 text-neutral-700';
    }
  };

  const totalCustomers = customers.length;
  const vipCustomers = customers.filter(c => c.segment === 'VIP').length;
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);
  const avgOrderValue = totalRevenue / customers.reduce((sum, c) => sum + c.totalOrders, 0);

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
              <h1 className="text-xl font-semibold text-neutral-900">Customers</h1>
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
                <span className="text-sm font-medium text-neutral-600">Total Customers</span>
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-neutral-900">{totalCustomers}</div>
              <div className="text-sm text-neutral-500 mt-1">All time</div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-neutral-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-neutral-600">VIP Customers</span>
                <Star className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="text-2xl font-bold text-neutral-900">{vipCustomers}</div>
              <div className="text-sm text-neutral-500 mt-1">{((vipCustomers/totalCustomers)*100).toFixed(0)}% of total</div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-neutral-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-neutral-600">Total Revenue</span>
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-neutral-900">GH₵ {totalRevenue.toFixed(2)}</div>
              <div className="text-sm text-green-600 mt-1">+18.2% vs last month</div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-neutral-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-neutral-600">Avg Order Value</span>
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-neutral-900">GH₵ {avgOrderValue.toFixed(2)}</div>
              <div className="text-sm text-neutral-500 mt-1">Per order</div>
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
                    placeholder="Search by name, email or phone..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Segment Filter */}
              <select
                value={selectedSegment}
                onChange={(e) => setSelectedSegment(e.target.value)}
                className="px-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {segments.map(segment => (
                  <option key={segment} value={segment}>{segment} Customers</option>
                ))}
              </select>
            </div>
          </div>

          {/* Customers Table */}
          <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-50 border-b border-neutral-200">
                  <tr>
                    <th className="px-6 py-4 text-left">
                      <input type="checkbox" className="rounded border-neutral-300" />
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Customer</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Contact</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Location</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Join Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Orders</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Total Spent</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Segment</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-neutral-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-neutral-50 transition-colors">
                      <td className="px-6 py-4">
                        <input type="checkbox" className="rounded border-neutral-300" />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-semibold text-purple-600">
                              {customer.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-neutral-900">{customer.name}</div>
                            <div className="text-sm text-neutral-500">Last order: {customer.lastOrder}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2 text-sm text-neutral-600">
                            <Mail className="w-4 h-4" />
                            {customer.email}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-neutral-600">
                            <Phone className="w-4 h-4" />
                            {customer.phone}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-neutral-600">
                          <MapPin className="w-4 h-4" />
                          {customer.location}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-neutral-600">
                          <Calendar className="w-4 h-4" />
                          {customer.joinDate}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-neutral-900">{customer.totalOrders}</div>
                        <div className="text-xs text-neutral-500">GH₵ {customer.avgOrderValue.toFixed(2)} avg</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-neutral-900">GH₵ {customer.totalSpent.toFixed(2)}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getSegmentColor(customer.segment)}`}>
                          {customer.segment}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors">
                            <Mail className="w-4 h-4" />
                          </button>
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
                Showing <span className="font-medium">{filteredCustomers.length}</span> of <span className="font-medium">{customers.length}</span> customers
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 border border-neutral-200 rounded-lg text-sm font-medium text-neutral-600 hover:bg-neutral-50 transition-colors">
                  Previous
                </button>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                  1
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
