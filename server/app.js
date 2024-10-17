const express = require('express');
const routes = require('./routes'); // Importamos las rutas

const app = express(); // Crear la aplicación de Express

// Middleware
app.use(express.json()); // Permitir JSON en las solicitudes
app.use('/api', routes); // Prefijo para las rutas API

// Exportar la aplicación para que server.js la use
module.exports = app;
