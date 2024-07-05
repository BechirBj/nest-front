// AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean | undefined ;
  userRole: string | null;
  login: (role: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
    localStorage.getItem('token')?true : false,
  );
  const [userRole, setUserRole] = useState<string | null>(null);
  const [navigate,setNavigator]=useState('')

 
  useEffect(()=>{
    const token = localStorage.getItem('token');
    const role= localStorage.getItem('role');
    if(token){
      setIsAuthenticated(true);
      setUserRole(role);
    }else{
      setIsAuthenticated(false);
      setUserRole(null);
    }
  },[]);


  const login = (role: string) => {
    setIsAuthenticated(true);
    setUserRole(role);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
