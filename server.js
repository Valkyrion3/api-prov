const express = require('express');
const app = express();
const sequelize = require('./config/db'); // tu archivo de conexión a PostgreSQL
const Proveedor = require('./models/Proveedor'); // tu modelo actualizado

// Sincroniza y actualiza la tabla automáticamente
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Tabla proveedor actualizada con éxito.');
  })
  .catch(err => {
    console.error('Error al actualizar la tabla proveedor:', err);
  });

app.listen(3000, () => {
  console.log('Servidor escuchando en puerto 3000');
});