// ContactForm.jsx - Formulario de contacto con validación (nombre, email y mensaje)
import { useState } from "react";
import { EMAIL_REGEX } from "../utils/formato.js";

const INICIAL = { nombre: "", email: "", mensaje: "" };

export default function ContactForm() {
  const [campos, setCampos] = useState(INICIAL);
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  const cambiar = (e) => {
    setCampos({ ...campos, [e.target.name]: e.target.value });
    setEnviado(false);
  };

  const validar = () => {
    const e = {};
    if (!campos.nombre.trim()) e.nombre = "El nombre es obligatorio.";
    else if (campos.nombre.trim().length < 3) e.nombre = "El nombre debe tener al menos 3 caracteres.";

    if (!campos.email.trim()) e.email = "El email es obligatorio.";
    else if (!EMAIL_REGEX.test(campos.email.trim())) e.email = "Ingresa un email válido (ejemplo: nombre@correo.cl).";

    if (!campos.mensaje.trim()) e.mensaje = "El mensaje es obligatorio.";
    else if (campos.mensaje.trim().length < 10) e.mensaje = "El mensaje debe tener al menos 10 caracteres.";
    return e;
  };

  const enviar = (evento) => {
    evento.preventDefault();
    const e = validar();
    setErrores(e);
    if (Object.keys(e).length > 0) {
      setEnviado(false);
      return;
    }
    // Aquí iría el envío real al servidor; en esta actividad solo mostramos confirmación.
    setEnviado(true);
    setCampos(INICIAL);
  };

  return (
    <form className="card card-body shadow-sm" onSubmit={enviar} noValidate>
      {enviado && (
        <div className="alert alert-success" role="status">
          ¡Gracias! Recibimos tu mensaje y te responderemos pronto.
        </div>
      )}
      {Object.keys(errores).length > 0 && (
        <div className="alert alert-danger" role="alert">
          Revisa los campos marcados en rojo antes de enviar.
        </div>
      )}

      <div className="mb-3">
        <label htmlFor="contacto-nombre" className="form-label">Nombre</label>
        <input
          id="contacto-nombre"
          name="nombre"
          type="text"
          className={`form-control ${errores.nombre ? "is-invalid" : ""}`}
          value={campos.nombre}
          onChange={cambiar}
        />
        {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="contacto-email" className="form-label">Email</label>
        <input
          id="contacto-email"
          name="email"
          type="email"
          className={`form-control ${errores.email ? "is-invalid" : ""}`}
          value={campos.email}
          onChange={cambiar}
        />
        {errores.email && <div className="invalid-feedback">{errores.email}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="contacto-mensaje" className="form-label">Mensaje</label>
        <textarea
          id="contacto-mensaje"
          name="mensaje"
          rows="4"
          className={`form-control ${errores.mensaje ? "is-invalid" : ""}`}
          value={campos.mensaje}
          onChange={cambiar}
        />
        {errores.mensaje && <div className="invalid-feedback">{errores.mensaje}</div>}
      </div>

      <button type="submit" className="btn btn-primary align-self-start">Enviar mensaje</button>
    </form>
  );
}
