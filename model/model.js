var schema = require('./Schemas.js');
const mongoose = require('mongoose');

var Models = {};

Models.troca =  mongoose.model('troca', schema.troca, 'troca');
Models.users =  mongoose.model('users', schema.usuarios, 'users');
Models.moveis =  mongoose.model('moveis', schema.moveis, 'moveis');
Models.denuncia =  mongoose.model('denuncia', schema.denuncia, 'denuncia');

module.exports = Models