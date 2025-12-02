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
// Nota: Ya NO importamos VerificarCodigo
import VerificarCuenta from './pages/public/VerificarCuenta'; 
import Terminos from './pages/public/Terminos';
import OlvidePassword from './pages/public/OlvidePassword';
import VerificarReset from './pages/public/VerificarReset';
import ResetPassword from './pages/public/ResetPassword';

import Dashboard from './pages/admin/Dashboard';
import MisCitas from './pages/client/MisCitas';
import DashboardCliente from './pages/client/DashboardCliente';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* --- RUTAS PÚBLICAS (Con Header) --- */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<HomePage />} /> 
        </Route>

        {/* --- RUTAS DE AUTENTICACIÓN (Sin Header) --- */}
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        
        {/* Esta es la nueva ruta correcta */}
        <Route path="/verificar-cuenta" element={<VerificarCuenta />} />
        
        <Route path="/terminos-y-condiciones" element={<Terminos />} />
        <Route path="/olvide-password" element={<OlvidePassword />} />
        <Route path="/verificar-reset" element={<VerificarReset />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* --- RUTAS DE CLIENTE --- */}
        <Route element={<RutaProtegida roles={['cliente']} />}>
          <Route path="/cliente" element={<ClientLayout />}>
            <Route index element={<DashboardCliente />} />
            <Route path="dashboard" element={<DashboardCliente />} />
            <Route path="mis-citas" element={<MisCitas />} />
          </Route>
        </Route>

        {/* --- RUTAS DE ADMIN --- */}
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