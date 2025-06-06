const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models/index.js');
require('dotenv').config();

// Función para registrar nuevos usuarios
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verificar si el usuario ya existe meidante el correo electrónico
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'El correo electrónico ya está registrado'
      });
    }

    // Crear nuevo usuario
    const user = await User.create({
      name,
      email,
      password
    });

    // Generar token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );

    // Omitimos campos sensibles en la respuesta
    const userResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at
    };

    res.status(201).json({
      success: true,
      message: 'Usuario registrado exitosamente',
      user: userResponse,
      token
    });

  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({
      success: false,
      message: 'Error al registrar usuario',
      error: error.message
    });
  }
};

// Función para ingresar al sistema
exports.login = async (req, res) => {
  try {
    // Obtenemos las credenciales
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    // Verificamos si el usuario existe
    if (!user) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }
    // Verificamos la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    
    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      },
      token,
      message: 'Login exitoso'
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};