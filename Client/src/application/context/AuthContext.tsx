import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { AuthService } from "../../infrastructure/api/auth.service";

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
  avatar?: string | null;
  bio?: string | null;
  skills?: string[] | null;
  interests?: string[] | null;
  headline?: string | null;
  socialLinks?: SocialLinks | null;
  profileCompleted?: boolean;
  location?: string | null;
  company?: string | null;
  createdAt: string;
  updatedAt: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  updateUser: (user: User) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = AuthService.getToken();
    const storedUser = AuthService.getUser();

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const login = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    AuthService.saveAuthData(newToken, newUser);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    AuthService.clearAuthData();
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    AuthService.saveAuthData(token!, updatedUser);
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!token,
    login,
    logout,
    updateUser,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
