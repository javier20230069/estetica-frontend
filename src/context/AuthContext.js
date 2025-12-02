import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

const AuthContext = createContext();
const INACTIVITY_TIME = 15 * 60 * 1000; 

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Logout llama al backend para borrar cookie
  const logout = useCallback(async () => {
    try {
      await fetch('https://localhost:5000/api/auth/logout', { 
          method: 'POST',
          credentials: 'include' // IMPORTANTE
      });
    } catch (error) {
      console.error("Error logout", error);
    } finally {
      localStorage.removeItem('user');
      setUser(null);
    }
  }, []);

  // Login solo guarda datos de usuario (UI), no token
  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  // Inactividad
  useEffect(() => {
    if (!user) return;
    let inactivityTimer;
    const resetTimer = () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        alert("Sesión expirada.");
        logout();
      }, INACTIVITY_TIME);
    };
    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    events.forEach(event => window.addEventListener(event, resetTimer));
    resetTimer();
    return () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
      events.forEach(event => window.removeEventListener(event, resetTimer));
    };
  }, [user, logout]);

  // Cargar usuario al inicio
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};