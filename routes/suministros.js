const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { verificarCSRF } = require('../middlewares/csrfMiddleware');
const suministrosController = require('../controllers/suministrosController');

router.get('/', authMiddleware, suministrosController.getSuministros);
router.post('/', authMiddleware, verificarCSRF, suministrosController.createSuministro);
router.put('/:idSuministro', authMiddleware, verificarCSRF, suministrosController.updateSuministro);
router.delete('/:idSuministro', authMiddleware, verificarCSRF, suministrosController.deleteSuministro);

module.exports = router;