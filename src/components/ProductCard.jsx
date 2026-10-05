// ProductCard.jsx - Tarjeta de un producto (nombre, precios, descripción, imagen)
import { formatoCLP } from "../utils/formato.js";

export default function ProductCard({ producto, cantidadEnCarrito, onAgregar }) {
  const { nombre, precioNormal, precioOferta, descripcion, imagen } = producto;
  const descuento = Math.round((1 - precioOferta / precioNormal) * 100);
  const enCarrito = cantidadEnCarrito > 0;

  return (
    <div className="col-sm-6 col-lg-3 mb-4">
      <div className="card h-100 shadow-sm">
        <img src={`${import.meta.env.BASE_URL}${imagen}`} className="card-img-top" alt={nombre} />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{nombre}</h5>
          <p className="card-text small text-muted">{descripcion}</p>

          <div className="mb-3">
            <span className="text-decoration-line-through text-muted me-2">
              {formatoCLP(precioNormal)}
            </span>
            <span className="badge bg-danger">-{descuento}%</span>
            <div className="fs-5 fw-bold text-success">{formatoCLP(precioOferta)}</div>
          </div>

          {/* Renderizado condicional: el botón cambia de texto y color según el estado */}
          <button
            className={`btn mt-auto ${enCarrito ? "btn-success" : "btn-primary"}`}
            onClick={() => onAgregar(producto)}
          >
            {enCarrito ? `✔ En el carrito (${cantidadEnCarrito})` : "Agregar al carrito"}
          </button>
        </div>
      </div>
    </div>
  );
}
