import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Login.css';

// --- (Iconos SVG para el "ojito") ---
const EyeIcon = () => ( <svg viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg> );
const EyeSlashIcon = () => ( <svg viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07l-5.06-5.06M1 1l22 22"></path></svg> );
// --- (Fin Iconos) ---

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Obtenemos el email y el código
  const { email, code } = location.state || {};

  if (!email || !code) {
    navigate('/olvide-password');
  }

  // --- (Copiamos las validaciones de Registro.js) ---
  const validatePassword = (pass) => {
    if (!pass) return "La contraseña es obligatoria.";
    if (pass.length < 8) return "Mínimo 8 caracteres.";
    if (!/[A-Z]/.test(pass)) return "Debe incluir una mayúscula.";
    if (!/[a-z]/.test(pass)) return "Debe incluir una minúscula.";
    if (!/\d/.test(pass)) return "Debe incluir un número.";
    if (!/[@$!%*?&]/.test(pass)) return "Debe incluir un carácter especial (@$!%*?&).";
    return "";
  };
  const handlePasswordChange = (e) => {
    const newPass = e.target.value;
    setPassword(newPass);
    setPasswordError(validatePassword(newPass));
  };
  // --- (Fin de validaciones) ---

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validar contraseña
    const passErr = validatePassword(password);
    if (passErr) {
      setPasswordError(passErr);
      return;
    }
    if (password !== confirmarPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    try {
      const response = await fetch('https://localhost:5000/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code, password })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Error al reestablecer');

      alert(data.message);
      navigate('/login'); // ¡Éxito! Lo mandamos al login

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Crear Nueva Contraseña</h2>
        {error && <small className="error-msg" style={{textAlign: 'center'}}>{error}</small>}

        <div className="form-group">
          <label>Nueva Contraseña:</label>
          <div className="password-wrapper">
            <input 
              type={showPassword ? "text" : "password"} 
              value={password} 
              onChange={handlePasswordChange}
              className={passwordError ? 'input-error' : ''}
            />
            <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
            </button>
          </div>
          {passwordError && <small className="error-msg">{passwordError}</small>}
        </div>
        
        <div className="form-group">
          <label>Confirmar Contraseña:</label>
          <div className="password-wrapper">
            <input 
              type={showConfirmPassword ? "text" : "password"} 
              value={confirmarPassword} 
              onChange={(e) => setConfirmarPassword(e.target.value)}
              className={error ? 'input-error' : ''}
            />
            <button type="button" className="toggle-password" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <EyeSlashIcon /> : <EyeIcon />}
            </button>
          </div>
        </div>

        <button type="submit" className="submit-btn">Guardar Contraseña</button>
      </form>
    </div>
  );
}
export default ResetPassword;