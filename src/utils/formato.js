// Convierte un número a formato de pesos chilenos: 549990 -> "$549.990"
export const formatoCLP = (numero) => "$" + numero.toLocaleString("es-CL");

// "accion" -> "Accion" (para mostrar categorías en botones y selects)
export const capitalizar = (texto) => texto.charAt(0).toUpperCase() + texto.slice(1);

// Expresión regular simple para validar emails
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
