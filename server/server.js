const { createServer } = require('http');
const app = require('./server/app'); // Ruta ajustada
const { initSocket } = require('./server/socket'); // Ruta ajustada

// Crear el servidor HTTP
const httpServer = createServer(app);

// Inicializar Socket.IO
initSocket(httpServer);

// Definir el puerto
const PORT = process.env.PORT || 5050;

// Iniciar el servidor
httpServer.listen(PORT, () => {
	console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
