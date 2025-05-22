const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const suministrosController = require('../controllers/suministrosController');

router.get('/', authMiddleware, suministrosController.getSuministros);

module.exports = router;