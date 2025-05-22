const { Proveedor } = require('../models');

exports.getProveedores = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const limit = 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await Proveedor.findAndCountAll({
      limit,
      offset
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
      message: 'Proveedores obtenidos correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener proveedores',
      error: error.message
    });
  }
};

exports.createProveedor = async (req, res) => {
  try {
    const { nombre, direccion, telefono, email, estado } = req.body;
    
    const proveedor = await Proveedor.create({
      nombre,
      direccion,
      telefono,
      email,
      estado: estado || true
    });

    res.status(201).json({
      success: true,
      data: proveedor,
      message: 'Proveedor creado correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear proveedor',
      error: error.message
    });
  }
};

exports.updateProveedor = async (req, res) => {
  try {
    const idProveedor = req.params.id;
    const { nombre, direccion, telefono, email, estado } = req.body;

    const proveedor = await Proveedor.findByPk(idProveedor);
    if (!proveedor) {
      return res.status(404).json({ 
        success: false,
        message: 'Proveedor no encontrado' 
      });
    }

    proveedor.nombre = nombre;
    proveedor.direccion = direccion;
    proveedor.telefono = telefono;
    proveedor.email = email;
    proveedor.estado = estado;
    
    await proveedor.save();

    res.json({
      success: true,
      data: proveedor,
      message: 'Proveedor actualizado correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar proveedor',
      error: error.message
    });
  }
};

exports.deleteProveedor = async (req, res) => {
  try {
    const { idProveedor } = req.params;

    const proveedor = await Proveedor.findByPk(idProveedor);
    if (!proveedor) {
      return res.status(404).json({ 
        success: false,
        message: 'Proveedor no encontrado' 
      });
    }

    await proveedor.destroy();

    res.json({
      success: true,
      message: 'Proveedor eliminado correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar proveedor',
      error: error.message
    });
  }
};