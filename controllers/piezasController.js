const { Pieza } = require('../models');

exports.getPiezas = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const limit = 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await Pieza.findAndCountAll({
      limit,
      offset,
      include: ['categoria'] // Si tienes esta relación
    });

    res.json({
      success: true,
      data: rows,
      pagination: {
        total: count,
        pages: Math.ceil(count / limit),
        currentPage: parseInt(page),
        perPage: limit
      },
      message: 'Piezas obtenidas correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener piezas',
      error: error.message
    });
  }
};