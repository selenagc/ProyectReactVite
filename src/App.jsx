import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Tareas from './views/Tareas.jsx';
import CrearTarea from './views/CrearTarea.jsx';
import EditarTarea from './views/EditarTarea.jsx';
import DetalleTarea from './views/DetalleTarea.jsx';
import Categorias from './views/Categorias.jsx';
import DetalleCategoria from './views/DetalleCategoria.jsx';
import Etiquetas from './views/Etiquetas.jsx';
import DetalleEtiqueta from './views/DetalleEtiqueta.jsx';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column vh-100">
        <Header />

        <div className="flex-grow-1 p-3">
          <Routes>
            <Route path="/tareas" element={<Tareas />} />
            <Route path="/tarea/crear" element={<CrearTarea />} />
            <Route path="/tarea/editar/:id" element={<EditarTarea />} />
            <Route path="/tarea/:id" element={<DetalleTarea />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/categoria/:id" element={<DetalleCategoria />} />
            <Route path="/etiquetas" element={<Etiquetas />} />
            <Route path="/etiqueta/:id" element={<DetalleEtiqueta />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  )
}

export default App;
