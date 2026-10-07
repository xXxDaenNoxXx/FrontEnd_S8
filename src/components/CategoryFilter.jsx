// CategoryFilter.jsx - Botones para filtrar por categoría.
// Las categorías se calculan a partir de los productos, así que si agregas
// un juego con una categoría nueva, aparece automáticamente un botón.
import { capitalizar } from "../utils/formato.js";

export default function CategoryFilter({ categorias, seleccionada, onSeleccionar }) {
  const opciones = ["todas", ...categorias];

  return (
    <div className="d-flex flex-wrap justify-content-center gap-2 mb-4" role="group" aria-label="Filtrar por categoría">
      {opciones.map((c) => (
        <button
          key={c}
          type="button"
          className={`btn btn-sm ${seleccionada === c ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => onSeleccionar(c)}
        >
          {c === "todas" ? "Todos" : capitalizar(c)}
        </button>
      ))}
    </div>
  );
}
