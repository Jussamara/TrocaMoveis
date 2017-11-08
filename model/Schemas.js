const mongoose = require('mongoose');

var Usuarios = mongoose.Schema({
    name: { type: String, required: true },
    email: {type: String, unique: true, required: true },
    cpf: {type: String, unique: true, required: true },
    senha: { type: String, required: true },
    telefone: String,
    admin: { type: Boolean, required: true, default: false },
    token: { type: String, required: true }
}, {versionKey: false});

var Moveis = mongoose.Schema({
    nome: { type: String, required: true },
    descricao: String,
    image: String,
    endereco: {
        estado: String,
        cidade: String,
        rua: String
    },
    dono: { type: String, required: true },
    status: { type: Boolean, default: true } // 0 Disabled - 1 Active
}, {versionKey: false});

var Troca = mongoose.Schema({
    solicitante: {
        id: { type: String, required: true },
        nome: { type: String, required: true }
    },
    movel: {
        id: { type: String, required: true },
        dono: { type: String, required: true },
        nome: { type: String, required: true }
    },
    // movel: { type: String, required: true },
    status: Boolean, // 0 Pendente -  1 Done
    data: { type: Date, required: true },
    dataCancelamento: { type: Date }
}, {versionKey: false});

var Denuncia = mongoose.Schema({
    usuario: String,
    movel: String,
    dataDenuncia: Date
}, {versionKey: false});

module.exports = {
    usuarios: Usuarios,
    moveis: Moveis,
    troca: Troca,
    denuncia: Denuncia
};