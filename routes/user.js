const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
//Obtener perfil del usuario autenticado
router.get('/', authMiddleware, userController.getProfile);

// Obtener todos los usuarios
router.get('/usuarios', authMiddleware, userController.getUsers);

// Obtener un usuario por ID
router.get('/:id', authMiddleware, userController.getUserById);

// Actualizar usuario
router.put('/:id', authMiddleware, userController.updateUser);
module.exports = router;