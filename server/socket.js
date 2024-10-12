const { Server } = require("socket.io");
const { handleEvents } = require("./events"); // Asegúrate de que este archivo maneje la lógica de tus eventos

let io;

const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    path: "/real-time", // Establece la ruta para la conexión WebSocket
    cors: {
      origin: "*", // Permite solicitudes desde cualquier origen (ajusta según sea necesario)
    },
  });

  // Escucha la conexión de nuevos sockets
  io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado:", socket.id); // Puedes registrar la conexión
    handleEvents(socket, io); // Maneja los eventos para el socket
  });
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.io no inicializado!");
  }
  return io; // Devuelve la instancia de io si está inicializada
};

// Exporta las funciones para ser utilizadas en otros archivos
module.exports = { initSocket, getIO };
