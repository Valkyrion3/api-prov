const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const piezasController = require('../controllers/piezasController');

router.get('/', authMiddleware, piezasController.getPiezas);

module.exports = router;