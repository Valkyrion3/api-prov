const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const { sequelize: db } = require('./models');
require('dotenv').config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/categorias', require('./routes/categorias'));

// Conexión a la base de datos y inicio del servidor
sequelize.sync()
  .then(() => {
    console.log('Conexión a PostgreSQL establecida');
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error al conectar a PostgreSQL:', err);
  });

  db.sync()
  .then(() => {
    console.log('Modelos sincronizados con la base de datos');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error al sincronizar modelos:', err);
  });