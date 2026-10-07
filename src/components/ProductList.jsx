// ProductList.jsx - Decide qué mostrar: cargando, error, sin resultados o la lista
import ProductCard from "./ProductCard.jsx";

export default function ProductList({ productos, cargando, error, carrito, onAgregar, onEliminarProducto }) {
  // Renderizado condicional 1: mientras carga
  if (cargando) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2 text-muted">Cargando productos...</p>
      </div>
    );
  }

  // Renderizado condicional 2: error de carga
  if (error) return <div className="alert alert-danger">{error}</div>;

  // Renderizado condicional 3: búsqueda/filtro sin resultados
  if (productos.length === 0) {
    return <p className="text-center text-muted">No se encontraron productos.</p>;
  }

  return (
    <div className="row">
      {productos.map((producto) => {
        // ¿Este producto ya está en el carrito? (y cuántas unidades)
        const enCarrito = carrito.find((item) => item.id === producto.id);
        return (
          <ProductCard
            key={producto.id}
            producto={producto}
            cantidadEnCarrito={enCarrito ? enCarrito.cantidad : 0}
            onAgregar={onAgregar}
            onEliminarProducto={onEliminarProducto}
          />
        );
      })}
    </div>
  );
}
