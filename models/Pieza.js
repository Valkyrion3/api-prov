const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Pieza = sequelize.define('Pieza', {
  idPieza: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'idPieza'
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  idCategoria: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'idCategoria'
  },
  medida: {
    type: DataTypes.STRING,
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  estado: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
  tableName: 'pieza',
  timestamps: false
});

module.exports = Pieza;