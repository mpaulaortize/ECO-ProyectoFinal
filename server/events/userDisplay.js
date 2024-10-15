//Aquí es donde se mueven los socket.on
const db = require('../db');
const { event1Handler } = require('../event-handlers/changeHandlers');

const manageBaristaEvents = (socket, io) => {
	// 1. Inicio sesión  código único
	const loginBarista = (workerCode) => {
		// Emitimos el evento 'baristaLogin' para validar el código de trabajador
		socket.emit('baristaLogin', { workerCode });
		console.log('Barista login attempt with code:', workerCode);
	};

	// 2. Escuchar la respuesta de validación del login desde el servidor
	socket.on('loginResponse', (response) => {
		if (response.success) {
			console.log('Incio sesión existoso:', response.message);
			// Permitir al barista acceder al dashboard
			accessDashboard();
		} else {
			console.error('Inicio de sesión invalido:', response.message);
			// mensaje si el login falla
			showLoginError(response.message);
		}
	});

	// 3. Escuchar la lista de pedidos actualizados desde el servidor
	socket.on('orderStatusUpdate', (orders) => {
		// Actualizamos el dashboard del barista
		updateDashboard(orders);
		console.log('Órdenes actualizadas recibidas del servidor:', orders);
	});

	// 4. Emitir el cambio de estado a "En proceso"
	const markInProcess = (orderId) => {
		socket.emit('updateOrderStatus', { orderId, status: 'En proceso' });
		console.log(`Order ${orderId} Marcado en proceso`);
	};

	// 5. Emitir el cambio de estado a "Listo"
	const markAsReady = (orderId) => {
		socket.emit('updateOrderStatus', { orderId, status: 'Listo' });
		console.log(`Order ${orderId} Marcado en listo`);
	};

	// 6. Finalizar el pedido y notificar al servidor
	const finalizeOrder = (orderId) => {
		socket.emit('finalizeOrder', { orderId });
		console.log(`Order ${orderId} Pedido finalizado`);
	};
	// todos que salen sin encender se llaman desde botones en el frontend, ejemplo los estados del pedido.
};

module.exports = { manageBaristaEvents };
