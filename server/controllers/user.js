const db = require("../db"); // Simulación de una base de datos
const { getIO } = require("../socket");

// Obtener todos los usuarios
const getUsers = async (req, res) => {
  try {
    res.status(200).json(db.users);
    /*
    getIO().emit("newUsers", db.users); // Si quieres emitir el evento de nuevos usuarios al conectarse
    */
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear un nuevo usuario
const createUsers = async (req, res) => {
  try {
    const { user } = req.body;
    if (!user || !user.name || !user.email) {
      return res
        .status(400)
        .json({ error: "Información del usuario incompleta." });
    }

    db.users.push({
      id: db.users.length + 1, // Generar un ID único
      name: user.name,
      email: user.email,
      preferences: user.preferences || [], // Opcionalmente se pueden guardar preferencias del usuario
    });

    res.status(201).json(db.users);
    getIO().emit("userCreated", db.users); // Emitir un evento cuando se crea un usuario
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar las preferencias del usuario
const updateUserPreferences = async (req, res) => {
  try {
    const { userId, preferences } = req.body;

    // Buscar el usuario en la base de datos
    const user = db.users.find((u) => u.id === parseInt(userId));

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    // Actualizar preferencias
    user.preferences = preferences;

    res.status(200).json(user);
    getIO().emit("preferencesUpdated", user); // Emitir evento al actualizar preferencias
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getUsers, createUsers, updateUserPreferences };
