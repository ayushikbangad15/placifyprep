import { create } from 'zustand';
import { mockUser } from './mockData';

interface User {
  id: string;
  name: string;
  email: string;
  year: number;
  branch: string;
  college: string;
  avatar: string;
  isAuthenticated: boolean;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Omit<User, 'id' | 'isAuthenticated'>) => Promise<boolean>;
  loginWithSocial: (provider: string) => Promise<boolean>;
  logout: () => void;
}

interface AppStore {
  chatOpen: boolean;
  setChatOpen: (open: boolean) => void;
  bookmarkedMaterials: string[];
  toggleBookmark: (materialId: string) => void;
}

// Test credentials for demo
const testCredentials = [
  { email: 'test@placify.com', password: 'test123' },
  { email: 'admin@placify.com', password: 'admin123' },
  { email: 'student@placify.com', password: 'student123' },
  { email: 'demo@placify.com', password: 'demo123' },
  { email: 'arjun.sharma@example.com', password: 'password123' }
];

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  
  login: async (email: string, password: string): Promise<boolean> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check against test credentials
    const validCredential = testCredentials.find(
      cred => cred.email.toLowerCase() === email.toLowerCase() && cred.password === password
    );
    
    if (validCredential) {
      // Create user based on email
      let userData = { ...mockUser };
      
      if (email.includes('admin')) {
        userData = {
          ...userData,
          name: 'Admin User',
          email: email,
          year: 4,
          branch: 'Computer Science Engineering',
          college: 'Placify Admin',
          isAuthenticated: true
        };
      } else if (email.includes('test')) {
        userData = {
          ...userData,
          name: 'Test User',
          email: email,
          year: 3,
          branch: 'Information Technology',
          college: 'Test College',
          isAuthenticated: true
        };
      } else if (email.includes('student')) {
        userData = {
          ...userData,
          name: 'Student Demo',
          email: email,
          year: 2,
          branch: 'Electronics & Communication',
          college: 'Demo University',
          isAuthenticated: true
        };
      } else if (email.includes('demo')) {
        userData = {
          ...userData,
          name: 'Demo User',
          email: email,
          year: 1,
          branch: 'Mechanical Engineering',
          college: 'Demo Institute',
          isAuthenticated: true
        };
      } else {
        userData = {
          ...userData,
          email: email,
          isAuthenticated: true
        };
      }
      
      set({ user: userData, isAuthenticated: true });
      return true;
    }
    
    return false;
  },
  
  register: async (userData): Promise<boolean> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      const user = {
        ...userData,
        id: Date.now().toString(),
        isAuthenticated: true,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      };
      set({ user, isAuthenticated: true });
      return true;
    } catch (error) {
      return false;
    }
  },
  
  loginWithSocial: async (provider: string): Promise<boolean> => {
    // Simulate social login delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    try {
      const socialUser = {
        id: Date.now().toString(),
        name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
        email: `user@${provider}.com`,
        year: 3,
        branch: 'Computer Science Engineering',
        college: `${provider.charAt(0).toUpperCase() + provider.slice(1)} University`,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        isAuthenticated: true
      };
      
      set({ user: socialUser, isAuthenticated: true });
      return true;
    } catch (error) {
      return false;
    }
  },
  
  logout: () => {
    set({ user: null, isAuthenticated: false });
  }
}));

export const useAppStore = create<AppStore>((set, get) => ({
  chatOpen: false,
  setChatOpen: (open: boolean) => set({ chatOpen: open }),
  bookmarkedMaterials: ['1', '3'], // Mock some bookmarked materials
  toggleBookmark: (materialId: string) => {
    const { bookmarkedMaterials } = get();
    const isBookmarked = bookmarkedMaterials.includes(materialId);
    
    if (isBookmarked) {
      set({
        bookmarkedMaterials: bookmarkedMaterials.filter(id => id !== materialId)
      });
    } else {
      set({
        bookmarkedMaterials: [...bookmarkedMaterials, materialId]
      });
    }
  }
}));