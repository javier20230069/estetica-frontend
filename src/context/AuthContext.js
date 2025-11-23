import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

// 1. Crear el Contexto
const AuthContext = createContext();

// TIEMPO DE INACTIVIDAD (15 minutos en milisegundos)
// 15 * 60 * 1000 = 900,000 ms
const INACTIVITY_TIME = 15 * 60 * 1000;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  // Función de Logout (Cerrar Sesión)
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    // Opcional: Redirigir al login si es necesario, aunque el Router lo hará
  }, []);

  // Función de Login
  const login = (userData, userToken) => {
    localStorage.setItem('token', userToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(userToken);
    setUser(userData);
  };

  // --- LÓGICA DE AUTO-LOGOUT POR INACTIVIDAD ---
  useEffect(() => {
    // Si no hay usuario logueado, no hacemos nada
    if (!user) return;

    let inactivityTimer;

    // Función que reinicia el contador
    const resetTimer = () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
      
      inactivityTimer = setTimeout(() => {
        console.log("Sesión expirada por inactividad.");
        logout(); // ¡Cierra la sesión!
        alert("Tu sesión ha expirado por inactividad."); // Avisar al usuario
      }, INACTIVITY_TIME);
    };

    // Eventos que consideramos "actividad"
    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];

    // Escuchar los eventos
    events.forEach(event => window.addEventListener(event, resetTimer));

    // Iniciar el timer la primera vez
    resetTimer();

    // Limpieza: Quitar los eventos cuando el componente se desmonte o el usuario salga
    return () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
      events.forEach(event => window.removeEventListener(event, resetTimer));
    };
  }, [user, logout]); // Se ejecuta cuando el usuario cambia (entra/sale)


  // Cargar sesión inicial
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};