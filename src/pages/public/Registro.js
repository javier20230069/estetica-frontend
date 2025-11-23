import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Registro.css'; // Asegúrate de que este archivo tenga los estilos (o importe Login.css)
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

// Importa el logo
import logo from '../../assets/logo_completo.png'; 

// --- (Iconos SVG para el "ojito") ---
const EyeIcon = () => (
  <svg viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
);
const EyeSlashIcon = () => (
  <svg viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07l-5.06-5.06M1 1l22 22"></path></svg>
);

// --- Componente Principal de Registro ---
function Registro() {
  const navigate = useNavigate();
  
  // --- Estados del Formulario ---
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [telefono, setTelefono] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');
  
  // Nuevos estados para la Pregunta Secreta
  const [preguntaSecreta, setPreguntaSecreta] = useState('');
  const [respuestaSecreta, setRespuestaSecreta] = useState('');
  
  // --- Estados de UX ---
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // --- Validaciones ---
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
    const passwordError = validatePassword(newPass);
    setErrors(prevErrors => ({ ...prevErrors, password: passwordError }));
  };

  // Función de validación general
  const validateForm = (checkTerms = false) => {
    const newErrors = {};

    if (!nombre.trim()) newErrors.nombre = "El nombre es obligatorio.";
    if (!apellidos.trim()) newErrors.apellidos = "Los apellidos son obligatorios.";
    
    if (!email) newErrors.email = "El correo es obligatorio.";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "El formato del correo no es válido.";
    
    if (!telefono) newErrors.telefono = "El teléfono es obligatorio.";
    else if (!isValidPhoneNumber(telefono)) newErrors.telefono = "El número de teléfono no es válido.";
    
    const passwordError = validatePassword(password);
    if (passwordError) newErrors.password = passwordError;
    
    if (!confirmarPassword) newErrors.confirmarPassword = "Debes confirmar la contraseña.";
    else if (password !== confirmarPassword) newErrors.confirmarPassword = "Las contraseñas no coinciden.";

    // Validaciones de la pregunta secreta
    if (!preguntaSecreta) newErrors.preguntaSecreta = "Selecciona una pregunta secreta.";
    if (!respuestaSecreta.trim()) newErrors.respuestaSecreta = "La respuesta secreta es obligatoria.";

    if (checkTerms && !agreedToTerms) {
      newErrors.terms = "Debes aceptar los términos y condiciones.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Habilitar/Deshabilitar botón
  useEffect(() => {
    const allFieldsFilled = 
      nombre.trim() !== '' &&
      apellidos.trim() !== '' &&
      email.trim() !== '' &&
      (telefono || '').trim() !== '' &&
      password.trim() !== '' &&
      confirmarPassword.trim() !== '' &&
      preguntaSecreta !== '' &&
      respuestaSecreta.trim() !== '';

    const passwordIsValid = validatePassword(password) === '';
    const passwordsMatch = password === confirmarPassword;

    if (allFieldsFilled && passwordIsValid && passwordsMatch && agreedToTerms) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [nombre, apellidos, telefono, email, password, confirmarPassword, preguntaSecreta, respuestaSecreta, agreedToTerms]);
  
  
  // --- Enviar Formulario ---
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    
    if (!validateForm(true)) {
      return; 
    }
    
    const datosParaEnviar = { 
      nombre, 
      apellidos, 
      telefono, 
      email, 
      password,
      preguntaSecreta,
      respuestaSecreta
    };

    try {
      const response = await fetch('https://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosParaEnviar)
      });
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.message || 'Error en el registro');
      
      alert(data.message);
      
      // --- CORRECCIÓN IMPORTANTE ---
      // Redirigir a Verificar Cuenta (NO al Login)
      navigate('/verificar-cuenta', { state: { email: datosParaEnviar.email } });

    } catch (error) {
      console.error('Error al registrar:', error);
      setErrors({ general: error.message });
    }
  };


  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        
        <div style={{textAlign: 'center', marginBottom: '25px'}}>
          <img src={logo} alt="Logo de la empresa" style={{maxWidth: '180px', height: 'auto'}} />
        </div>

        <h2>Crear Cuenta</h2>
        
        {errors.general && <small className="error-msg" style={{textAlign: 'center', marginBottom: '15px'}}>{errors.general}</small>}
        
        <div className="form-group">
          <label>Nombre:</label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className={errors.nombre ? 'input-error' : ''}/>
          {errors.nombre && <small className="error-msg">{errors.nombre}</small>}
        </div>
        
        <div className="form-group">
          <label>Apellidos:</label>
          <input type="text" value={apellidos} onChange={(e) => setApellidos(e.target.value)} className={errors.apellidos ? 'input-error' : ''}/>
          {errors.apellidos && <small className="error-msg">{errors.apellidos}</small>}
        </div>
        
        <div className="form-group">
          <label>Teléfono:</label>
          <PhoneInput
            placeholder="Ej: 55 1234 5678"
            value={telefono}
            onChange={setTelefono}
            defaultCountry="MX"
            international
            countryCallingCodeEditable={false}
            className={errors.telefono ? 'input-error' : ''}
          />
          {errors.telefono && <small className="error-msg">{errors.telefono}</small>}
        </div>
        
        <div className="form-group">
          <label>Correo Electrónico:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={errors.email ? 'input-error' : ''}/>
          {errors.email && <small className="error-msg">{errors.email}</small>}
        </div>

        {/* --- SECCIÓN DE PREGUNTA SECRETA --- */}
        <div className="form-group">
          <label>Pregunta Secreta (para recuperar contraseña):</label>
          <select 
            value={preguntaSecreta} 
            onChange={(e) => setPreguntaSecreta(e.target.value)}
            className={errors.preguntaSecreta ? 'input-error' : ''}
          >
            <option value="">Selecciona una pregunta...</option>
            <option value="nombre_mascota">¿Cuál es el nombre de tu primera mascota?</option>
            <option value="ciudad_padres">¿En qué ciudad se conocieron tus padres?</option>
            <option value="escuela_primaria">¿Cómo se llamaba tu escuela primaria?</option>
            <option value="comida_favorita">¿Cuál es tu comida favorita?</option>
          </select>
          {errors.preguntaSecreta && <small className="error-msg">{errors.preguntaSecreta}</small>}
        </div>

        <div className="form-group">
          <label>Respuesta Secreta:</label>
          <input 
            type="text" 
            value={respuestaSecreta} 
            onChange={(e) => setRespuestaSecreta(e.target.value)} 
            placeholder="Escribe tu respuesta"
            className={errors.respuestaSecreta ? 'input-error' : ''}
          />
          <small style={{color: '#888', fontSize: '0.8rem', display:'block', marginTop:'4px'}}>Esta respuesta es privada y segura.</small>
          {errors.respuestaSecreta && <small className="error-msg">{errors.respuestaSecreta}</small>}
        </div>
        {/* ----------------------------------- */}
        
        <div className="form-group">
          <label>Contraseña:</label>
          <div className="password-wrapper">
            <input type={showPassword ? "text" : "password"} value={password} onChange={handlePasswordChange} className={errors.password ? 'input-error' : ''}/>
            <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
            </button>
          </div>
          {errors.password && <small className="error-msg">{errors.password}</small>}
        </div>
        
        <div className="form-group">
          <label>Confirmar Contraseña:</label>
          <div className="password-wrapper">
            <input type={showConfirmPassword ? "text" : "password"} value={confirmarPassword} onChange={(e) => setConfirmarPassword(e.target.value)} className={errors.confirmarPassword ? 'input-error' : ''}/>
            <button type="button" className="toggle-password" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <EyeSlashIcon /> : <EyeIcon />}
            </button>
          </div>
          {errors.confirmarPassword && <small className="error-msg">{errors.confirmarPassword}</small>}
        </div>
        
        <div className="terms-group">
          <input type="checkbox" id="terms" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)}/>
          <label htmlFor="terms">
            Acepto los
            <a href="/terminos-y-condiciones" target="_blank" rel="noopener noreferrer" className="terms-link">
              Términos y Condiciones
            </a>
          </label>
        </div>
        {errors.terms && <small className="error-msg">{errors.terms}</small>}

        <button type="submit" className="submit-btn" disabled={isButtonDisabled}>
          Registrarse
        </button>
        
        <p style={{textAlign: 'center', marginTop: '20px'}}>
          ¿Ya tienes una cuenta? <Link to="/login" className="terms-link">Inicia sesión</Link>
        </p>

      </form>
    </div>
  );
}

export default Registro;