import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './DashboardCliente.css';

function DashboardCliente() {
  const { user } = useAuth();

  const quickActions = [
    {
      title: "Nueva Cita",
      description: "Reserva tu próximo cambio de look. Elige servicio, fecha y hora.",
      icon: "📅",
      path: "/cliente/agendar",
      color: "#ad1457"
    },
    {
      title: "Mis Citas",
      description: "Consulta tus citas programadas, historial y estatus.",
      icon: "✂️",
      path: "/cliente/mis-citas",
      color: "#d81b60"
    },
    {
      title: "Productos",
      description: "Explora nuestra selección exclusiva de productos de belleza.",
      icon: "🛍️",
      path: "/catalogo",
      color: "#7b1fa2"
    }
  ];

  return (
    <div className="client-dashboard">
      
      {/* HERO SECTION CON MEJOR CONTRASTE */}
      <section className="dashboard-hero">
        <div className="hero-content">
          <div className="welcome-text">
            <h1>¡Hola, {user?.nombre || 'Cliente'}! 👋</h1>
            <p className="hero-subtitle">Bienvenido a tu espacio personal en Ezequiel Castillo Hair Designer</p>
            <div className="user-stats">
              <span className="stat-item">💎 Cliente Premium</span>
              <span className="stat-item">⭐ 5.0 Rating</span>
            </div>
          </div>
          <div className="hero-decoration">
            <div className="decoration-circle"></div>
            <div className="decoration-circle"></div>
          </div>
        </div>
      </section>

      {/* QUICK ACTIONS GRID */}
      <section className="quick-actions-section">
        <h2 className="section-title">Acciones Rápidas</h2>
        <div className="actions-grid">
          {quickActions.map((action, index) => (
            <Link 
              key={index} 
              to={action.path} 
              className="action-card"
              style={{ '--accent-color': action.color }}
            >
              <div className="card-header">
                <div 
                  className="card-icon" 
                  style={{ backgroundColor: `${action.color}15` }}
                >
                  {action.icon}
                </div>
                <div className="card-badge">Nuevo</div>
              </div>
              <div className="card-content">
                <h3>{action.title}</h3>
                <p>{action.description}</p>
              </div>
              <div className="card-arrow">→</div>
            </Link>
          ))}
        </div>
      </section>

      {/* PROMO BANNER */}
      <section className="promo-banner">
        <div className="promo-content">
          <div className="promo-text">
            <span className="promo-badge">🔥 Oferta Especial</span>
            <h3>¿Necesitas un cambio radical?</h3>
            <p>Descubre nuestros paquetes exclusivos de Colorimetría y Balayage con 20% de descuento</p>
          </div>
          <div className="promo-actions">
            <Link to="/cliente/agendar" className="promo-btn primary">
              Ver Servicios
            </Link>
            <Link to="/servicios" className="promo-btn secondary">
              Más Info
            </Link>
          </div>
        </div>
        <div className="promo-visual">
          <div className="promo-graphic">✨</div>
        </div>
      </section>

      {/* SECCIÓN DE PRÓXIMAS CITAS - VACÍA */}
      <section className="upcoming-appointments">
        <h2 className="section-title">Tu Próxima Cita</h2>
        <div className="no-appointments-card">
          <div className="empty-state">
            <div className="empty-icon">📅</div>
            <h3>No tienes citas programadas</h3>
            <p>Agenda tu primera cita y comienza tu transformación</p>
            <Link to="/cliente/agendar" className="btn-primary">
              Agendar Mi Primera Cita
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

export default DashboardCliente;