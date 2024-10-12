const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const routes = require("./routes"); // Importamos las rutas

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.json()); // Middleware para parsear JSON
app.use("/api", routes); // Usar las rutas bajo el prefijo /api

io.on("connection", (socket) => {
  console.log(`Usuario conectado: ${socket.id}`);

  // Aquí van los eventos de socket.io
  // Ejemplo: evento1(socket, io);

  socket.on("disconnect", () => {
    console.log(`Usuario desconectado: ${socket.id}`);
  });
});

server.listen(3000, () => {
  console.log("Servidor corriendo en el puerto 3000");
});
