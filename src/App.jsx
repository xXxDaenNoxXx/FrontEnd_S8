// App.jsx - Componente principal de Land of Games
// Aquí vive el estado (useState) y la carga de datos (useEffect).
// Los componentes hijos reciben datos y funciones mediante props.
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import CategoryFilter from "./components/CategoryFilter.jsx";
import ProductList from "./components/ProductList.jsx";
import AddGameForm from "./components/AddGameForm.jsx";
import Cart from "./components/Cart.jsx";
import ContactForm from "./components/ContactForm.jsx";

export default function App() {
  // ---------- ESTADOS (useState) ----------
  const [productos, setProductos] = useState([]);      // catálogo completo
  const [cargando, setCargando] = useState(true);      // ¿se están cargando los datos?
  const [error, setError] = useState(null);            // mensaje de error (si falla la carga)
  const [carrito, setCarrito] = useState([]);          // [{...producto, cantidad}]
  const [busqueda, setBusqueda] = useState("");        // texto del buscador
  const [categoria, setCategoria] = useState("todas"); // filtro por categoría

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

  // ---------- FUNCIONES DEL CATÁLOGO (agregar / eliminar juegos) ----------
  // Agrega un juego nuevo al estado. El id nuevo es el mayor existente + 1.
  const agregarJuego = (juego) => {
    setProductos((actual) => {
      const nuevoId = actual.reduce((max, p) => Math.max(max, p.id), 0) + 1;
      return [...actual, { ...juego, id: nuevoId }];
    });
  };

  // Elimina un producto del catálogo (y también del carrito si estaba ahí).
  const eliminarProducto = (id) => {
    setProductos((actual) => actual.filter((p) => p.id !== id));
    setCarrito((actual) => actual.filter((item) => item.id !== id));
    // Si la categoría seleccionada se queda sin productos, volvemos a "todas"
    const quedanEnCategoria = productos.some((p) => p.id !== id && p.categoria === categoria);
    if (categoria !== "todas" && !quedanEnCategoria) setCategoria("todas");
  };

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

  // Categorías disponibles, calculadas desde el catálogo actual (sin repetir)
  const categorias = [...new Set(productos.map((p) => p.categoria))];

  // Filtra el catálogo por categoría y por texto de búsqueda
  const productosFiltrados = productos.filter(
    (p) =>
      (categoria === "todas" || p.categoria === categoria) &&
      p.nombre.toLowerCase().includes(busqueda.trim().toLowerCase())
  );

  return (
    <>
      <Navbar busqueda={busqueda} onBusqueda={setBusqueda} cantidadCarrito={totalProductos} />

      <header className="bg-dark text-white text-center py-5">
        <div className="container">
          <h1 className="display-5 fw-bold">Land Of Games</h1>
          <p className="lead mb-0">Consolas, accesorios y videojuegos al mejor precio.</p>
        </div>
      </header>

      <main className="container my-5">
        <section id="inicio" className="mb-5">
          <h2 className="text-center mb-4">Nuestros productos</h2>
          <CategoryFilter categorias={categorias} seleccionada={categoria} onSeleccionar={setCategoria} />
          <ProductList
            productos={productosFiltrados}
            cargando={cargando}
            error={error}
            carrito={carrito}
            onAgregar={agregarAlCarrito}
            onEliminarProducto={eliminarProducto}
          />
        </section>

        <section id="agregar" className="mb-5">
          <h2 className="mb-3">Agregar un videojuego</h2>
          <AddGameForm onAgregarJuego={agregarJuego} />
        </section>

        <section id="carrito" className="mb-5">
          <Cart
            items={carrito}
            totalProductos={totalProductos}
            totalPrecio={totalPrecio}
            onCambiarCantidad={cambiarCantidad}
            onEliminar={eliminarDelCarrito}
          />
        </section>

        <section id="contacto" className="mb-2">
          <h2 className="mb-3">Contacto</h2>
          <div className="row">
            <div className="col-lg-8">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-dark text-white text-center py-4">
        <p className="mb-1">Land of Games &copy; 2026</p>
        <p className="mb-0">Contacto: contacto@landofgames.cl</p>
      </footer>
    </>
  );
}
