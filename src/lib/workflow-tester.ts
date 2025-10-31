/**
 * Queen Kay E-commerce - Workflow Test Suite
 * 
 * This file contains utilities to test various workflows in the application
 * Run this in the browser console to test different features
 */

// Color coding for console logs
const colors = {
  success: 'color: #10B981; font-weight: bold;',
  error: 'color: #EF4444; font-weight: bold;',
  info: 'color: #3B82F6; font-weight: bold;',
  warning: 'color: #F59E0B; font-weight: bold;',
};

// Extend Window interface to include WorkflowTester and Sentry
declare global {
  interface Window {
    WorkflowTester: WorkflowTester;
    Sentry: {
      captureException: (error: Error) => void;
      captureMessage: (message: string) => void;
    };
  }
}

interface TestResult {
  test: string;
  results: Array<{
    page?: string;
    status: number | string;
    success: boolean;
    [key: string]: unknown;
  }>;
}

class WorkflowTester {
  results: TestResult[];

  constructor() {
    this.results = [];
    console.log('%c🚀 Queen Kay Workflow Tester Initialized', colors.info);
  }

  // Test 1: Check if all admin pages are accessible
  async testAdminPages() {
    console.log('%c\n📊 Testing Admin Pages...', colors.info);
    
    const adminPages = [
      '/admin',
      '/admin/products',
      '/admin/orders',
      '/admin/customers',
      '/admin/shipping',
      '/admin/inventory',
      '/admin/reports',
      '/admin/marketing',
      '/admin/analytics',
      '/admin/settings',
    ];

    const results = [];
    
    for (const page of adminPages) {
      try {
        const response = await fetch(page, { method: 'HEAD' });
        const status = response.ok ? '✅' : '❌';
        const color = response.ok ? colors.success : colors.error;
        
        console.log(`%c${status} ${page} - ${response.status}`, color);
        results.push({ page, status: response.status, success: response.ok });
      } catch (error) {
        console.log(`%c❌ ${page} - Error`, colors.error);
        results.push({ page, status: 'error', success: false });
      }
    }
    
    this.results.push({ test: 'Admin Pages', results });
    return results;
  }

  // Test 2: Check localStorage functionality (Cart)
  testLocalStorage() {
    console.log('%c\n💾 Testing LocalStorage (Cart)...', colors.info);
    
    try {
      // Test write
      const testData = { test: true, timestamp: Date.now() };
      localStorage.setItem('test-cart', JSON.stringify(testData));
      
      // Test read
      // Test retrieval
      const retrieved = JSON.parse(localStorage.getItem('test-cart') || '{}');
      
      // Test delete
      localStorage.removeItem('test-cart');
      
      if (retrieved && retrieved.test === true) {
        console.log('%c✅ LocalStorage working correctly', colors.success);
        return true;
      } else {
        console.log('%c❌ LocalStorage read/write failed', colors.error);
        return false;
      }
    } catch (error) {
      console.log('%c❌ LocalStorage error:', colors.error, error);
      return false;
    }
  }

  // Test 3: Check Zustand cart store
  testCartStore() {
    console.log('%c\n🛒 Testing Cart Store...', colors.info);
    
    try {
      // Check if useCart is available
      if (typeof window !== 'undefined') {
        console.log('%c✅ Running in browser environment', colors.success);
        
        // Test cart operations (this would need actual store access)
        console.log('%c⚠️  Cart store test requires running in app context', colors.warning);
        return true;
      }
    } catch (error) {
      console.log('%c❌ Cart store error:', colors.error, error);
      return false;
    }
  }

  // Test 4: Check authentication flow
  testAuth() {
    console.log('%c\n🔐 Testing Authentication...', colors.info);
    
    try {
      // Check if user data exists in localStorage
      const userData = localStorage.getItem('user');
      
      if (userData) {
        const user = JSON.parse(userData);
        console.log('%c✅ User authenticated:', colors.success, user.email);
        return true;
      } else {
        console.log('%c⚠️  No user logged in', colors.warning);
        return false;
      }
    } catch (error) {
      console.log('%c❌ Auth check error:', colors.error, error);
      return false;
    }
  }

