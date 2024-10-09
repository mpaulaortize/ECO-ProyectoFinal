// server/index.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const port = 3000;

const server = http.createServer(app);
const io = new Server(server);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Simulación de base de datos para los pedidos
let orders = [];

// Ruta para recibir un pedido (POST)
app.post("/create-order", (req, res) => {
  const { name, product, size, extra } = req.body;

  const newOrder = {
    id: orders.length + 1,
    name,
    product,
    size,
    extra,
    status: "received", // Estado inicial
  };

  orders.push(newOrder);

  // Notificamos a todos los clientes que hay un nuevo pedido
  io.emit("newOrder", newOrder);

  res
    .status(201)
    .json({ message: "Order created successfully!", order: newOrder });
});

// Ruta para obtener todas las órdenes (GET)
app.get("/orders", (req, res) => {
  res.json(orders);
});

// Ruta para actualizar el estado de una orden (PUT)
app.put("/update-order/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const order = orders.find((order) => order.id === parseInt(id));
  if (order) {
    order.status = status;

    // Notificamos a los clientes el cambio de estado
    io.emit("orderStatusUpdated", order);

    res.json({ message: "Order updated!", order });
  } else {
    res.status(404).json({ message: "Order not found!" });
  }
});

// Iniciar el servidor
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
