import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AdminLayout() {
  const { user, logout } = useAuth();

  return (
    <div>
      <header style={{ background: '#333', color: 'white', padding: '10px' }}>
        <h3>Panel de Administrador</h3>
        <p>Bienvenido, {user?.nombre}</p>
        <nav>
          <Link to="/admin/dashboard">Dashboard</Link> | 
          <Link to="/admin/inventario">Inventario</Link> | {/* (Futura) */}
          <button onClick={logout}>Cerrar Sesión</button>
        </nav>
      </header>
      <main style={{ padding: '20px' }}>
        {/* Aquí se renderizarán las páginas de admin (Dashboard, Inventario, etc.) */}
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;