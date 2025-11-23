import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Login.css'; // Reusaremos los estilos de Login

function VerificarCodigo() {
  const [code, setCode] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  
  // Obtenemos el email que pasamos desde la página de Registro
  const email = location.state?.email;

  // Si no hay email, redirigir al registro (evita que entren a esta URL directo)
  if (!email) {
    navigate('/registro');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://localhost:5000/api/auth/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, code: code })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al verificar el código');
      }

      // ¡Éxito!
      alert(data.message);
      navigate('/login'); // Redirigir al Login

    } catch (error) {
      console.error('Error de verificación:', error);
      alert(error.message);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Verificar tu Cuenta</h2>
        <p style={{ textAlign: 'center', marginBottom: '20px' }}>
          Enviamos un código de 6 dígitos a: <br/> <strong>{email}</strong>
        </p>
        
        <div className="form-group">
          <label>Código de Verificación:</label>
          <input 
            type="text" 
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required 
            maxLength="6"
            style={{ textAlign: 'center', fontSize: '1.2rem', letterSpacing: '5px' }}
          />
        </div>

        <button type="submit" className="submit-btn">Verificar y Activar</button>
      </form>
    </div>
  );
}

export default VerificarCodigo;