# Land of Games - eCommerce en React (PFY2201 · S7 y S8)

eCommerce de consolas y accesorios hecho con **React + Vite + Bootstrap**.

## Funcionalidades
- Catálogo cargado dinámicamente desde `public/productos.json` (`useEffect` + `fetch`, con carga simulada de 800 ms).
- Cada producto muestra: nombre, precio normal, precio oferta, descripción e imagen.
- Carrito: agregar, sumar/restar unidades, eliminar, contador total y suma de precios (`useState`).
- Renderizado condicional: spinner de carga, error, sin resultados, carrito vacío y botón "Agregar al carrito" → "✔ En el carrito".
- Búsqueda por nombre y filtro por categoría.

## Estructura
```
src/
  App.jsx                 -> estados (useState) y carga de datos (useEffect)
  components/             -> Navbar, ProductList, ProductCard, Cart
  utils/formato.js        -> formato de precios CLP
public/productos.json     -> datos simulados
```

## Comandos
```bash
npm install
npm run dev        # desarrollo
npm run deploy     # build + publica en la rama gh-pages
```
