import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'; 

import RutaProtegida from './RutaProtegida';

// --- 1. Importar Plantillas (Layouts) ---
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import ClientLayout from './layouts/ClientLayout';

// --- 2. Importar Páginas ---
import HomePage from './pages/public/HomePage';
import Registro from './pages/public/Registro';
import Login from './pages/public/Login';
import VerificarCodigo from './pages/public/VerificarCodigo';
import Terminos from './pages/public/Terminos';
import OlvidePassword from './pages/public/OlvidePassword';
import VerificarReset from './pages/public/VerificarReset';
import ResetPassword from './pages/public/ResetPassword';
import VerificarCuenta from './pages/public/VerificarCuenta';


import Dashboard from './pages/admin/Dashboard';
import MisCitas from './pages/client/MisCitas';
import DashboardCliente from './pages/client/DashboardCliente';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ... (Tu ruta "/" con PublicLayout) ... */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<HomePage />} /> 
        </Route>

        {/* --- RUTAS DE AUTENTICACIÓN --- */}
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/verificar-codigo" element={<VerificarCodigo />} />
        <Route path="/terminos-y-condiciones" element={<Terminos />} /> {/* <-- ¡AÑADE ESTA LÍNEA! */}
        {/* --- ¡AÑADE ESTAS 3 RUTAS! --- */}
        <Route path="/olvide-password" element={<OlvidePassword />} />
        <Route path="/verificar-reset" element={<VerificarReset />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* ... (Tus rutas protegidas de /cliente y /admin) ... */}

        {/* --- RUTAS PÚBLICAS (Con Header/Footer) --- */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<HomePage />} /> 
          {/* Aquí puedes poner "Servicios", "Contacto", etc. */}
        </Route>

        {/* --- RUTAS DE AUTENTICACIÓN (Sin Header/Footer) --- */}
        {/* Las sacamos del PublicLayout */}
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/verificar-codigo" element={<VerificarCodigo />} />
        <Route path="/verificar-cuenta" element={<VerificarCuenta />} />

        {/* --- RUTAS DE CLIENTE PROTEGIDAS --- */}
        <Route element={<RutaProtegida roles={['cliente']} />}>
          <Route path="/cliente" element={<ClientLayout />}>
            {/* Esta será la página por defecto al entrar a /cliente */}
            <Route index element={<DashboardCliente />} /> 

            <Route path="dashboard" element={<DashboardCliente />} />
            <Route path="mis-citas" element={<MisCitas />} />
            {/* <Route path="agendar" element={<AgendarCita />} /> */}
          </Route>
        </Route>

        {/* --- RUTAS de ADMIN PROTEGIDAS --- */}
        <Route element={<RutaProtegida roles={['admin']} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;