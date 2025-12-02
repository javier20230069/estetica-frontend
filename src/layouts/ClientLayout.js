import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/LogoImagen.png';
import './ClientLayout.css';

function ClientLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { path: '/cliente/dashboard', label: 'Inicio', icon: '🏠' },
    { path: '/cliente/mis-citas', label: 'Mis Citas', icon: '📅' },
    { path: '/cliente/agendar', label: 'Nueva Cita', icon: '✂️' },
  ];

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="client-layout">
      {/* HEADER MEJORADO */}
      <header className="client-header">
        <div className="header-container">
          {/* LOGO SECTION */}
          <div className="logo-section">
            <Link to="/cliente/dashboard" className="logo-link">
              <img src={logo} alt="Ezequiel Castillo Hair Designer" className="client-logo" />
              <span className="logo-badge">Cliente</span>
            </Link>
          </div>

          {/* DESKTOP NAVIGATION */}
          <nav className="client-nav">
            <div className="user-welcome">
              <span className="welcome-text">¡Hola,</span>
              <strong className="user-name">{user?.nombre || 'Cliente'}</strong>
              <div className="user-status">💎 Premium</div>
            </div>

            <div className="nav-links">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link ${isActiveLink(item.path) ? 'active' : ''}`}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {item.label}
                  {isActiveLink(item.path) && <div className="active-indicator"></div>}
                </Link>
              ))}
            </div>

            <button 
              onClick={logout} 
              className="btn-logout-client"
            >
              <span className="logout-icon">🚪</span>
              Salir
            </button>
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button 
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* MOBILE MENU */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-user-info">
            <div className="user-avatar">
              {user?.nombre?.charAt(0) || 'C'}
            </div>
            <div>
              <div className="user-name-mobile">{user?.nombre || 'Cliente'}</div>
              <div className="user-email">{user?.email}</div>
            </div>
          </div>

          <nav className="mobile-nav-links">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`mobile-nav-link ${isActiveLink(item.path) ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="mobile-nav-icon">{item.icon}</span>
                {item.label}
                {isActiveLink(item.path) && <div className="mobile-active-indicator"></div>}
              </Link>
            ))}
          </nav>

          <button 
            onClick={logout} 
            className="btn-logout-mobile"
          >
            <span className="logout-icon">🚪</span>
            Cerrar Sesión
          </button>
        </div>

        {/* OVERLAY PARA MOBILE */}
        {isMobileMenuOpen && (
          <div 
            className="mobile-overlay"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
        )}
      </header>

      {/* MAIN CONTENT */}
      <main className="client-content">
        <div className="content-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default ClientLayout;