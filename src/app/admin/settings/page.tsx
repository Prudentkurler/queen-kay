'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, signOut } from '@/lib/auth';
import Link from 'next/link';
import { 
  Package, 
  ShoppingBag, 
  Users, 
  Settings,
  LogOut,
  Home,
  BarChart3,
  Menu,
  X,
  Bell,
  Mail,
  Lock,
  Globe,
  CreditCard,
  Truck,
  Save,
  Store,
  DollarSign,
  Percent,
  MapPin,
  Phone,
  Clock,
  Tag
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
              className="flex items-center gap-3 px-3 py-2.5 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 rounded-lg transition-colors"
            >
              <BarChart3 className="w-5 h-5" />
              <span className="font-medium">Analytics</span>
            </Link>
            <Link 
              href="/admin/settings"
              className="flex items-center gap-3 px-3 py-2.5 bg-purple-50 text-purple-600 rounded-lg"
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

export default function AdminSettingsPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [saved, setSaved] = useState(false);

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

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'shipping', label: 'Shipping', icon: Truck },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'security', label: 'Security', icon: Lock },
  ];

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
              <h1 className="text-xl font-semibold text-neutral-900">Settings</h1>
            </div>
            
            {saved && (
              <div className="flex items-center gap-2 text-sm text-green-600">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span>Settings saved</span>
              </div>
            )}
          </div>
        </header>

        {/* Content */}
        <main className="p-4 lg:p-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Sidebar Tabs */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl border border-neutral-200 p-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                          activeTab === tab.id
                            ? 'bg-purple-50 text-purple-600'
                            : 'text-neutral-600 hover:bg-neutral-50'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Settings Content */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-xl border border-neutral-200 p-6">
                  {activeTab === 'general' && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-lg font-semibold text-neutral-900 mb-4">Store Information</h2>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                              Store Name
                            </label>
                            <input
                              type="text"
                              defaultValue="Queenkay Importation"
                              className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                              Store Email
                            </label>
                            <input
                              type="email"
                              defaultValue="support@queenkay.com"
                              className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                              Contact Phone
                            </label>
                            <input
                              type="tel"
                              defaultValue="+1 (555) 123-4567"
                              className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                              Store Description
                            </label>
                            <textarea
                              rows={4}
                              defaultValue="Premium tech and fashion from China. Quality products delivered worldwide."
                              className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'notifications' && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-lg font-semibold text-neutral-900 mb-4">Email Notifications</h2>
                        <div className="space-y-4">
                          {[
                            { label: 'New orders', description: 'Receive email when a new order is placed' },
                            { label: 'Order updates', description: 'Get notified about order status changes' },
                            { label: 'Low stock alerts', description: 'Alert when products are running low' },
                            { label: 'Customer messages', description: 'Receive emails from customer inquiries' },
                            { label: 'Weekly reports', description: 'Get weekly analytics and performance reports' },
                          ].map((item, index) => (
                            <div key={index} className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                              <div>
                                <div className="font-medium text-neutral-900">{item.label}</div>
                                <div className="text-sm text-neutral-600">{item.description}</div>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" defaultChecked className="sr-only peer" />
                                <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'shipping' && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-lg font-semibold text-neutral-900 mb-4">Shipping Settings</h2>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                              Default Shipping Method
                            </label>
                            <select className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                              <option>Standard Shipping (30-45 days)</option>
                              <option>Express Shipping (15-20 days)</option>
                              <option>Priority Shipping (7-10 days)</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                              Free Shipping Threshold (GH₵)
                            </label>
                            <input
                              type="number"
                              defaultValue="150"
                              className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                              Shipping Cost (GH₵)
                            </label>
                            <input
                              type="number"
                              defaultValue="25"
                              className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'payments' && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-lg font-semibold text-neutral-900 mb-4">Payment Methods</h2>
                        <div className="space-y-4">
                          {[
                            { name: 'Credit Cards', provider: 'Visa, Mastercard, Amex', enabled: true },
                            { name: 'PayPal', provider: 'PayPal Express Checkout', enabled: true },
                            { name: 'Mobile Money', provider: 'MTN, Vodafone, AirtelTigo', enabled: true },
                            { name: 'Bank Transfer', provider: 'Direct bank transfer', enabled: false },
                          ].map((method, index) => (
                            <div key={index} className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                              <div>
                                <div className="font-medium text-neutral-900">{method.name}</div>
                                <div className="text-sm text-neutral-600">{method.provider}</div>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" defaultChecked={method.enabled} className="sr-only peer" />
                                <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'security' && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-lg font-semibold text-neutral-900 mb-4">Security Settings</h2>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                              Current Password
                            </label>
                            <input
                              type="password"
                              placeholder="Enter current password"
                              className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                              New Password
                            </label>
                            <input
                              type="password"
                              placeholder="Enter new password"
                              className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                              Confirm New Password
                            </label>
                            <input
                              type="password"
                              placeholder="Confirm new password"
                              className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                          </div>
                          <div className="pt-4 border-t border-neutral-200">
                            <label className="flex items-center gap-3 p-4 border border-neutral-200 rounded-lg cursor-pointer">
                              <input type="checkbox" className="rounded border-neutral-300" />
                              <div>
                                <div className="font-medium text-neutral-900">Two-Factor Authentication</div>
                                <div className="text-sm text-neutral-600">Add an extra layer of security to your account</div>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Save Button */}
                  <div className="mt-8 pt-6 border-t border-neutral-200">
                    <button
                      onClick={handleSave}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      Save Changes
                    </button>
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
