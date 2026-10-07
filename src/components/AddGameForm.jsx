// AddGameForm.jsx - Formulario para agregar un videojuego al catálogo.
// Maneja su propio estado de campos/errores y le avisa a App mediante la prop onAgregarJuego.
import { useState } from "react";

const INICIAL = {
  nombre: "", categoria: "", precioNormal: "", precioOferta: "", descripcion: "", imagen: "",
};

export default function AddGameForm({ onAgregarJuego }) {
  const [campos, setCampos] = useState(INICIAL);
  const [errores, setErrores] = useState({});
  const [exito, setExito] = useState("");

  const cambiar = (e) => {
    setCampos({ ...campos, [e.target.name]: e.target.value });
    setExito("");
  };

  const validar = () => {
    const e = {};
    const normal = Number(campos.precioNormal);
    const oferta = Number(campos.precioOferta);
    if (campos.nombre.trim().length < 2) e.nombre = "Ingresa el nombre del juego (mínimo 2 caracteres).";
    if (!campos.categoria.trim()) e.categoria = "Ingresa una categoría (por ejemplo: accion).";
    if (!campos.precioNormal || normal <= 0) e.precioNormal = "Ingresa un precio normal mayor a 0.";
    if (!campos.precioOferta || oferta <= 0) e.precioOferta = "Ingresa un precio oferta mayor a 0.";
    else if (normal > 0 && oferta > normal) e.precioOferta = "El precio oferta no puede superar al precio normal.";
    if (campos.descripcion.trim().length < 10) e.descripcion = "La descripción debe tener al menos 10 caracteres.";
    if (campos.imagen.trim() && !/^https?:\/\//.test(campos.imagen.trim()))
      e.imagen = "Si ingresas una imagen, debe ser una URL que parta con http:// o https://.";
    return e;
  };

  const enviar = (evento) => {
    evento.preventDefault();
    const e = validar();
    setErrores(e);
    if (Object.keys(e).length > 0) return;

    onAgregarJuego({
      nombre: campos.nombre.trim(),
      categoria: campos.categoria.trim().toLowerCase(),
      precioNormal: Number(campos.precioNormal),
      precioOferta: Number(campos.precioOferta),
      descripcion: campos.descripcion.trim(),
      imagen: campos.imagen.trim() || "img/juego-generico.svg",
    });
    setCampos(INICIAL);
    setExito(`"${campos.nombre.trim()}" se agregó al catálogo.`);
  };

  // Helper para no repetir el markup de cada campo
  const campo = (name, label, type = "text", extra = {}) => (
    <div className={extra.col || "col-md-6"}>
      <label htmlFor={`juego-${name}`} className="form-label">{label}</label>
      <input
        id={`juego-${name}`}
        name={name}
        type={type}
        className={`form-control ${errores[name] ? "is-invalid" : ""}`}
        value={campos[name]}
        onChange={cambiar}
        placeholder={extra.placeholder}
      />
      {errores[name] && <div className="invalid-feedback">{errores[name]}</div>}
    </div>
  );

  return (
    <form className="row g-3 card card-body shadow-sm mx-0" onSubmit={enviar} noValidate>
      {campo("nombre", "Nombre del juego")}
      {campo("categoria", "Categoría", "text", { placeholder: "accion, aventura, deportes..." })}
      {campo("precioNormal", "Precio normal (CLP)", "number")}
      {campo("precioOferta", "Precio oferta (CLP)", "number")}

      <div className="col-12">
        <label htmlFor="juego-descripcion" className="form-label">Descripción</label>
        <textarea
          id="juego-descripcion"
          name="descripcion"
          rows="2"
          className={`form-control ${errores.descripcion ? "is-invalid" : ""}`}
          value={campos.descripcion}
          onChange={cambiar}
        />
        {errores.descripcion && <div className="invalid-feedback">{errores.descripcion}</div>}
      </div>

      {campo("imagen", "URL de la imagen (opcional)", "text", { col: "col-12", placeholder: "https://..." })}

      <div className="col-12 d-flex align-items-center gap-3">
        <button type="submit" className="btn btn-primary">Agregar al catálogo</button>
        {exito && <span className="text-success" role="status">{exito}</span>}
      </div>
    </form>
  );
}
