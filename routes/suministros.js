const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const suministrosController = require('../controllers/suministrosController');

router.get('/', authMiddleware, suministrosController.getSuministros);
router.post('/', authMiddleware, suministrosController.createSuministro);
router.put('/:idSuministro', authMiddleware, suministrosController.updateSuministro);
router.delete('/:idSuministro', authMiddleware, suministrosController.deleteSuministro);

module.exports = router;