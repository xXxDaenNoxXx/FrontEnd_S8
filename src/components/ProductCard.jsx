// ProductCard.jsx - Tarjeta de un producto (imagen, nombre, precios, descripción)
import { formatoCLP, capitalizar } from "../utils/formato.js";

export default function ProductCard({ producto, cantidadEnCarrito, onAgregar, onEliminarProducto }) {
  const { nombre, categoria, precioNormal, precioOferta, descripcion, imagen } = producto;
  const descuento = Math.round((1 - precioOferta / precioNormal) * 100);
  const enCarrito = cantidadEnCarrito > 0;

  // Las imágenes del catálogo son rutas relativas; las que agrega el usuario pueden ser URLs completas
  const src = /^(https?:|data:)/.test(imagen) ? imagen : `${import.meta.env.BASE_URL}${imagen}`;

  return (
    <div className="col-sm-6 col-lg-3 mb-4">
      <article className="card h-100 shadow-sm">
        <img src={src} className="card-img-top" alt={nombre} />
        <div className="card-body d-flex flex-column">
          <span className="badge text-bg-secondary align-self-start mb-2">{capitalizar(categoria)}</span>
          <h3 className="card-title h5">{nombre}</h3>
          <p className="card-text small text-muted">{descripcion}</p>

          <div className="mb-3">
            {descuento > 0 && (
              <>
                <span className="text-decoration-line-through text-muted me-2">{formatoCLP(precioNormal)}</span>
                <span className="badge bg-danger">-{descuento}%</span>
              </>
            )}
            <div className="fs-5 fw-bold text-success">{formatoCLP(precioOferta)}</div>
          </div>

          {/* Renderizado condicional: el botón cambia de texto y color según el estado */}
          <button
            className={`btn mt-auto ${enCarrito ? "btn-success" : "btn-primary"}`}
            onClick={() => onAgregar(producto)}
          >
            {enCarrito ? `✔ En el carrito (${cantidadEnCarrito})` : "Agregar al carrito"}
          </button>
          <button
            className="btn btn-outline-danger btn-sm mt-2"
            onClick={() => onEliminarProducto(producto.id)}
          >
            Quitar del catálogo
          </button>
        </div>
      </article>
    </div>
  );
}
