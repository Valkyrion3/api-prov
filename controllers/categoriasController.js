const { Categoria } = require('../models');

exports.getCategorias = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows } = await Categoria.findAndCountAll({
      offset,
      limit: parseInt(limit),
      order: [['idCategoria', 'ASC']]
    });

    res.json({
      success: true,
      data: rows,
      pagination: {
        total: count,
        pages: Math.ceil(count / limit),
        currentPage: parseInt(page),
        perPage: parseInt(limit)
      },
      message: 'Listado de categorías obtenido correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener categorías',
      error: error.message
    });
  }
};

exports.createCategoria = async (req, res) => {
  try {
    const { nombre, estado } = req.body;
    const categoria = await Categoria.create({
      nombre: nombre.toUpperCase(),
      estado
    });

    res.status(201).json({
      data: categoria,
      success: true,
      message: 'Categoría creada correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear categoría',
      error: error.message
    });
  }
};

exports.updateCategoria = async (req, res) => {
  try {
    const { idCategoria } = req.params;
    const { nombre, estado } = req.body;
    
    const categoria = await Categoria.findByPk(idCategoria);
    if (!categoria) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }

    categoria.nombre = nombre.toUpperCase();
    categoria.estado = estado;
    await categoria.save();

    res.json({
      success: true,
      message: 'Categoría actualizada correctamente',
      data: categoria
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar categoría',
      error: error.message
    });
  }
};