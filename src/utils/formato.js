// Convierte un número a formato de pesos chilenos: 549990 -> "$549.990"
export const formatoCLP = (numero) => "$" + numero.toLocaleString("es-CL");
