const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const proveedoresController = require('../controllers/proveedoresController');

router.get('/', authMiddleware, proveedoresController.getProveedores);

module.exports = router;