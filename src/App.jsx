import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Tareas from './views/Tareas.jsx';
import CrearTarea from './views/CrearTarea.jsx';
import EditarTarea from './views/EditarTarea.jsx';
import DetalleTarea from './views/DetalleTarea.jsx';
import Categorias from './views/Categorias.jsx';
import DetalleCategoria from './views/DetalleCategoria.jsx';
import Etiquetas from './views/Etiquetas.jsx';
import DetalleEtiqueta from './views/DetalleEtiqueta.jsx';
import Login from './views/Login.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import PublicRoute from './components/PublicRoute.jsx';

function App() {
  localStorage.clear();
  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />
        <Route 
          path="/*" 
          element={
            <PrivateRoute>
              <Layout>
                <Routes>
                  
                  <Route path="/tareas" element={<Tareas />} />
                  <Route path="/tarea/crear" element={<CrearTarea />} />
                  <Route path="/tarea/editar/:id" element={<EditarTarea />} />
                  <Route path="/tarea/:id" element={<DetalleTarea />} />
                  <Route path="/categorias" element={<Categorias />} />
                  <Route path="/categoria/:id" element={<DetalleCategoria />} />
                  <Route path="/etiquetas" element={<Etiquetas />} />
                  <Route path="/etiqueta/:id" element={<DetalleEtiqueta />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Layout>
            </PrivateRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </Router>
  );
}

export default App;