const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Proveedor = sequelize.define('Proveedor', {
  idProveedor: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // Agrega aquí los demás campos de tu modelo
}, {
  tableName: 'proveedor',
  timestamps: false
});

module.exports = Proveedor;