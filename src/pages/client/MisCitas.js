import React from 'react';
import { useAuth } from '../../context/AuthContext';
import './MisCitas.css';

function MisCitas() {
  const { user } = useAuth();

  // Más adelante aquí puedes traer las citas reales
  const citas = []; // por ahora vacío

  const handleNuevaCita = () => {
    // Aquí después rediriges a /agendar o abres un modal
    console.log('Ir a agendar nueva cita');
  };

  const tieneCitas = citas && citas.length > 0;

  return (
    <div className="citas-container">
      {/* Tarjeta de bienvenida */}
      <section className="welcome-card">
        <div className="welcome-card-main">
          <h2>¡Hola, {user?.nombre || 'cliente'}!</h2>
          <p>
            Mantén tus citas organizadas y no pierdas ningún cambio de look.
            Aquí verás tus próximas reservas y su estado.
          </p>

          <div className="welcome-card-actions">
            <button onClick={handleNuevaCita}>
              + Agendar nueva cita
            </button>
          </div>
        </div>

        <div className="welcome-card-highlight">
          <span className="welcome-badge">Nuevo</span>
          <p>
            Muy pronto podrás ver el historial de citas, recordatorios
            y notificaciones personalizadas.
          </p>
        </div>
      </section>

      {/* Lista de citas */}
      <section className="citas-list">
        <header className="citas-list-header">
          <div>
            <h3>Mis próximas citas</h3>
            <span>
              {tieneCitas
                ? `Tienes ${citas.length} citas agendadas`
                : 'Aún no tienes citas próximas'}
            </span>
          </div>

          {/* Futuro filtro / ordenamiento */}
          <div className="citas-list-filters">
            <select disabled>
              <option>Ordenar por fecha</option>
            </select>
          </div>
        </header>

        {tieneCitas ? (
          <div className="citas-list-body">
            {citas.map((cita) => (
              <article key={cita.id} className="cita-item">
                <div className="cita-main">
                  <h4>{cita.servicio}</h4>
                  <p>{cita.fecha}</p>
                </div>
                <span className={`cita-status cita-status-${cita.estado}`}>
                  {cita.estado}
                </span>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span className="empty-icon">📅</span>
            <p>No tienes citas programadas próximamente.</p>
            <button
              className="empty-cta"
              onClick={handleNuevaCita}
            >
              Agendar mi primera cita
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default MisCitas;
