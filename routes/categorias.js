const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { verificarCSRF } = require('../middlewares/csrfMiddleware');
const categoriasController = require('../controllers/categoriasController');

router.get('/', authMiddleware, categoriasController.getCategorias);
router.post('/', authMiddleware, verificarCSRF, categoriasController.createCategoria);
router.put('/:id', authMiddleware, verificarCSRF, categoriasController.updateCategoria);
router.delete('/:id', authMiddleware, verificarCSRF, categoriasController.deleteCategoria);

module.exports = router;