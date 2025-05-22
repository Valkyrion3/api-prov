const { Pieza, Categoria } = require('../models');

exports.getPiezas = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const limit = 6;
    const offset = (page - 1) * limit;

    const { count, rows } = await Pieza.findAndCountAll({
      limit,
      offset,
      include: [{
        model: Categoria,
        as: 'categoria',
        attributes: ['idCategoria', 'nombre']
      }]
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

exports.createPieza = async (req, res) => {
  try {
    const { nombre, color, precio, idCategoria, medida, stock, estado } = req.body;
    
    const pieza = await Pieza.create({
      nombre,
      color,
      precio,
      idCategoria,
      medida,
      stock,
      estado: estado || true
    });

    res.status(201).json({
      success: true,
      data: pieza,
      message: 'Pieza creada correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear pieza',
      error: error.message
    });
  }
};

exports.updatePieza = async (req, res) => {
  try {
    const idPieza = req.params.id;
    const { nombre, color, precio, idCategoria, medida, stock, estado } = req.body;

    const pieza = await Pieza.findByPk(idPieza);
    if (!pieza) {
      return res.status(404).json({ 
        success: false,
        message: 'Pieza no encontrada' 
      });
    }

    pieza.nombre = nombre;
    pieza.color = color;
    pieza.precio = precio;
    pieza.idCategoria = idCategoria;
    pieza.medida = medida;
    pieza.stock = stock;
    pieza.estado = estado;
    
    await pieza.save();

    res.json({
      success: true,
      data: pieza,
      message: 'Pieza actualizada correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar pieza',
      error: error.message
    });
  }
};

exports.deletePieza = async (req, res) => {
  try {
    const { idPieza } = req.params;

    const pieza = await Pieza.findByPk(idPieza);
    if (!pieza) {
      return res.status(404).json({ 
        success: false,
        message: 'Pieza no encontrada' 
      });
    }

    await pieza.destroy();

    res.json({
      success: true,
      message: 'Pieza eliminada correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar pieza',
      error: error.message
    });
  }
};