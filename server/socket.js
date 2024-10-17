const { Server } = require('socket.io');
const userDisplay = require('./events/userDisplay');
const userPhone = require('./events/userPhone');

let io;

const initSocket = (httpServer) => {
	io = new Server(httpServer, {
		path: '/real-time',
		cors: {
			origin: '*',
		},
	});

	io.on('connection', (socket) => {
		console.log(`Nuevo cliente conectado: ${socket.id}`);

		// Inicializar eventos
		userDisplay(socket, io);
		userPhone(socket, io);

		socket.on('disconnect', () => {
			console.log(`Cliente desconectado: ${socket.id}`);
		});
	});
};

const getIO = () => {
	if (!io) {
		throw new Error('Socket.io no inicializado!');
	}
	return io;
};

module.exports = { initSocket, getIO };
