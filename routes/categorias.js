const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const categoriasController = require('../controllers/categoriasController');

router.get('/', authMiddleware, categoriasController.getCategorias);
router.post('/', authMiddleware, categoriasController.createCategoria);
router.put('/:id', authMiddleware, categoriasController.updateCategoria);
router.delete('/:id', authMiddleware, categoriasController.deleteCategoria);

module.exports = router;