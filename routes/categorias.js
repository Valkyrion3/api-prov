const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const categoriasController = require('../controllers/categoriasController');

router.get('/', categoriasController.getCategorias);
router.post('/', authMiddleware, categoriasController.createCategoria);
router.put('/:idCategoria', authMiddleware, categoriasController.updateCategoria);

module.exports = router;