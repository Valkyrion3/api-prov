const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Suministro = sequelize.define('Suministro', {
  idSuministro: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'idSuministro'
  },
  idProveedor: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'idProveedor'
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  monto: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  estado: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
  tableName: 'suministro',
  timestamps: false
});

module.exports = Suministro;