const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const piezasController = require('../controllers/piezasController');

router.get('/', authMiddleware, piezasController.getPiezas);
router.post('/', authMiddleware, piezasController.createPieza);
router.put('/:idPieza', authMiddleware, piezasController.updatePieza);
router.delete('/:idPieza', authMiddleware, piezasController.deletePieza);

module.exports = router;