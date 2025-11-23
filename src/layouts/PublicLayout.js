import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../App.css'; // Usamos los estilos principales

// --- Encabezado (Header) ---
// Lo movimos de App.js aquí
function Header() {
  return (
    <header className="app-header">
      <div className="logo">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h1>Mi Estética</h1>
        </Link>
      </div>
      <nav className="navigation">
        <Link to="/login">
          <button>Iniciar Sesión</button>
        </Link>
        <Link to="/registro">
          <button>Registrarse</button>
        </Link>
      </nav>
    </header>
  );
}

// --- Plantilla Pública ---
function PublicLayout() {
  return (
    <div className="App">
      <Header />
      <main>
        {/* Outlet es el espacio donde se renderizarán 
            tus páginas (HomePage, Login, Registro, etc.) */}
        <Outlet /> 
      </main>
      {/* Aquí podrías poner un <Footer /> si tuvieras uno */}
    </div>
  );
}

export default PublicLayout;