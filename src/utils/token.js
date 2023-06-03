const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
function token(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: "30d",
  })
}

module.exports = token;