import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Importamos los estilos nuevos

function HomePage() {
  return (
    <div className="homepage-container">
      
      {/* 1. HERO SECTION */}
      <header className="hero">
        <div className="hero-content">
          <h1>EZEQUIEL CASTILLO</h1>
          <p>Hair Designer & Estética Integral</p>
          <Link to="/login" className="cta-button">
            Agendar Cita Ahora
          </Link>
        </div>
      </header>

      {/* 2. NUESTROS SERVICIOS */}
      <section className="services-section">
        <h2>Nuestros Servicios</h2>
        <div className="services-grid">
          
          <div className="service-card">
            <div className="service-icon">✂️</div>
            <h3>Corte y Estilo</h3>
            <p>Diseño de imagen personalizado, cortes modernos y clásicos para damas y caballeros.</p>
          </div>

          <div className="service-card">
            <div className="service-icon">🎨</div>
            <h3>Colorimetría</h3>
            <p>Tintes, efectos de color, balayage y tratamientos capilares de alta gama.</p>
          </div>

          <div className="service-card">
            <div className="service-icon">🧔🏻</div>
            <h3>Barbería</h3>
            <p>Cuidado integral de barba, perfilado y tratamientos faciales para caballeros.</p>
          </div>

          <div className="service-card">
            <div className="service-icon">✨</div>
            <h3>Cuidado Personal</h3>
            <p>Depilaciones y venta de productos cosméticos exclusivos.</p>
          </div>

        </div>
      </section>

      {/* 3. UBICACIÓN Y HORARIOS */}
      <section className="info-section">
        <div className="info-text">
          <h2>Visítanos</h2>
          <p>Vive la experiencia de un servicio profesional en el corazón de la Huasteca Hidalguense.</p>
          
          <div className="info-details">
            <p><strong>📍 Dirección:</strong> Velázquez Ibarra 22, Centro, Huejutla, Hidalgo. C.P. 43011</p>
            <p><strong>📞 Teléfono:</strong> 771 202 8110</p>
            <p><strong>⏰ Horario Tintes:</strong> Lun-Vie 11:00 - 16:00 | Sáb hasta 15:00</p>
          </div>
          
          <br />
          <Link to="/registro" style={{color: '#ad1457', fontWeight: 'bold'}}>
            ¿Aún no tienes cuenta? Regístrate aquí
          </Link>
        </div>
        
        {/* Aquí podrías poner un mapa de Google Maps más adelante */}
        <div className="info-map">
           <img 
             src="https://via.placeholder.com/400x300?text=Mapa+de+Ubicacion" 
             alt="Mapa de la estética" 
             style={{borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.2)'}}
           />
        </div>
      </section>

      {/* 4. FOOTER */}
      <footer className="home-footer">
        <p>&copy; {new Date().getFullYear()} Ezequiel Castillo Ángeles Hair Designer. Todos los derechos reservados.</p>
        <p>
          <Link to="/terminos-y-condiciones" style={{color: '#ccc', textDecoration: 'none'}}>Términos y Condiciones</Link>
        </p>
      </footer>

    </div>
  );
}

export default HomePage;