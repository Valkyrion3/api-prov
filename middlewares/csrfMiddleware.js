const csrf = require('csrf');
const tokens = new csrf();
const SECRET_KEY = process.env.SECRET_KEY || 'mi-clave-super-secreta';

const generarToken = () => tokens.create(SECRET_KEY);

const verificarCSRF = (req, res, next) => {
  const token = req.headers['x-csrf-token'] || req.body?.csrfToken;
  if (!token || !tokens.verify(SECRET_KEY, token)) {
    return res.status(403).json({ error: 'Token CSRF inválido o faltante' });
  }
  next();
};

module.exports = {
  generarToken,
  verificarCSRF
};
