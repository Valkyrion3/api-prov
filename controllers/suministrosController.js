const { Suministro } = require('../models');

exports.getSuministros = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const limit = 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await Suministro.findAndCountAll({
      limit,
      offset,
      include: ['proveedor'] // Si tienes esta relación
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
      message: 'Suministros obtenidos correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener suministros',
      error: error.message
    });
  }
};