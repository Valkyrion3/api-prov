const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const proveedoresController = require('../controllers/proveedoresController');

router.get('/', authMiddleware, proveedoresController.getProveedores);
router.post('/', authMiddleware, proveedoresController.createProveedor);
router.put('/:idProveedor', authMiddleware, proveedoresController.updateProveedor);
router.delete('/:idProveedor', authMiddleware, proveedoresController.deleteProveedor);

module.exports = router;