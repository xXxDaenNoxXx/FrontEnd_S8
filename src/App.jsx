// App.jsx - Componente principal de Land of Games
// Aquí vive TODO el estado (useState) y la carga de datos (useEffect).
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import ProductList from "./components/ProductList.jsx";
import Cart from "./components/Cart.jsx";

export default function App() {
  // ---------- ESTADOS (useState) ----------
  const [productos, setProductos] = useState([]);      // catálogo completo
  const [cargando, setCargando] = useState(true);      // ¿se están cargando los datos?
  const [error, setError] = useState(null);            // mensaje de error (si falla la carga)
  const [carrito, setCarrito] = useState([]);          // [{...producto, cantidad}]
  const [busqueda, setBusqueda] = useState("");        // texto del buscador
  const [categoria, setCategoria] = useState("todas"); // filtro del navbar

  // ---------- EFECTO (useEffect) ----------
  // Se ejecuta una sola vez al montar el componente ([] al final).
  // Simula una carga externa: espera 800 ms y luego lee productos.json.
  useEffect(() => {
    const temporizador = setTimeout(() => {
      fetch(`${import.meta.env.BASE_URL}productos.json`)
        .then((respuesta) => {
          if (!respuesta.ok) throw new Error("No se pudo obtener productos.json");
          return respuesta.json();
        })
        .then((datos) => setProductos(datos)) // actualiza el estado con los datos
        .catch(() => setError("No pudimos cargar los productos. Inténtalo más tarde."))
        .finally(() => setCargando(false));
    }, 800);

    // Limpieza: si el componente se desmonta, cancelamos el temporizador
    return () => clearTimeout(temporizador);
  }, []);

  // ---------- FUNCIONES DEL CARRITO ----------
  // Agrega un producto; si ya estaba, aumenta su cantidad.
  const agregarAlCarrito = (producto) => {
    setCarrito((actual) =>
      actual.some((item) => item.id === producto.id)
        ? actual.map((item) =>
            item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
          )
        : [...actual, { ...producto, cantidad: 1 }]
    );
  };

  // Suma o resta unidades (delta = +1 / -1). Si llega a 0, se elimina.
  const cambiarCantidad = (id, delta) => {
    setCarrito((actual) =>
      actual
        .map((item) => (item.id === id ? { ...item, cantidad: item.cantidad + delta } : item))
        .filter((item) => item.cantidad > 0)
    );
  };

  // Elimina el producto completo del carrito
  const eliminarDelCarrito = (id) => {
    setCarrito((actual) => actual.filter((item) => item.id !== id));
  };

  // ---------- VALORES DERIVADOS (se calculan en cada render) ----------
  const totalProductos = carrito.reduce((suma, item) => suma + item.cantidad, 0);
  const totalPrecio = carrito.reduce((suma, item) => suma + item.precioOferta * item.cantidad, 0);

  // Filtra el catálogo por categoría y por texto de búsqueda
  const productosFiltrados = productos.filter(
    (p) =>
      (categoria === "todas" || p.categoria === categoria) &&
      p.nombre.toLowerCase().includes(busqueda.trim().toLowerCase())
  );

  return (
    <>
      <Navbar
        categoria={categoria}
        onCategoria={setCategoria}
        busqueda={busqueda}
        onBusqueda={setBusqueda}
        cantidadCarrito={totalProductos}
      />

      <main className="container my-5">
        <h1 className="text-center mb-4">Nuestros Productos</h1>
        <ProductList
          productos={productosFiltrados}
          cargando={cargando}
          error={error}
          carrito={carrito}
          onAgregar={agregarAlCarrito}
        />
      </main>

      <Cart
        items={carrito}
        totalProductos={totalProductos}
        totalPrecio={totalPrecio}
        onCambiarCantidad={cambiarCantidad}
        onEliminar={eliminarDelCarrito}
      />

      <footer className="bg-dark text-white text-center py-4">
        <p className="mb-1">Land of Games &copy; 2026</p>
        <p className="mb-0">Contacto: contacto@landofgames.cl</p>
      </footer>
    </>
  );
}
