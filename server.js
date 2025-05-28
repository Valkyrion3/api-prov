const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(require('./middlewares/cors'));


// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/categorias', require('./routes/categorias'));
app.use('/api/piezas', require('./routes/piezas'));
app.use('/api/proveedores', require('./routes/proveedores'));
app.use('/api/suministros', require('./routes/suministros'));

const PORT = process.env.PORT || 3000; // Puerto del servidor, en render se da la variable de entorno PORT, si no se define, se usa el 3000

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});