  // Test 5: Check image loading
  async testImageLoading() {
    console.log('%c\n🖼️  Testing Image Loading...', colors.info);
    
    const testImages = [
      '/products/1g.png',
      '/products/2g.png',
      '/products/3g.png',
      '/products/4g.png',
      '/products/5g.png',
    ];

    const results = [];
    
    for (const imagePath of testImages) {
      try {
        const img = new Image();
        const loaded = await new Promise((resolve) => {
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false);
          img.src = imagePath;
        });
        
        const status = loaded ? '✅' : '❌';
        const color = loaded ? colors.success : colors.error;
        
        console.log(`%c${status} ${imagePath}`, color);
        results.push({ image: imagePath, loaded });
      } catch (error) {
        console.log(`%c❌ ${imagePath} - Error`, colors.error);
        results.push({ image: imagePath, loaded: false });
      }
    }
    
    return results;
  }

  // Test 6: Check responsive breakpoints
  testResponsive() {
    console.log('%c\n📱 Testing Responsive Breakpoints...', colors.info);
    
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    console.log(`%cScreen Size: ${width}x${height}`, colors.info);
    
    if (width < 640) {
      console.log('%c📱 Mobile (< 640px)', colors.info);
    } else if (width >= 640 && width < 768) {
      console.log('%c📱 Small Tablet (640-768px)', colors.info);
    } else if (width >= 768 && width < 1024) {
      console.log('%c💻 Tablet (768-1024px)', colors.info);
    } else if (width >= 1024 && width < 1280) {
      console.log('%c🖥️  Laptop (1024-1280px)', colors.info);
    } else {
      console.log('%c🖥️  Desktop (> 1280px)', colors.info);
    }
    
    return { width, height };
  }

  // Test 7: Check for console errors
  testConsoleErrors() {
    console.log('%c\n🐛 Checking for Console Errors...', colors.info);
    
    // This would need to be run before other code executes
    console.log('%c⚠️  Check browser console for any red error messages', colors.warning);
    console.log('%c⚠️  Common errors to look for:', colors.warning);
    console.log('  - 404 for missing resources');
    console.log('  - CORS errors');
    console.log('  - JavaScript errors');
    console.log('  - Failed API calls');
  }

  // Test 8: Performance metrics
  testPerformance() {
    console.log('%c\n⚡ Testing Performance Metrics...', colors.info);
    
    if (window.performance && window.performance.timing) {
      const timing = window.performance.timing;
      const loadTime = timing.loadEventEnd - timing.navigationStart;
      const domReady = timing.domContentLoadedEventEnd - timing.navigationStart;
      const firstPaint = timing.responseEnd - timing.requestStart;
      
      console.log(`%c📊 Page Load Time: ${loadTime}ms`, loadTime < 3000 ? colors.success : colors.warning);
      console.log(`%c📊 DOM Ready: ${domReady}ms`, domReady < 2000 ? colors.success : colors.warning);
      console.log(`%c📊 First Paint: ${firstPaint}ms`, firstPaint < 1000 ? colors.success : colors.warning);
      
      return { loadTime, domReady, firstPaint };
    } else {
      console.log('%c⚠️  Performance API not available', colors.warning);
      return null;
    }
  }

  // Test 9: Check Sentry integration
  testSentry() {
    console.log('%c\n🔍 Testing Sentry Integration...', colors.info);
    
    if (typeof window !== 'undefined' && window.Sentry) {
      console.log('%c✅ Sentry is loaded', colors.success);
      
      // Test error capture (optional - uncomment to test)
      // console.log('%c⚠️  Sending test error to Sentry...', colors.warning);
      // window.Sentry.captureException(new Error('Test error from workflow tester'));
      
      return true;
    } else {
      console.log('%c⚠️  Sentry not loaded (this is normal in development)', colors.warning);
      return false;
    }
  }

  // Test 10: Network requests
  async testNetworkRequests() {
    console.log('%c\n🌐 Testing Network Requests...', colors.info);
    
    // Check if API endpoints are reachable
    const endpoints = [
      '/api/gemini',
    ];

    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint, { method: 'HEAD' });
        const status = response.ok ? '✅' : '❌';
        const color = response.ok ? colors.success : colors.error;
        
        console.log(`%c${status} ${endpoint} - ${response.status}`, color);
      } catch (error) {
        console.log(`%c❌ ${endpoint} - Error`, colors.error);
      }
    }
  }

  // Run all tests
  async runAllTests() {
    console.log('%c\n🧪 Running Complete Workflow Test Suite...', 'color: #7C3AED; font-size: 18px; font-weight: bold;');
    console.log('%c════════════════════════════════════════════', 'color: #7C3AED;');
    
    const startTime = Date.now();
    
    // Run all tests
    await this.testAdminPages();
    this.testLocalStorage();
    this.testCartStore();
    this.testAuth();
    await this.testImageLoading();
    this.testResponsive();
    this.testConsoleErrors();
    this.testPerformance();
    this.testSentry();
    await this.testNetworkRequests();
    
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    console.log('%c\n════════════════════════════════════════════', 'color: #7C3AED;');
    console.log(`%c✅ All tests completed in ${duration}ms`, 'color: #10B981; font-size: 16px; font-weight: bold;');
    console.log('%c\n📋 Summary:', colors.info);
    console.log('1. Check above for any ❌ failed tests');
    console.log('2. Review browser console for errors');
    console.log('3. Test manually: navigation, forms, cart, checkout');
    console.log('4. Check responsive design on different screen sizes');
    console.log('5. Verify Sentry error tracking (if configured)');
    console.log('%c\n════════════════════════════════════════════\n', 'color: #7C3AED;');
  }

  // Quick health check
  async quickCheck() {
    console.log('%c🏥 Running Quick Health Check...', colors.info);
    
    const checks = {
      adminAccessible: false,
      localStorage: false,
      auth: false,
      responsive: false,
    };

    // Check admin page
    try {
      const response = await fetch('/admin', { method: 'HEAD' });
      checks.adminAccessible = response.ok;
    } catch (e) {
      checks.adminAccessible = false;
    }

    // Check localStorage
    checks.localStorage = this.testLocalStorage();

    // Check auth
    checks.auth = this.testAuth();

    // Check responsive
    const viewport = this.testResponsive();
    checks.responsive = viewport.width > 0;

    const allPassed = Object.values(checks).every(v => v === true);
    
    console.log('%c\n📊 Health Check Results:', colors.info);
    console.table(checks);
    
    if (allPassed) {
      console.log('%c✅ All systems operational!', colors.success);
    } else {
      console.log('%c⚠️  Some checks failed - review above', colors.warning);
    }
    
    return checks;
  }
}

