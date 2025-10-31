// Simple localStorage-based authentication
export interface User {
  email: string;
  name: string;
}

// Hardcoded credentials for demo
const DEMO_USER = {
  email: 'demo@queenkay.com',
  password: 'demo123',
  name: 'Demo User',
};

export function signIn(email: string, password: string): User | null {
  if (email === DEMO_USER.email && password === DEMO_USER.password) {
    const user = { email: DEMO_USER.email, name: DEMO_USER.name };
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
    }
    return user;
  }
  return null;
}

export function signOut(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user');
  }
}

export function getCurrentUser(): User | null {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
  }
  return null;
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}
