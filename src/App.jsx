import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Tareas from './views/Tareas.jsx';
import Categorias from './views/Categorias.jsx';
import Etiquetas from './views/Etiquetas.jsx';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column vh-100">
        <Header />

        <div className="flex-grow-1 p-3">
          <Routes>
            <Route path="/tareas" element={<Tareas />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/etiquetas" element={<Etiquetas />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  )
}

export default App;
