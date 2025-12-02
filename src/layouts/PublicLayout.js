import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import logo from '../assets/LogoImagen.png'; // Importamos tu logo
import './PublicLayout.css'; // Crearemos este archivo de estilos

function Header() {
  return (
    <header className="main-header">
      <div className="header-container">
        
        {/* 1. LOGO (Clickeable para ir al inicio) */}
        <div className="logo-container">
          <Link to="/">
            <img src={logo} alt="Ezequiel Castillo Logo" className="header-logo" />
          </Link>
        </div>

        {/* 2. NAVEGACIÓN (Enlaces centrales - Opcional) */}
        <nav className="nav-links">
          <Link to="/">Inicio</Link>
          <a href="#servicios">Servicios</a> {/* Enlace ancla a la sección del Home */}
          <Link to="/terminos-y-condiciones">Términos</Link>
        </nav>

        {/* 3. BOTONES DE ACCIÓN (Derecha) */}
        <div className="header-actions">
          <Link to="/login" className="btn-login">
            Iniciar Sesión
          </Link>
          <Link to="/registro" className="btn-registro">
            Registrarse
          </Link>
        </div>

      </div>
    </header>
  );
}

function PublicLayout() {
  return (
    <div className="layout-wrapper">
      <Header />
      <main className="layout-content">
        <Outlet /> 
      </main>
    </div>
  );
}

export default PublicLayout;