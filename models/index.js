const { Sequelize } = require('sequelize');
const sequelize = require('../config/db');

// Importar todos los modelos
const User = require('./User');
const Pieza = require('./Pieza');
const Suministro = require('./Suministro');
const Categoria = require('./Categoria');
const Proveedor = require('./Proveedor');

// Configurar relaciones

// 1. Relación entre Pieza y Categoria
Pieza.belongsTo(Categoria, {
  foreignKey: 'idCategoria',
  as: 'categoria'
});
Categoria.hasMany(Pieza, {
  foreignKey: 'idCategoria',
  as: 'piezas'
});

// 2. Relación entre Suministro y Proveedor
Suministro.belongsTo(Proveedor, {
  foreignKey: 'idProveedor',
  as: 'proveedor'
});
Proveedor.hasMany(Suministro, {
  foreignKey: 'idProveedor',
  as: 'suministros'
});

// 3. Relación entre Pieza y Suministro (tabla puente SuministroPieza si existe)
// Si tienes una tabla intermedia, necesitarás su modelo y estas relaciones:
// Pieza.belongsToMany(Suministro, { through: 'SuministroPieza' });
// Suministro.belongsToMany(Pieza, { through: 'SuministroPieza' });

const db = {
  Sequelize,
  sequelize,
  User,
  Pieza,
  Suministro,
  Categoria,
  Proveedor
};

// Sincronizar todos los modelos
db.sync = async (options = {}) => {
  await sequelize.sync(options);
  console.log('Todos los modelos fueron sincronizados correctamente.');
};

module.exports = db;