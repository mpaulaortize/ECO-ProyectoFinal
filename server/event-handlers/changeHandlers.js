// Aquí es donde se manejan los socket.emit
const handleEvents = (socket, db, io) => {
	// 1. Manejo del evento 'sendTestData' cuando el cliente finaliza el test
	socket.on('sendTestData', (testData) => {
		try {
			console.log(`Datos del test recibidos del cliente ${socket.id}:`, testData);

			// Procesamos los datos del test y generamos una recomendación de bebida
			const recommendation = generateDrinkRecommendation(testData);

			// Emitimos la recomendación de bebida al cliente que envió los datos del test
			socket.emit('drinkRecommendation', recommendation);
			console.log(`Recomendación enviada al cliente ${socket.id}:`, recommendation);
		} catch (error) {
			console.error('Error al procesar los datos de prueba:', error);
			socket.emit('error', { message: 'Error al procesar los datos de prueba' });
		}
	});

	// 2. Manejo del evento 'sendData' cuando el cliente confirma el pedido
	socket.on('sendData', (orderData) => {
		try {
			console.log(`Datos del pedido recibidos del cliente ${socket.id}:`, orderData);

			// Guardamos los datos del pedido en la base de datos
			db.orders.push(orderData);

			// Emitimos una confirmación de que el pedido fue recibido correctamente
			socket.emit('orderConfirmation', { message: 'Pedido recibido con éxito', orderData });

			// Notificamos al barista que un nuevo pedido fue recibido
			io.emit('orderStatusUpdate', { status: 'Received', orderId: orderData.id });
			console.log(`Estado del pedido actualizado para el pedido ${orderData.id}: Received`);
		} catch (error) {
			console.error('Error al procesar los datos del pedido:', error);
			socket.emit('error', { message: 'Error al procesar el pedido' });
		}
	});

	// 3. Manejo del evento 'baristaLogin' cuando el barista inicia sesión
	socket.on('baristaLogin', ({ workerCode }) => {
		try {
			console.log(`Intento de inicio de sesión por el barista con el código: ${workerCode}`);

			// Buscar el código del barista en la base de datos
			const barista = db.baristas.find((barista) => barista.workerCode === workerCode);

			// Si no se encuentra el barista, enviamos un mensaje de error
			if (!barista) {
				socket.emit('loginResponse', { success: false, message: 'Código de trabajador inválido' });
				return;
			}

			// Si el barista es válido, enviamos un mensaje de éxito
			socket.emit('loginResponse', { success: true, message: 'Inicio de sesión exitoso' });
			console.log(`Barista con código ${workerCode} inició sesión con éxito`);
		} catch (error) {
			console.error('Error durante el inicio de sesión del barista:', error);
			socket.emit('error', { message: 'Error durante el inicio de sesión' });
		}
	});

	// 4.Evento cuando el barista cambia el estado de un pedido
	socket.on('updateOrderStatus', ({ orderId, status }) => {
		try {
			console.log(`Cambio de estado para el pedido ${orderId}: ${status}`);

			// Buscar el pedido en la base de datos
			const order = db.orders.find((order) => order.id === orderId);

			// Si no se encuentra el pedido, enviamos un mensaje de error
			if (!order) {
				socket.emit('error', { message: 'Pedido no encontrado' });
				return;
			}

			// Actualizamos el estado del pedido
			order.status = status;

			// Emitimos el cambio de estado al cliente correspondiente
			io.emit('orderStatusUpdate', { orderId, status });
			console.log(`Estado del pedido ${orderId} actualizado a: ${status}`);
		} catch (error) {
			console.error('Error al actualizar el estado del pedido:', error);
			socket.emit('error', { message: 'Error al actualizar el estado del pedido' });
		}
	});

	// 5. Evento cuando el barista finaliza un pedido
	socket.on('finalizeOrder', ({ orderId }) => {
		try {
			console.log(`Pedido ${orderId} finalizado por el barista`);

			// Buscar el pedido en la base de datos
			const order = db.orders.find((order) => order.id === orderId);

			// Si no se encuentra el pedido, enviamos un mensaje de error
			if (!order) {
				socket.emit('error', { message: 'Pedido no encontrado' });
				return;
			}

			// Actualizamos el estado del pedido a "Entregado"
			order.status = 'Delivered';

			// Notificamos al cliente que su pedido ha sido entregado
			io.emit('orderStatusUpdate', { orderId, status: 'Delivered' });
			console.log(`Pedido ${orderId} marcado como entregado`);
		} catch (error) {
			console.error('Error al finalizar el pedido:', error);
			socket.emit('error', { message: 'Error al finalizar el pedido' });
		}
	});
};

module.exports = { handleEvents };
