const db = require("../db");

// Crear un nuevo pedido
const createOrder = (req, res) => {
  try {
    const { order } = req.body;
    db.orders.push(order); // Guardar el pedido en la base de datos simulada
    res.status(201).json({ message: "Pedido creado exitosamente", order });
  } catch (err) {
    res.status(500).json({ error: "Error al crear el pedido" });
  }
};

// Obtener un pedido por ID
const getOrderById = (req, res) => {
  try {
    const { id } = req.params;
    const order = db.orders.find((order) => order.id === parseInt(id));
    if (!order) {
      return res.status(404).json({ error: "Pedido no encontrado" });
    }
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener el pedido" });
  }
};

// Actualizar estado del pedido
const updateOrderStatus = (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = db.orders.find((order) => order.id === parseInt(id));

    if (!order) {
      return res.status(404).json({ error: "Pedido no encontrado" });
    }

    order.status = status;
    res.status(200).json({ message: "Estado del pedido actualizado", order });
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar el pedido" });
  }
};

module.exports = { createOrder, getOrderById, updateOrderStatus };
