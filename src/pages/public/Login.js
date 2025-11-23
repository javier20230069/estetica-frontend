import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Login.css';
import logo from '../../assets/logo_completo.png'; // Asumo que tu logo está aquí

// --- ¡NUEVO! ---
import { GoogleLogin } from '@react-oauth/google';

// --- (Iconos SVG...) ---
const EyeIcon = () => ( <svg viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg> );
const EyeSlashIcon = () => ( <svg viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07l-5.06-5.06M1 1l22 22"></path></svg> );
// --- (Fin Iconos) ---

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('cliente');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState('');

  // --- (handleSubmit para login normal se queda igual) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 
    try {
      const response = await fetch('https://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, rol }) 
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Error al iniciar sesión');
      login(data.user, data.token);
      alert(data.message);
      if (data.user.tipo_usuario === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/cliente/mis-citas');
      }
    } catch (error) {
      console.error('Error de login:', error);
      setError(error.message);
    }
  };

  // --- ¡NUEVA FUNCIÓN! ---
  const handleGoogleSuccess = async (credentialResponse) => {
    setError('');
    const { credential } = credentialResponse;

    try {
      // Enviamos el token de Google a NUESTRO backend
      const response = await fetch('https://localhost:5000/api/auth/google-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      // Usamos nuestro 'AuthContext' para loguear al usuario
      login(data.user, data.token);

      alert(data.message);

      // Redirigir al dashboard
      if (data.user.tipo_usuario === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/cliente/mis-citas');
      }

    } catch (err) {
      setError(err.message || 'Error al iniciar sesión con Google');
    }
  };

  const handleGoogleError = () => {
    setError('Error en el login con Google. Inténtalo de nuevo.');
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <div style={{textAlign: 'center', marginBottom: '25px'}}>
          <img src={logo} alt="Logo de la empresa" style={{maxWidth: '180px', height: 'auto'}} />
        </div>

        <h2>Iniciar Sesión</h2>

        {error && <small className="error-msg" style={{textAlign: 'center', marginBottom: '15px'}}>{error}</small>}

        {/* --- ¡NUEVO! Botón de Google --- */}
        <div className="form-group" style={{display: 'flex', justifyContent: 'center'}}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            useOneTap // Intenta loguear automáticamente
          />
        </div>

        <p style={{textAlign: 'center', fontWeight: '600', color: '#888', margin: '20px 0'}}>O</p>

        {/* --- (Formulario normal) --- */}
        <div className="form-group">
          <label>Tipo de Sesión:</label>
          <select value={rol} onChange={(e) => setRol(e.target.value)}>
            <option value="cliente">Cliente</option>
            <option value="admin">Administrador</option>
          </select>
        </div>

        <div className="form-group">
          <label>Correo Electrónico:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Contraseña:</label>
          <div className="password-wrapper">
            <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
            </button>
          </div>
        </div>

        <button type="submit" className="submit-btn">Entrar</button>

        <div style={{textAlign: 'right', marginTop: '10px'}}>
          <Link to="/olvide-password" className="terms-link" style={{fontSize: '0.9rem'}}>
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        <p style={{textAlign: 'center', marginTop: '20px'}}>
          ¿No tienes una cuenta? <Link to="/registro" className="terms-link">Regístrate aquí</Link>
        </p>

      </form>
    </div>
  );
}

export default Login;