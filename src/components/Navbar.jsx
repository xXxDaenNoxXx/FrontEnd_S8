// Navbar.jsx - Barra de navegación: enlaces a secciones, buscador y contador del carrito
import { useState } from "react";

const ENLACES = [
  { href: "#inicio", texto: "Inicio" },
  { href: "#agregar", texto: "Agregar juego" },
  { href: "#contacto", texto: "Contacto" },
];

export default function Navbar({ busqueda, onBusqueda, cantidadCarrito }) {
  // Estado local: menú desplegable en móvil (reemplaza al JS de Bootstrap)
  const [abierto, setAbierto] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
        <a className="navbar-brand fw-bold" href="#inicio">🎮 Land Of Games</a>

        <button
          className="navbar-toggler"
          type="button"
          aria-label="Abrir menú"
          aria-expanded={abierto}
          onClick={() => setAbierto(!abierto)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`navbar-collapse collapse ${abierto ? "show" : ""}`}>
          <ul className="navbar-nav me-auto">
            {ENLACES.map((e) => (
              <li className="nav-item" key={e.href}>
                <a className="nav-link" href={e.href} onClick={() => setAbierto(false)}>
                  {e.texto}
                </a>
              </li>
            ))}
          </ul>

          {/* Input controlado: su valor vive en el estado de App */}
          <input
            className="form-control me-3 w-auto my-2 my-lg-0"
            type="search"
            placeholder="Buscar producto..."
            aria-label="Buscar producto"
            value={busqueda}
            onChange={(e) => onBusqueda(e.target.value)}
          />

          {/* Contador de productos en el carrito */}
          <a href="#carrito" className="badge bg-primary fs-6 text-decoration-none">
            🛒 {cantidadCarrito}
          </a>
        </div>
      </div>
    </nav>
  );
}
