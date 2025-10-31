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
  Plus,
  Search,
  Menu,
  X,
  Edit,
  Trash2,
  Eye,
  Filter,
  Download,
  Upload,
  MoreVertical,
  Tag,
  Grid,
  List,
  AlertTriangle
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
              className="flex items-center gap-3 px-3 py-2.5 bg-purple-50 text-purple-600 rounded-lg"
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

export default function AdminProductsPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

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

  // Mock products data
  const products = [
    { 
      id: '1', 
      name: 'Premium Wireless Earbuds', 
      category: 'Electronics', 
      price: 79.99, 
      stock: 45, 
      status: 'In Stock',
      image: '/products/1g.png',
      sku: 'EAR-001',
      sales: 234
    },
    { 
      id: '2', 
      name: 'Designer Handbag Collection', 
      category: 'Fashion', 
      price: 149.99, 
      stock: 12, 
      status: 'Low Stock',
      image: '/products/3b.png',
      sku: 'BAG-002',
      sales: 89
    },
    { 
      id: '3', 
      name: 'Smart Fitness Tracker', 
      category: 'Electronics', 
      price: 103.99, 
      stock: 0, 
      status: 'Out of Stock',
      image: '/products/6g.png',
      sku: 'FIT-003',
      sales: 456
    },
    { 
      id: '4', 
      name: 'Wireless Speaker Pro', 
      category: 'Electronics', 
      price: 59.99, 
      stock: 78, 
      status: 'In Stock',
      image: '/products/5bl.png',
      sku: 'SPK-004',
      sales: 321
    },
    { 
      id: '5', 
      name: 'Premium Laptop Backpack', 
      category: 'Accessories', 
      price: 89.99, 
      stock: 34, 
      status: 'In Stock',
      image: '/products/7g.png',
      sku: 'BAG-005',
      sales: 167
    },
    { 
      id: '6', 
      name: 'Smart Home Hub', 
      category: 'Electronics', 
      price: 129.99, 
      stock: 8, 
      status: 'Low Stock',
      image: '/products/8b.png',
      sku: 'HUB-006',
      sales: 93
    },
  ];

  const categories = ['All', 'Electronics', 'Fashion', 'Accessories', 'Home', 'Sports'];
  const statuses = ['All', 'In Stock', 'Low Stock', 'Out of Stock'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || product.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock': return 'bg-green-100 text-green-700';
      case 'Low Stock': return 'bg-yellow-100 text-yellow-700';
      case 'Out of Stock': return 'bg-red-100 text-red-700';
      default: return 'bg-neutral-100 text-neutral-700';
    }
  };

  const handleDeleteProduct = (productId: string) => {
    setSelectedProduct(productId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    // Here you would actually delete the product
    console.log('Deleting product:', selectedProduct);
    setShowDeleteModal(false);
    setSelectedProduct(null);
  };

  const handleEditProduct = (productId: string) => {
    router.push(`/admin/products/edit/${productId}`);
  };

  const handleViewProduct = (productId: string) => {
    router.push(`/shop/${productId}`);
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
              <h1 className="text-xl font-semibold text-neutral-900">Products</h1>
            </div>
            
            <div className="flex items-center gap-3">
              <Link 
                href="/admin/products/new"
                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Product</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 lg:p-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-6 border border-neutral-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-neutral-600">Total Products</span>
                <Package className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-neutral-900">{products.length}</div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-neutral-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-neutral-600">In Stock</span>
                <Tag className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-neutral-900">
                {products.filter(p => p.status === 'In Stock').length}
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-neutral-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-neutral-600">Low Stock</span>
                <Tag className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="text-2xl font-bold text-neutral-900">
                {products.filter(p => p.status === 'Low Stock').length}
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-neutral-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-neutral-600">Out of Stock</span>
                <Tag className="w-5 h-5 text-red-600" />
              </div>
              <div className="text-2xl font-bold text-neutral-900">
                {products.filter(p => p.status === 'Out of Stock').length}
              </div>
            </div>
          </div>

          {/* Filters & Actions */}
          <div className="bg-white rounded-xl border border-neutral-200 p-4 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Search products by name or SKU..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

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

              {/* View Toggle */}
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2.5 rounded-lg border ${viewMode === 'list' ? 'bg-purple-50 border-purple-200 text-purple-600' : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'}`}
                >
                  <List className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 rounded-lg border ${viewMode === 'grid' ? 'bg-purple-50 border-purple-200 text-purple-600' : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
              </div>

              {/* Bulk Actions */}
              <div className="flex gap-2">
                <button className="p-2.5 border border-neutral-200 rounded-lg text-neutral-600 hover:bg-neutral-50 transition-colors">
                  <Download className="w-5 h-5" />
                </button>
                <button className="p-2.5 border border-neutral-200 rounded-lg text-neutral-600 hover:bg-neutral-50 transition-colors">
                  <Upload className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Products Table/Grid */}
          {viewMode === 'list' ? (
            <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-neutral-50 border-b border-neutral-200">
                    <tr>
                      <th className="px-6 py-4 text-left">
                        <input type="checkbox" className="rounded border-neutral-300" />
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Product</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">SKU</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Category</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Price</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Stock</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Sales</th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-neutral-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-neutral-50 transition-colors">
                        <td className="px-6 py-4">
                          <input type="checkbox" className="rounded border-neutral-300" />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12 bg-neutral-100 rounded-lg overflow-hidden flex-shrink-0">
                              {product.image ? (
                                <Image
                                  src={product.image}
                                  alt={product.name}
                                  fill
                                  className="object-cover"
                                />
                              ) : (
                                <Package className="w-6 h-6 text-neutral-400 absolute inset-0 m-auto" />
                              )}
                            </div>
                            <div>
                              <div className="font-medium text-neutral-900">{product.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-neutral-600">{product.sku}</td>
                        <td className="px-6 py-4 text-sm text-neutral-600">{product.category}</td>
                        <td className="px-6 py-4 text-sm font-medium text-neutral-900">
                          GH₵ {product.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-sm text-neutral-600">{product.stock}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                            {product.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-neutral-600">{product.sales}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => handleViewProduct(product.id)}
                              className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
                              title="View Product"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleEditProduct(product.id)}
                              className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
                              title="Edit Product"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteProduct(product.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete Product"
                            >
                              <Trash2 className="w-4 h-4" />
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
                  Showing <span className="font-medium">{filteredProducts.length}</span> of <span className="font-medium">{products.length}</span> products
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
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-xl border border-neutral-200 overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="relative aspect-square bg-neutral-100 overflow-hidden">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Package className="w-16 h-16 text-neutral-400" />
                      </div>
                    )}
                    {/* Stock Warning Badge */}
                    {product.stock === 0 && (
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                          <AlertTriangle className="w-3 h-3" />
                          Out of Stock
                        </span>
                      </div>
                    )}
                    {product.stock > 0 && product.stock <= 15 && (
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-yellow-500 text-white text-xs font-medium rounded-full">
                          <AlertTriangle className="w-3 h-3" />
                          Low Stock
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-neutral-900 line-clamp-2 flex-1">{product.name}</h3>
                      <div className="relative">
                        <button className="p-1 text-neutral-600 hover:bg-neutral-100 rounded transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs text-neutral-500">{product.sku}</span>
                      <span className="text-xs text-neutral-400">•</span>
                      <span className="text-xs text-neutral-500">{product.category}</span>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-bold text-neutral-900">GH₵ {product.price.toFixed(2)}</span>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                        {product.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-neutral-600 mb-4 pb-4 border-b border-neutral-200">
                      <span className="flex items-center gap-1">
                        <Package className="w-4 h-4" />
                        Stock: {product.stock}
                      </span>
                      <span className="flex items-center gap-1">
                        <Tag className="w-4 h-4" />
                        Sales: {product.sales}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleViewProduct(product.id)}
                        className="flex-1 px-3 py-2 border border-neutral-200 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
                      >
                        View
                      </button>
                      <button 
                        onClick={() => handleEditProduct(product.id)}
                        className="flex-1 px-3 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteProduct(product.id)}
                        className="px-3 py-2 border border-red-200 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-900">Delete Product</h3>
                <p className="text-sm text-neutral-600">This action cannot be undone</p>
              </div>
            </div>
            <p className="text-neutral-700 mb-6">
              Are you sure you want to delete this product? This will permanently remove the product from your inventory and all related data.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2.5 border border-neutral-200 rounded-lg font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
