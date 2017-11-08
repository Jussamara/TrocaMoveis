const crud = require('./crudGeneric');
const model = require('./../model/model').moveis;
const ObjectId = require('mongoose').Types.ObjectId;
var Moveis = {};

Moveis.adicionar = (data) => {
    return crud.insert(new model(data));
};

Moveis.alterar = (id, data) =>{
    return crud.findOneUpdate(model, id, data);
};

Moveis.remover = (id) => {
    return crud.remove(model, id);
};

Moveis.lista = (seek={}, limit=10, page=1) => {
    return crud.listAllForSeek(model, seek, limit, page);
};

Moveis.detalhes = (id) => {
    return crud.findOne(model, id);
};

Moveis.upload = () => {
//  MULTER
}

module.exports = Moveis;