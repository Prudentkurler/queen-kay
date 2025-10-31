'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, signOut } from '@/lib/auth';
import { 
  Package, 
  Users,
  ShoppingBag,
  XCircle,
  Plus,
  Search,
  Filter,
  Tag,
  Percent,
  Gift,
  Mail,
  Send,
  TrendingUp,
  Calendar,
  Copy,
  Edit,
  Trash2,
  BarChart3,
  Clock,
  Target,
  Megaphone
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
            <a href="/admin/marketing" className="flex items-center space-x-3 px-4 py-3 text-sm font-medium text-white bg-purple-600 rounded-lg transition-colors">
              <Megaphone className="w-5 h-5" />
              <span>Marketing</span>
            </a>
            <a href="/admin/reports" className="flex items-center space-x-3 px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50 rounded-lg transition-colors">
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

export default function MarketingPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('discounts');

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

  // Mock marketing data
  const discounts = [
    {
      id: '1',
      code: 'WELCOME20',
      type: 'Percentage',
      value: '20%',
      description: 'Welcome discount for new customers',
      uses: 234,
      limit: 500,
      startDate: '2025-10-01',
      endDate: '2025-12-31',
      status: 'Active'
    },
    {
      id: '2',
      code: 'FREESHIP',
      type: 'Free Shipping',
      value: 'Free',
      description: 'Free shipping on orders over GH₵ 150',
      uses: 456,
      limit: 1000,
      startDate: '2025-10-01',
      endDate: '2025-11-30',
      status: 'Active'
    },
    {
      id: '3',
      code: 'FLASH50',
      type: 'Percentage',
      value: '50%',
      description: 'Flash sale - 50% off electronics',
      uses: 89,
      limit: 200,
      startDate: '2025-10-18',
      endDate: '2025-10-20',
      status: 'Active'
    },
    {
      id: '4',
      code: 'SUMMER2025',
      type: 'Fixed Amount',
      value: 'GH₵ 25',
      description: 'Summer sale discount',
      uses: 102,
      limit: 300,
      startDate: '2025-09-01',
      endDate: '2025-09-30',
      status: 'Expired'
    },
  ];

  const campaigns = [
    {
      id: '1',
      name: 'October Flash Sale',
      type: 'Email',
      sent: 12450,
      opened: 7823,
      clicked: 3245,
      converted: 892,
      revenue: 'GH₵ 45,230',
      status: 'Completed',
      date: '2025-10-15'
    },
    {
      id: '2',
      name: 'New Product Launch',
      type: 'Email + SMS',
      sent: 8920,
      opened: 5234,
      clicked: 2109,
      converted: 567,
      revenue: 'GH₵ 28,940',
      status: 'Active',
      date: '2025-10-17'
    },
    {
      id: '3',
      name: 'Customer Win-back',
      type: 'Email',
      sent: 5680,
      opened: 2340,
      clicked: 890,
      converted: 234,
      revenue: 'GH₵ 12,450',
      status: 'Scheduled',
      date: '2025-10-20'
    },
  ];

  const stats = [
    {
      label: 'Active Campaigns',
      value: '8',
      change: '+2 this week',
      icon: Megaphone,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      label: 'Active Discounts',
      value: '12',
      change: '3 expiring soon',
      icon: Tag,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      label: 'Total Revenue',
      value: 'GH₵ 86.6K',
      change: '+34.2% vs last month',
      icon: TrendingUp,
      color: 'bg-green-100 text-green-600'
    },
    {
      label: 'Conversion Rate',
      value: '7.2%',
      change: '+1.8% improvement',
      icon: Target,
      color: 'bg-orange-100 text-orange-600'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-700';
      case 'Completed': return 'bg-blue-100 text-blue-700';
      case 'Scheduled': return 'bg-purple-100 text-purple-700';
      case 'Expired': return 'bg-neutral-100 text-neutral-700';
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
                <h1 className="text-3xl font-bold text-neutral-900">Marketing & Promotions</h1>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  Create Campaign
                </button>
              </div>
              <p className="text-neutral-600">Manage discounts, campaigns, and promotional activities</p>
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

            {/* Tabs */}
            <div className="bg-white rounded-xl border border-neutral-200 mb-6">
              <div className="flex border-b border-neutral-200">
                <button
                  onClick={() => setActiveTab('discounts')}
                  className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                    activeTab === 'discounts'
                      ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50/50'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  <Tag className="w-4 h-4 inline-block mr-2" />
                  Discount Codes
                </button>
                <button
                  onClick={() => setActiveTab('campaigns')}
                  className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                    activeTab === 'campaigns'
                      ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50/50'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  <Mail className="w-4 h-4 inline-block mr-2" />
                  Campaigns
                </button>
              </div>

              <div className="p-6">
                {activeTab === 'discounts' && (
                  <div>
                    {/* Search */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                        <input
                          type="text"
                          placeholder="Search discount codes..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <button className="flex items-center gap-2 px-4 py-2.5 border border-neutral-200 text-neutral-700 rounded-lg font-medium hover:bg-neutral-50 transition-colors">
                        <Filter className="w-4 h-4" />
                        Filter
                      </button>
                    </div>

                    {/* Discounts Table */}
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-neutral-50 border-b border-neutral-200">
                          <tr>
                            <th className="text-left py-4 px-4 text-xs font-semibold text-neutral-600 uppercase tracking-wider">Code</th>
                            <th className="text-left py-4 px-4 text-xs font-semibold text-neutral-600 uppercase tracking-wider">Type</th>
                            <th className="text-left py-4 px-4 text-xs font-semibold text-neutral-600 uppercase tracking-wider">Usage</th>
                            <th className="text-left py-4 px-4 text-xs font-semibold text-neutral-600 uppercase tracking-wider">Validity</th>
                            <th className="text-left py-4 px-4 text-xs font-semibold text-neutral-600 uppercase tracking-wider">Status</th>
                            <th className="text-right py-4 px-4 text-xs font-semibold text-neutral-600 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                          {discounts.map((discount) => (
                            <tr key={discount.id} className="hover:bg-neutral-50 transition-colors">
                              <td className="py-4 px-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <Tag className="w-5 h-5 text-purple-600" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-bold text-neutral-900">{discount.code}</p>
                                    <p className="text-xs text-neutral-500 line-clamp-1">{discount.description}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-neutral-100 text-neutral-700 rounded-full text-xs font-medium">
                                  {discount.type}
                                  <span className="font-bold">{discount.value}</span>
                                </span>
                              </td>
                              <td className="py-4 px-4">
                                <div className="flex flex-col gap-1">
                                  <span className="text-sm font-medium text-neutral-900">{discount.uses} / {discount.limit}</span>
                                  <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-purple-600 rounded-full transition-all"
                                      style={{ width: `${(discount.uses / discount.limit) * 100}%` }}
                                    ></div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <div className="flex flex-col">
                                  <span className="text-xs text-neutral-600">Start: {discount.startDate}</span>
                                  <span className="text-xs text-neutral-600">End: {discount.endDate}</span>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(discount.status)}`}>
                                  {discount.status}
                                </span>
                              </td>
                              <td className="py-4 px-4">
                                <div className="flex items-center justify-end gap-2">
                                  <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors" title="Copy">
                                    <Copy className="w-4 h-4 text-neutral-600" />
                                  </button>
                                  <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors" title="Edit">
                                    <Edit className="w-4 h-4 text-neutral-600" />
                                  </button>
                                  <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors" title="Delete">
                                    <Trash2 className="w-4 h-4 text-red-600" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeTab === 'campaigns' && (
                  <div className="space-y-4">
                    {campaigns.map((campaign) => (
                      <div key={campaign.id} className="bg-neutral-50 rounded-xl p-6 hover:shadow-md transition-all">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                              <Mail className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-neutral-900">{campaign.name}</h3>
                              <p className="text-sm text-neutral-600">{campaign.type} • {campaign.date}</p>
                            </div>
                          </div>
                          <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                            {campaign.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                          <div className="bg-white rounded-lg p-4">
                            <p className="text-xs text-neutral-600 mb-1">Sent</p>
                            <p className="text-xl font-bold text-neutral-900">{campaign.sent.toLocaleString()}</p>
                          </div>
                          <div className="bg-white rounded-lg p-4">
                            <p className="text-xs text-neutral-600 mb-1">Opened</p>
                            <p className="text-xl font-bold text-blue-600">{campaign.opened.toLocaleString()}</p>
                            <p className="text-xs text-neutral-500">{((campaign.opened / campaign.sent) * 100).toFixed(1)}%</p>
                          </div>
                          <div className="bg-white rounded-lg p-4">
                            <p className="text-xs text-neutral-600 mb-1">Clicked</p>
                            <p className="text-xl font-bold text-purple-600">{campaign.clicked.toLocaleString()}</p>
                            <p className="text-xs text-neutral-500">{((campaign.clicked / campaign.opened) * 100).toFixed(1)}%</p>
                          </div>
                          <div className="bg-white rounded-lg p-4">
                            <p className="text-xs text-neutral-600 mb-1">Converted</p>
                            <p className="text-xl font-bold text-green-600">{campaign.converted.toLocaleString()}</p>
                            <p className="text-xs text-neutral-500">{((campaign.converted / campaign.clicked) * 100).toFixed(1)}%</p>
                          </div>
                          <div className="bg-white rounded-lg p-4">
                            <p className="text-xs text-neutral-600 mb-1">Revenue</p>
                            <p className="text-xl font-bold text-orange-600">{campaign.revenue}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mt-4">
                          <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                            View Details
                          </button>
                          <button className="px-4 py-2 border border-neutral-200 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-100 transition-colors">
                            Duplicate
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
