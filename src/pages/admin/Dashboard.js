import React from 'react';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <h2>Panel de Control</h2>
      <p>Bienvenido al sistema de administración de Ezequiel Castillo.</p>

      <div className="dashboard-grid">
        {/* Tarjeta 1 */}
        <div className="dash-card">
          <span className="card-icon">📅</span>
          <h3>Gestión de Citas</h3>
          <p>Ver agenda, confirmar o cancelar citas.</p>
        </div>

        {/* Tarjeta 2 */}
        <div className="dash-card">
          <span className="card-icon">🧴</span>
          <h3>Inventario</h3>
          <p>Control de productos y stock.</p>
        </div>

        {/* Tarjeta 3 */}
        <div className="dash-card">
          <span className="card-icon">💰</span>
          <h3>Ventas</h3>
          <p>Registrar ventas y ver ingresos.</p>
        </div>

        {/* Tarjeta 4 */}
        <div className="dash-card">
          <span className="card-icon">👥</span>
          <h3>Clientes</h3>
          <p>Base de datos de usuarios registrados.</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;