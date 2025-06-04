const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { verificarCSRF } = require('../middlewares/csrfMiddleware');
const proveedoresController = require('../controllers/proveedoresController');

router.get('/', authMiddleware, proveedoresController.getProveedores);
router.post('/', authMiddleware, verificarCSRF, proveedoresController.createProveedor);
router.put('/:idProveedor', authMiddleware, verificarCSRF, proveedoresController.updateProveedor);
router.delete('/:idProveedor', authMiddleware, verificarCSRF, proveedoresController.deleteProveedor);

module.exports = router;