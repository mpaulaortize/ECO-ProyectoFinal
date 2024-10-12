const { createServer } = require("http");
const app = require("./app"); // Asegúrate de exportar tu app desde app.js
const { initSocket } = require("./socket"); // Asegúrate de tener la función initSocket en socket.js

// Crea el servidor HTTP a partir de la aplicación Express
const httpServer = createServer(app);

// Inicializa Socket.IO
initSocket(httpServer);

// Define el puerto en el que se ejecutará el servidor
const PORT = process.env.PORT || 5050; // Puedes usar una variable de entorno para el puerto

// Inicia el servidor
httpServer.listen(PORT, () => {
  console.log(`Servidor iniciando en http://localhost:${PORT}`);
});
