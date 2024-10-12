//Aquí es donde se mueven los socket.on
const db = require("../db");
const { event1Handler } = require("../event-handlers/changeHandlers");

const evento1 = (socket, io) => {
  // Al escuchar el evento 'event1', ejecutamos el handler correspondiente
  socket.on("event1", event1Handler(socket, db, io));
};

module.exports = { evento1 };
