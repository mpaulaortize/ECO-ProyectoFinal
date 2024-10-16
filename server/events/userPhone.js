// Aquí es donde se manejan los socket.on
const db = require('../db');
const { event1Handler } = require('../event-handlers/changeHandlers');

const manageClientEvents = (socket, io) => {
	// 1. Emitimos los datos del test cuando el cliente lo finaliza
	const sendTestData = (testData) => {
		// Emitimos el evento 'sendTestData' con las respuestas del test
		socket.emit('sendTestData', testData);
		console.log('Datos del test enviados al servidor:', testData);
	};

	// 2. Escuchamos la recomendación de la bebida desde el servidor
	socket.on('drinkRecommendation', (recomendation) => {
		showRecommendation(recomendation);
		console.log('Recomendación recibida del servidor:', recomendation);
	});

	// 3. Emitimos los datos completos del pedido cuando el cliente confirma el pedido
	const confirmOrder = (orderData) => {
		// Emitimos el evento 'sendData' con los datos completos del pedido
		socket.emit('sendData', orderData);
		console.log('Datos del pedido enviados al servidor:', orderData);
	};

	// 4. Escuchamos actualizaciones del estado del pedido desde el servidor
	socket.on('orderStatusUpdate', (status) => {
		updateOrderStatus(status);
		console.log('Order status updated from server:', status);
	});
	sendTestData(testData);
	confirmOrder(orderData);
};

module.exports = { manageClientEvents };
