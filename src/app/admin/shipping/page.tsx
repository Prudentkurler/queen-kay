'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, signOut } from '@/lib/auth';
import { 
  Truck, 
  Package, 
  MapPin, 
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Printer,
  Download,
  Search,
  Filter,
  RefreshCw,
  ExternalLink
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
          {/* Logo */}
          <div className="flex items-center justify-between px-6 h-16 border-b border-neutral-200">
            <h1 className="text-xl font-bold text-neutral-900">Queen Kay</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <XCircle className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
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
            <a href="/admin/shipping" className="flex items-center space-x-3 px-4 py-3 text-sm font-medium text-white bg-purple-600 rounded-lg transition-colors">
              <Truck className="w-5 h-5" />
              <span>Shipping</span>
            </a>
            <a href="/admin/inventory" className="flex items-center space-x-3 px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50 rounded-lg transition-colors">
              <Package className="w-5 h-5" />
              <span>Inventory</span>
            </a>
            <a href="/admin/analytics" className="flex items-center space-x-3 px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50 rounded-lg transition-colors">
              <Package className="w-5 h-5" />
              <span>Analytics</span>
            </a>
            <a href="/admin/settings" className="flex items-center space-x-3 px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50 rounded-lg transition-colors">
              <Package className="w-5 h-5" />
              <span>Settings</span>
            </a>
          </nav>

          {/* Sign Out */}
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

export default function AdminShippingPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedCarrier, setSelectedCarrier] = useState('All');

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

  // Mock shipping data
  const shipments = [
    {
      id: 'SHIP-2345',
      orderId: 'ORD-2345',
      trackingNumber: '1Z999AA10123456784',
      customer: 'John Doe',
      destination: 'Accra, Ghana',
      carrier: 'DHL Express',
      status: 'In Transit',
      expectedDelivery: '2025-10-19',
      shipped: '2025-10-17',
      weight: '2.5 kg',
      items: 2
    },
    {
      id: 'SHIP-2344',
      orderId: 'ORD-2344',
      trackingNumber: '1Z999AA10123456785',
      customer: 'Sarah Johnson',
      destination: 'Kumasi, Ghana',
      carrier: 'UPS Ground',
      status: 'Pending Pickup',
      expectedDelivery: '2025-10-20',
      shipped: '2025-10-17',
      weight: '1.8 kg',
      items: 1
    },
    {
      id: 'SHIP-2343',
      orderId: 'ORD-2343',
      trackingNumber: '1Z999AA10123456786',
      customer: 'Michael Chen',
      destination: 'Takoradi, Ghana',
      carrier: 'FedEx',
      status: 'Delivered',
      expectedDelivery: '2025-10-17',
      shipped: '2025-10-15',
      weight: '3.2 kg',
      items: 3
    },
    {
      id: 'SHIP-2342',
      orderId: 'ORD-2342',
      trackingNumber: '1Z999AA10123456787',
      customer: 'Emma Rodriguez',
      destination: 'Tamale, Ghana',
      carrier: 'DHL Express',
      status: 'Out for Delivery',
      expectedDelivery: '2025-10-17',
      shipped: '2025-10-16',
      weight: '1.2 kg',
      items: 1
    },
    {
      id: 'SHIP-2341',
      orderId: 'ORD-2341',
      trackingNumber: '1Z999AA10123456788',
      customer: 'David Wilson',
      destination: 'Cape Coast, Ghana',
      carrier: 'Local Courier',
      status: 'Failed Delivery',
      expectedDelivery: '2025-10-16',
      shipped: '2025-10-14',
      weight: '2.0 kg',
      items: 2
    },
  ];

  const stats = [
    {
      label: 'Active Shipments',
      value: '24',
      change: '+12 today',
      icon: Truck,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      label: 'Pending Pickup',
      value: '8',
      change: 'Need attention',
      icon: Clock,
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      label: 'Delivered Today',
      value: '15',
      change: '94% on time',
      icon: CheckCircle,
      color: 'bg-green-100 text-green-600'
    },
    {
      label: 'Failed Deliveries',
      value: '2',
      change: 'Needs resolution',
      icon: AlertCircle,
      color: 'bg-red-100 text-red-600'
    },
  ];

  const carriers = ['All', 'DHL Express', 'UPS Ground', 'FedEx', 'Local Courier'];
  const statuses = ['All', 'Pending Pickup', 'In Transit', 'Out for Delivery', 'Delivered', 'Failed Delivery'];

  const filteredShipments = shipments.filter(shipment => {
    const matchesSearch = 
      shipment.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || shipment.status === selectedStatus;
    const matchesCarrier = selectedCarrier === 'All' || shipment.carrier === selectedCarrier;
    return matchesSearch && matchesStatus && matchesCarrier;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-700';
      case 'In Transit': return 'bg-blue-100 text-blue-700';
      case 'Out for Delivery': return 'bg-purple-100 text-purple-700';
      case 'Pending Pickup': return 'bg-yellow-100 text-yellow-700';
      case 'Failed Delivery': return 'bg-red-100 text-red-700';
      default: return 'bg-neutral-100 text-neutral-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered': return CheckCircle;
      case 'In Transit': return Truck;
      case 'Out for Delivery': return MapPin;
      case 'Pending Pickup': return Clock;
      case 'Failed Delivery': return XCircle;
      default: return Package;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <AdminSidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen}
        handleSignOut={handleSignOut}
      />

      {/* Main Content */}
      <div className="lg:pl-64">
        <main className="p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-3xl font-bold text-neutral-900">Shipping & Fulfillment</h1>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors">
                  <Printer className="w-4 h-4" />
                  Print Labels
                </button>
              </div>
              <p className="text-neutral-600">Track and manage all your shipments and deliveries</p>
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
                    placeholder="Search by tracking number, order ID, or customer..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div className="flex gap-3">
                  <select
                    value={selectedCarrier}
                    onChange={(e) => setSelectedCarrier(e.target.value)}
                    className="px-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                  >
                    {carriers.map(carrier => (
                      <option key={carrier} value={carrier}>{carrier}</option>
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

            {/* Shipments List */}
            <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-neutral-50 border-b border-neutral-200">
                    <tr>
                      <th className="text-left py-4 px-6 text-xs font-semibold text-neutral-600 uppercase tracking-wider">Shipment</th>
                      <th className="text-left py-4 px-6 text-xs font-semibold text-neutral-600 uppercase tracking-wider">Customer</th>
                      <th className="text-left py-4 px-6 text-xs font-semibold text-neutral-600 uppercase tracking-wider">Destination</th>
                      <th className="text-left py-4 px-6 text-xs font-semibold text-neutral-600 uppercase tracking-wider">Carrier</th>
                      <th className="text-left py-4 px-6 text-xs font-semibold text-neutral-600 uppercase tracking-wider">Status</th>
                      <th className="text-left py-4 px-6 text-xs font-semibold text-neutral-600 uppercase tracking-wider">Delivery</th>
                      <th className="text-right py-4 px-6 text-xs font-semibold text-neutral-600 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {filteredShipments.map((shipment) => {
                      const StatusIcon = getStatusIcon(shipment.status);
                      return (
                        <tr key={shipment.id} className="hover:bg-neutral-50 transition-colors">
                          <td className="py-4 px-6">
                            <div className="flex flex-col">
                              <span className="text-sm font-semibold text-neutral-900">{shipment.id}</span>
                              <span className="text-xs text-neutral-500">{shipment.orderId}</span>
                              <span className="text-xs text-neutral-400 font-mono mt-1">{shipment.trackingNumber}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="text-sm text-neutral-900">{shipment.customer}</span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-neutral-400" />
                              <span className="text-sm text-neutral-600">{shipment.destination}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex flex-col">
                              <span className="text-sm text-neutral-900">{shipment.carrier}</span>
                              <span className="text-xs text-neutral-500">{shipment.weight} • {shipment.items} items</span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${getStatusColor(shipment.status)}`}>
                              <StatusIcon className="w-3.5 h-3.5" />
                              {shipment.status}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex flex-col">
                              <span className="text-sm text-neutral-900">{shipment.expectedDelivery}</span>
                              <span className="text-xs text-neutral-500">Shipped: {shipment.shipped}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center justify-end gap-2">
                              <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors" title="Track Shipment">
                                <ExternalLink className="w-4 h-4 text-neutral-600" />
                              </button>
                              <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors" title="Print Label">
                                <Printer className="w-4 h-4 text-neutral-600" />
                              </button>
                              <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors" title="Download">
                                <Download className="w-4 h-4 text-neutral-600" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-neutral-600">
                Showing <span className="font-medium">{filteredShipments.length}</span> of <span className="font-medium">{shipments.length}</span> shipments
              </p>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 border border-neutral-200 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors">
                  Previous
                </button>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                  1
                </button>
                <button className="px-4 py-2 border border-neutral-200 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors">
                  2
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
