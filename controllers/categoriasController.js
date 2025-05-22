const { Categoria } = require('../models');

exports.getCategorias = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows } = await Categoria.findAndCountAll({
      offset,
      limit: parseInt(limit),
      order: [['nombre', 'ASC']]
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
      message: 'Categorías obtenidas correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener categorías',
      error: error.message
    });
  }
};

exports.getCategoriaById = async (req, res) => {
  try {
    const { idCategoria } = req.params;
    const categoria = await Categoria.findByPk(idCategoria);

    if (!categoria) {
      return res.status(404).json({
        success: false,
        message: 'Categoría no encontrada'
      });
    }

    res.json({
      success: true,
      data: categoria,
      message: 'Categoría obtenida correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener categoría',
      error: error.message
    });
  }
};

exports.createCategoria = async (req, res) => {
  try {
    const { nombre, estado } = req.body;

    // Validación básica
    if (!nombre) {
      return res.status(400).json({
        success: false,
        message: 'El nombre es requerido'
      });
    }

    const categoria = await Categoria.create({
      nombre: nombre.toUpperCase(),
      estado: estado || true
    });

    res.status(201).json({
      success: true,
      data: categoria,
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
    
    const idCategoria = req.params.id;
    const { nombre, estado } = req.body;
    console.log(idCategoria);
    const categoria = await Categoria.findByPk(idCategoria);
    console.log(categoria);
    if (!categoria) {
      return res.status(404).json({
        success: false,
        message: 'Categoría no encontrada'
      });
    }

    categoria.nombre = nombre ? nombre.toUpperCase() : categoria.nombre;
    categoria.estado = estado !== undefined ? estado : categoria.estado;

    await categoria.save();

    res.json({
      success: true,
      data: categoria,
      message: 'Categoría actualizada correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar categoría',
      error: error.message
    });
  }
};

exports.deleteCategoria = async (req, res) => {
  try {
    const idCategoria = req.params.id;

    const categoria = await Categoria.findByPk(idCategoria);
    if (!categoria) {
      return res.status(404).json({
        success: false,
        message: 'Categoría no encontrada'
      });
    }

    // Verificar si la categoría tiene piezas asociadas
    const piezasCount = await categoria.countPiezas();
    if (piezasCount > 0) {
      return res.status(400).json({
        success: false,
        message: 'No se puede eliminar la categoría porque tiene piezas asociadas'
      });
    }

    await categoria.destroy();

    res.json({
      success: true,
      message: 'Categoría eliminada correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar categoría',
      error: error.message
    });
  }
};