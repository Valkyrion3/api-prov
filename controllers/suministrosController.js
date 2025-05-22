const { Suministro, Proveedor, SuministroPieza, Pieza } = require('../models');

exports.getSuministros = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const limit = 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await Suministro.findAndCountAll({
      limit,
      offset,
      include: [{
        model: Proveedor,
        as: 'proveedor',
        attributes: ['idProveedor', 'nombre']
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

exports.createSuministro = async (req, res) => {
  try {
    const { idProveedor, fecha, monto, estado, piezas } = req.body;
    
    const suministro = await Suministro.create({
      idProveedor,
      fecha: fecha || new Date(),
      monto,
      estado: estado || true
    });

    // Si se enviaron piezas para este suministro
    if (piezas && Array.isArray(piezas)) {
      await Promise.all(piezas.map(async pieza => {
        await SuministroPieza.create({
          idSuministro: suministro.idSuministro,
          idPieza: pieza.idPieza,
          cantidad: pieza.cantidad,
          precioUnitario: pieza.precioUnitario
        });
      }));
    }

    res.status(201).json({
      success: true,
      data: suministro,
      message: 'Suministro creado correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear suministro',
      error: error.message
    });
  }
};

exports.updateSuministro = async (req, res) => {
  try {
    const idSuministro = req.params.id;
    const { idProveedor, fecha, monto, estado } = req.body;

    const suministro = await Suministro.findByPk(idSuministro);
    if (!suministro) {
      return res.status(404).json({ 
        success: false,
        message: 'Suministro no encontrado' 
      });
    }

    suministro.idProveedor = idProveedor;
    suministro.fecha = fecha;
    suministro.monto = monto;
    suministro.estado = estado;
    
    await suministro.save();

    res.json({
      success: true,
      data: suministro,
      message: 'Suministro actualizado correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar suministro',
      error: error.message
    });
  }
};

exports.deleteSuministro = async (req, res) => {
  try {
    const { idSuministro } = req.params;

    const suministro = await Suministro.findByPk(idSuministro);
    if (!suministro) {
      return res.status(404).json({ 
        success: false,
        message: 'Suministro no encontrado' 
      });
    }

    await suministro.destroy();

    res.json({
      success: true,
      message: 'Suministro eliminado correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar suministro',
      error: error.message
    });
  }
};

// Controlador para manejar las piezas de un suministro
exports.getPiezasSuministro = async (req, res) => {
  try {
    const { idSuministro } = req.params;

    const piezas = await SuministroPieza.findAll({
      where: { idSuministro },
      include: [{
        model: Pieza,
        as: 'pieza',
        attributes: ['idPieza', 'nombre', 'precio']
      }]
    });

    res.json({
      success: true,
      data: piezas,
      message: 'Piezas del suministro obtenidas correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener piezas del suministro',
      error: error.message
    });
  }
};

exports.addPiezaToSuministro = async (req, res) => {
  try {
    const { idSuministro } = req.params;
    const { idPieza, cantidad, precioUnitario } = req.body;

    const relacion = await SuministroPieza.create({
      idSuministro,
      idPieza,
      cantidad,
      precioUnitario
    });

    res.status(201).json({
      success: true,
      data: relacion,
      message: 'Pieza agregada al suministro correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al agregar pieza al suministro',
      error: error.message
    });
  }
};