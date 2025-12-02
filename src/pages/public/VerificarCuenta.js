import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Login.css'; // Usamos el mismo estilo limpio
import API_URL from '../../config'; // Importa la URL

function VerificarCuenta() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  
  // Recibimos el email desde el Registro
  const email = location.state?.email;

  // Si entran directo sin email, los mandamos al registro
  if (!email) {
    // Opcional: Podrías poner un input para que escriban su email si no viene en el estado
    return (
      <div className="auth-container">
        <div className="auth-form">
          <p>Error: No se especificó un correo para verificar.</p>
          <button onClick={() => navigate('/login')} className="submit-btn">Ir al Login</button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`${API_URL}/api/auth/verify-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Error al verificar');

      // ¡Éxito!
      alert('¡Cuenta activada con éxito! Ahora puedes iniciar sesión.');
      navigate('/login'); 

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Activar Cuenta</h2>
        <p style={{textAlign: 'center', marginBottom: '20px', fontSize: '0.9rem'}}>
          Hemos enviado un código de verificación a: <br/><strong>{email}</strong>
        </p>

        {error && <small className="error-msg" style={{textAlign: 'center', marginBottom:'10px'}}>{error}</small>}
        
        <div className="form-group">
          <label>Código de Verificación:</label>
          <input 
            type="text" 
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required 
            maxLength="6"
            placeholder="Ej: 123456"
            style={{ textAlign: 'center', fontSize: '1.2rem', letterSpacing: '5px' }}
          />
        </div>

        <button type="submit" className="submit-btn">Activar</button>
      </form>
    </div>
  );
}

export default VerificarCuenta;