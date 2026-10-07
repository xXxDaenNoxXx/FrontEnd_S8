// Cart.jsx - Carrito de compras: lista, contador y total
import { formatoCLP } from "../utils/formato.js";

export default function Cart({ items, totalProductos, totalPrecio, onCambiarCantidad, onEliminar }) {
  return (
    <div>
      <h2>Carrito de compras</h2>

      {/* Renderizado condicional: mensaje si el carrito está vacío */}
      {items.length === 0 ? (
        <div className="alert alert-secondary">Aún no has agregado productos.</div>
      ) : (
        <ul className="list-group">
          {items.map((item) => (
            <li
              key={item.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>
                {item.nombre} <small className="text-muted">({formatoCLP(item.precioOferta)} c/u)</small>
              </span>
              <div className="d-flex align-items-center gap-2">
                <button className="btn btn-sm btn-outline-secondary" onClick={() => onCambiarCantidad(item.id, -1)}>−</button>
                <span>{item.cantidad}</span>
                <button className="btn btn-sm btn-outline-secondary" onClick={() => onCambiarCantidad(item.id, 1)}>+</button>
                <span className="mx-3 fw-semibold">{formatoCLP(item.precioOferta * item.cantidad)}</span>
                <button className="btn btn-sm btn-outline-danger" onClick={() => onEliminar(item.id)}>Eliminar</button>
              </div>
            </li>
          ))}

          <li className="list-group-item d-flex justify-content-between fw-bold bg-light total-carrito">
            <span>Total ({totalProductos} {totalProductos === 1 ? "producto" : "productos"})</span>
            <span>{formatoCLP(totalPrecio)}</span>
          </li>
        </ul>
      )}
    </div>
  );
}
