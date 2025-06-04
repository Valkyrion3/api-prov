const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { verificarCSRF } = require('../middlewares/csrfMiddleware');
const piezasController = require('../controllers/piezasController');

router.get('/', authMiddleware, piezasController.getPiezas);
router.post('/', authMiddleware, verificarCSRF, piezasController.createPieza);
router.put('/:idPieza', authMiddleware, verificarCSRF, piezasController.updatePieza);
router.delete('/:idPieza', authMiddleware, verificarCSRF, piezasController.deletePieza);

module.exports = router;