# Land of Games – Tienda de videojuegos (EFT · PFY2201 Desarrollo Frontend I)

Sitio web de una tienda online de videojuegos, consolas y accesorios, hecho con **HTML5, CSS3, JavaScript, Bootstrap 5 y React (Vite)**.

**Autor:** Daniel Erices N.
**Repositorio:** https://github.com/xXxDaenNoxXx/FrontEnd_S8

## Funcionalidades
- **Inicio:** catálogo en tarjetas (imagen, nombre, categoría, precio normal/oferta y descripción), cargado desde `public/productos.json` con `useEffect` + `fetch`.
- **Filtros:** por categoría (botones generados automáticamente según el catálogo) y búsqueda por nombre.
- **Agregar / eliminar videojuegos:** formulario validado para sumar juegos al catálogo y botón "Quitar del catálogo" en cada tarjeta (estado manejado con `useState`).
- **Carrito:** agregar, sumar/restar unidades, eliminar, contador y total.
- **Contacto:** formulario con nombre, email y mensaje, con validación y mensajes de error antes de enviar.
- **Navegación:** barra con enlaces a *Inicio*, *Agregar juego*, *Contacto* y acceso al carrito.
- **Responsivo:** Bootstrap 5 (grid, navbar colapsable, utilidades flex).

## Tecnologías
React 18 · Vite 5 · Bootstrap 5.3 · HTML semántico (`header`, `nav`, `main`, `section`, `article`, `footer`).

## Estructura
```
src/
  App.jsx                    -> estado global, carga de datos y composición
  components/
    Navbar.jsx               -> barra de navegación y buscador
    CategoryFilter.jsx       -> botones de categorías
    ProductList.jsx          -> lista (cargando / error / vacío / tarjetas)
    ProductCard.jsx          -> tarjeta de producto
    AddGameForm.jsx          -> formulario para agregar juegos
    Cart.jsx                 -> carrito de compras
    ContactForm.jsx          -> formulario de contacto validado
  utils/formato.js           -> formato CLP, capitalizar, regex de email
public/
  productos.json             -> datos de los productos
  img/                       -> imágenes
```

## Instalación y uso
Requisitos: [Node.js](https://nodejs.org) 18 o superior.

```bash
git clone https://github.com/xXxDaenNoxXx/FrontEnd_S8.git
cd FrontEnd_S8        # o land-of-games si descomprimiste el .zip
npm install
npm run dev           # abre la URL que muestra la terminal (normalmente http://localhost:5173/FrontEnd_S8/)
```

Otros comandos:
```bash
npm run build         # genera la carpeta dist/
npm run preview       # sirve la versión de producción
npm run deploy        # publica dist/ en la rama gh-pages
```

## Cómo probar
1. Filtra por categoría y busca un producto por nombre.
2. Agrega productos al carrito y cambia sus cantidades.
3. En "Agregar un videojuego", envía el formulario vacío para ver los errores y luego complétalo para sumar un juego.
4. Usa "Quitar del catálogo" en una tarjeta para eliminarla.
5. En "Contacto", envía el formulario vacío y con un email inválido para ver la validación.
6. Reduce el ancho de la ventana para ver el diseño responsivo y el menú colapsable.
