import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function OlvidePassword() {
  const [email, setEmail] = useState('');
  const [metodo, setMetodo] = useState('correo'); // 'correo' o 'pregunta'
  const [step, setStep] = useState(1); // Paso 1: Email, Paso 2: Pregunta
  const [preguntaGuardada, setPreguntaGuardada] = useState('');
  const [respuesta, setRespuesta] = useState('');
  
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Paso 1: El usuario pone su correo y elige método
  const handleBuscarUsuario = async (e) => {
    e.preventDefault();
    setError('');

    if (metodo === 'correo') {
      // Lógica original de enviar correo
      try {
        const res = await fetch('https://localhost:5000/api/auth/forgot-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setMessage(data.message);
        setTimeout(() => navigate('/verificar-reset', { state: { email } }), 2000);
      } catch (err) { setError(err.message); }
    } else {
      // Método PREGUNTA: Primero obtenemos la pregunta del backend
      try {
        const res = await fetch('https://localhost:5000/api/auth/get-question', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        
        // Mapeo para mostrar texto bonito
        const preguntasMap = {
          'nombre_mascota': '¿Cuál es el nombre de tu primera mascota?',
          'ciudad_padres': '¿En qué ciudad se conocieron tus padres?',
          'escuela_primaria': '¿Cómo se llamaba tu escuela primaria?',
          'comida_favorita': '¿Cuál es tu comida favorita?'
        };

        setPreguntaGuardada(preguntasMap[data.pregunta] || data.pregunta);
        setStep(2); // Pasamos a mostrar la pregunta
      } catch (err) { setError(err.message); }
    }
  };

  // Paso 2: Validar la respuesta secreta
  const handleVerificarRespuesta = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://localhost:5000/api/auth/recover-by-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, respuesta })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      // ¡Éxito! Nos saltamos la verificación de código y vamos directo al reset
      // Pasamos el 'resetToken' que nos dio el backend
      navigate('/reset-password', { state: { email, code: data.resetToken } });

    } catch (err) { setError(err.message); }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={step === 1 ? handleBuscarUsuario : handleVerificarRespuesta}>
        <h2>Recuperar Contraseña</h2>
        {error && <small className="error-msg" style={{textAlign: 'center'}}>{error}</small>}
        {message && <p style={{color: 'green', textAlign: 'center'}}>{message}</p>}

        {step === 1 && (
          <>
            <div className="form-group">
              <label>Correo Electrónico:</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Método de recuperación:</label>
              <select value={metodo} onChange={(e) => setMetodo(e.target.value)}>
                <option value="correo">Enviar código al correo</option>
                <option value="pregunta">Responder pregunta secreta</option>
              </select>
            </div>
            <button type="submit" className="submit-btn">Continuar</button>
          </>
        )}

        {step === 2 && (
          <>
            <p style={{textAlign: 'center', fontWeight: 'bold'}}>{preguntaGuardada}</p>
            <div className="form-group">
              <label>Tu Respuesta:</label>
              <input type="text" value={respuesta} onChange={(e) => setRespuesta(e.target.value)} required />
            </div>
            <button type="submit" className="submit-btn">Verificar Respuesta</button>
            <button type="button" onClick={() => setStep(1)} style={{background:'none', border:'none', color:'#ad1457', marginTop:'10px', cursor:'pointer', width:'100%'}}>Volver</button>
          </>
        )}
      </form>
    </div>
  );
}
export default OlvidePassword;