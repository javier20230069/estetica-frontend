import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext'; // Importamos nuestro hook

// 'roles' será un array, ej: ['admin'] o ['cliente']
const RutaProtegida = ({ roles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    // Muestra un "cargando" mientras se verifica el token
    return <div>Cargando...</div>; 
  }

  // 1. ¿No hay usuario? (No está logueado)
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 2. ¿La ruta requiere roles y el usuario NO tiene ese rol?
  if (roles && !roles.includes(user.tipo_usuario)) {
    // El usuario es 'cliente' pero intenta entrar a '/admin'
    return <Navigate to="/" replace />; // Lo mandamos al inicio
  }

  // 3. ¡Éxito! El usuario está logueado Y tiene el rol correcto
  // Outlet renderiza el componente "hijo" (ej: AdminLayout)
  return <Outlet />;
};

export default RutaProtegida;