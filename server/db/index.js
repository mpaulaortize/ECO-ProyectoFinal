// Base de datos simulada para "Entre Amigos"

// Almacenamiento temporal de usuarios
const users = [
  // Ejemplo de usuario
  {
    id: 1,
    name: "Juan Pérez",
    email: "juan.perez@example.com",
    preferences: ["Frappuccino", "Café con leche"],
  },
];

// Almacenamiento temporal de órdenes
const orders = [
  // Ejemplo de orden
  {
    id: 1,
    userId: 1, // ID del usuario que hizo el pedido
    drinkRecommendation: "Latte con leche de almendra", // Recomendación del sistema
    status: "Pendiente", // Pendiente, En preparación, Listo
    uniqueCode: "A1B2C3", // Código único del pedido
  },
];

module.exports = {
  users, // Exportamos el arreglo de usuarios
  orders, // Exportamos el arreglo de órdenes
};
