// Navbar.jsx - Barra de navegación con categorías, buscador y contador del carrito
import { useState } from "react";

const CATEGORIAS = [
  { valor: "todas", texto: "Todos" },
  { valor: "consolas", texto: "Consolas" },
  { valor: "accesorios", texto: "Accesorios" },
];

export default function Navbar({ categoria, onCategoria, busqueda, onBusqueda, cantidadCarrito }) {
  // Estado local: menú desplegable en móvil (reemplaza al JS de Bootstrap)
  const [abierto, setAbierto] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <span className="navbar-brand fw-bold">🎮 Land Of Games</span>

        <button className="navbar-toggler" type="button" onClick={() => setAbierto(!abierto)}>
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`navbar-collapse collapse ${abierto ? "show" : ""}`}>
          <ul className="navbar-nav me-auto">
            {CATEGORIAS.map((c) => (
              <li className="nav-item" key={c.valor}>
                <button
                  className={`nav-link btn btn-link ${categoria === c.valor ? "active fw-bold" : ""}`}
                  onClick={() => onCategoria(c.valor)}
                >
                  {c.texto}
                </button>
              </li>
            ))}
          </ul>

          {/* Input controlado: su valor vive en el estado de App */}
          <input
            className="form-control me-3 w-auto"
            type="search"
            placeholder="Buscar producto..."
            value={busqueda}
            onChange={(e) => onBusqueda(e.target.value)}
          />

          {/* Contador de productos en el carrito */}
          <span className="badge bg-primary fs-6">🛒 {cantidadCarrito}</span>
        </div>
      </div>
    </nav>
  );
}
