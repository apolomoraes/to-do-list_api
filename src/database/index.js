const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/nodeRest');
mongoose.Promise = global.Promise;

module.exports = mongoose;