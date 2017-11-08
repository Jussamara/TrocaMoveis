const crud = require('./crudGeneric');
const Model = require('./../model/model').users;
var User = {};

User.adicionar = (param) =>{
    return crud.insert(new Model(param));
};

User.lista = (param) =>{
    return crud.listSeek(Model, param);
};

User.logar = (email, senha) =>{
    return crud.listSeek(Model, {email: email, senha: senha});
};

User.alterar = (id, dados) => {
    return crud.findOneUpdate(Model, id, dados);
};

User.remover = (id) => {
    return crud.remove(Model, id);
};

User.detalhes = (id) => {
    return crud.findOne(Model, id);
};

module.exports = User;