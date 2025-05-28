module.exports = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173','https://prov-awm.vercel.app/'); // Ajustamo el origen de peticiones dependiendo del entorno
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
};