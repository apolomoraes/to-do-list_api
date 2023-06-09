const { verify } = require('jsonwebtoken');
const authConfig = require('../../config/auth.json');

function ensureAuthenticated(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token não encontrado' });
  };

  const parts = authHeader.split(' ');

  if (!parts.length === 2) {
    return res.status(401).json({ message: 'Token inválido' });
  };

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ message: 'Token inválido' });
  };

  verify(token, authConfig.secret, (error, decoded) => {
    if (error) {
      return res.status(401).json({ message: 'Token inválido' });
    };

    req.userId = decoded.id;
    return next();
  })
}

module.exports = ensureAuthenticated;