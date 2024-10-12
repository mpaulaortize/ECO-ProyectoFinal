//Aquí es donde se mueven los socket.emit
const event1Handler = (socket, db, io) => (data) => {
  try {
    // Aquí realizamos la lógica del evento 'event1'
    console.log(`Evento 1 disparado por: ${socket.id} con datos:`, data);

    // Por ejemplo, buscamos el usuario en la base de datos
    const user = db.users.find((user) => user.id === data.userId);
    if (!user) {
      socket.emit("error", { message: "Usuario no encontrado" });
      return;
    }

    // Aquí podríamos hacer alguna acción, como actualizar preferencias
    user.preferences = data.newPreferences;

    // Emitimos un evento de éxito
    socket.emit("event1Success", {
      message: "Preferencias actualizadas correctamente",
      user,
    });

    // Si es necesario, notificamos a otros usuarios conectados
    io.emit("updateUsers", db.users);
  } catch (error) {
    console.error("Error en event1Handler:", error);
    socket.emit("error", { message: "Error al procesar el evento" });
  }
};

module.exports = { event1Handler };
