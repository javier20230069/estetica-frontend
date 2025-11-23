import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ClientLayout() {
  const { user, logout } = useAuth();

  return (
    <div>
      <header style={{ background: '#fce4ec', color: '#ad1457', padding: '10px' }}>
        <h3>Mi Cuenta (Cliente)</h3>
        <p>Hola, {user?.nombre}</p>
        <nav>
          <Link to="/cliente/mis-citas">Mis Citas</Link> | 
          <Link to="/cliente/agendar">Agendar Cita</Link> | {/* (Futura) */}
          <button onClick={logout}>Cerrar Sesión</button>
        </nav>
      </header>
      <main style={{ padding: '20px' }}>
        {/* Aquí se renderizarán las páginas de cliente */}
        <Outlet />
      </main>
    </div>
  );
}

export default ClientLayout;