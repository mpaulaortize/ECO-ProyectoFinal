const express = require("express");
const { getUsers, createUsers } = require("../controllers/user");
const {
  createOrder,
  getOrderById,
  updateOrderStatus,
} = require("../controllers/order");

const router = express.Router();

// Rutas para usuarios
router.get("/users", getUsers); // Obtener lista de usuarios
router.post("/users", createUsers); // Crear un nuevo usuario

// Rutas para órdenes (pedidos)
router.post("/orders", createOrder); // Crear un nuevo pedido
router.get("/orders/:id", getOrderById); // Obtener un pedido por ID
router.put("/orders/:id", updateOrderStatus); // Actualizar estado de un pedido

module.exports = router;