// Create global instance for easy access
if (typeof window !== 'undefined') {
  window.WorkflowTester = new WorkflowTester();
  
  console.log('%c\n════════════════════════════════════════════', 'color: #7C3AED;');
  console.log('%c🎯 Queen Kay Workflow Tester Ready!', 'color: #7C3AED; font-size: 16px; font-weight: bold;');
  console.log('%c════════════════════════════════════════════', 'color: #7C3AED;');
  console.log('%c\nUsage:', 'color: #3B82F6; font-weight: bold;');
  console.log('%c  WorkflowTester.runAllTests()     - Run complete test suite', 'color: #6B7280;');
  console.log('%c  WorkflowTester.quickCheck()      - Quick health check', 'color: #6B7280;');
  console.log('%c  WorkflowTester.testAdminPages()  - Test admin page access', 'color: #6B7280;');
  console.log('%c  WorkflowTester.testLocalStorage() - Test browser storage', 'color: #6B7280;');
  console.log('%c  WorkflowTester.testAuth()        - Check authentication', 'color: #6B7280;');
  console.log('%c  WorkflowTester.testPerformance() - Check performance metrics', 'color: #6B7280;');
  console.log('%c\n════════════════════════════════════════════\n', 'color: #7C3AED;');
}

export default WorkflowTester;
