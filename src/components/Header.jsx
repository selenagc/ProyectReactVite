import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-dark text-white">
      <div className="container-fluid d-flex align-items-center justify-content-between p-3">
        <h4 className="mb-0">TO DO LIST</h4>
        <nav>
          <ul className="nav">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/tareas">TAREAS</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/categorias">CATEGORIAS</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/etiquetas">ETIQUETAS</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
