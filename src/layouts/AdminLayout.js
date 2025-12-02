import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo_completo.png';
import './AdminLayout.css'; // Importamos el CSS nuevo

function AdminLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="admin-layout">
      <header className="admin-header">
        <div className="logo-section">
          <Link to="/admin/dashboard">
            <img src={logo} alt="Admin Panel" className="admin-logo" />
          </Link>
        </div>
        
        <nav className="admin-nav">
          <span style={{marginRight: '15px', color: '#ad1457', fontWeight: 'bold'}}>
            Hola, {user?.nombre} (Admin)
          </span>
          <Link to="/admin/dashboard">Inicio</Link>
          <Link to="/admin/citas">Gestionar Citas</Link> {/* Futuro */}
          <Link to="/admin/inventario">Inventario</Link> {/* Futuro */}
          <button onClick={logout} className="btn-logout">Cerrar Sesión</button>
        </nav>
      </header>

      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;