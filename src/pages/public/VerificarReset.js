import React, { useState, useEffect } from 'react'; // <-- Importar useEffect
import { useNavigate, useLocation } from 'react-router-dom';
import './Login.css';

function VerificarReset() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  
  const email = location.state?.email;

  // --- NUEVO: Estados para el botón de Reenviar ---
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [resendMessage, setResendMessage] = useState('');

  // Si no hay email (entraron a la URL directo), los regresamos
  if (!email && !location.state) { // Evita un bucle si location.state es null
     navigate('/olvide-password');
  }

  // --- NUEVO: Cooldown para el botón de Reenviar ---
  useEffect(() => {
    if (resendCooldown <= 0) return;
    
    const timer = setTimeout(() => {
      setResendCooldown(resendCooldown - 1);
    }, 1000); // Resta 1 segundo
    
    return () => clearTimeout(timer); // Limpia el timer si el componente se desmonta
  }, [resendCooldown]);

  // --- NUEVO: Función para reenviar el código ---
  const handleResendCode = async () => {
    if (isResending || resendCooldown > 0) return; // Prevenir spam

    setIsResending(true);
    setResendMessage('');
    setError(''); // Limpiar errores viejos

    try {
      // Llamamos a la misma ruta que la primera página
      const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Error al reenviar');
      
      setResendMessage('¡Código reenviado! Revisa tu correo.');
      setResendCooldown(60); // Cooldown de 60 segundos

    } catch (err) {
      setError(err.message);
    }
    setIsResending(false);
  };

  // --- Función de Verificación (sin cambios) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('https://localhost:5000/api/auth/verify-reset-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, code: code })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Error al verificar');

      navigate('/reset-password', { state: { email: email, code: code } });

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Verificar Código</h2>
        <p style={{textAlign: 'center', marginBottom: '20px', fontSize: '0.9rem'}}>
          Revisa tu correo e ingresa el código enviado a <br/><strong>{email}</strong>
        </p>

        {error && <small className="error-msg" style={{textAlign: 'center'}}>{error}</small>}
        {resendMessage && <p style={{color: 'green', textAlign: 'center', fontSize: '0.9rem'}}>{resendMessage}</p>}
        
        <div className="form-group">
          <label>Código de 6 dígitos:</label>
          <input 
            type="text" 
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required 
            maxLength="6"
            style={{ textAlign: 'center', fontSize: '1.2rem', letterSpacing: '5px' }}
            className={error ? 'input-error' : ''}
          />
        </div>
        <button type="submit" className="submit-btn">Verificar</button>

        {/* --- NUEVO: Botón de Reenviar Código --- */}
        <p style={{textAlign: 'center', marginTop: '20px', fontSize: '0.9rem'}}>
          ¿No recibiste el código?
          <button 
            type="button" 
            className="terms-link" // Reusamos el estilo de enlace
            onClick={handleResendCode}
            disabled={isResending || resendCooldown > 0}
            style={{background: 'none', border: 'none', cursor: 'pointer', padding: '0', marginLeft: '5px', fontSize: '0.9rem'}}
          >
            {isResending ? 'Enviando...' : (resendCooldown > 0 ? `Reenviar en ${resendCooldown}s` : 'Reenviar código')}
          </button>
        </p>
      </form>
    </div>
  );
}
export default VerificarReset;