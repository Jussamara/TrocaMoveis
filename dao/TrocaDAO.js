const crud = require('./crudGeneric');
const model = require('./../model/model.js').troca;
var Troca = {};

Troca.solicitar = (data) =>{
    return crud.insert(new model(data));
};

Troca.cancelar = (id, dados) => {
    return crud.findOneUpdate(model, id, dados);
};

Troca.lista = (seek={}, limit=10, page=1) => {
    return crud.listAllForSeek(model, seek, limit, page);
};

Troca.verificaUsuarioSolicitouTroca = async (movelId, usuarioId) => {
    const query = {
        'movel.id': movelId,
        'solicitante.id': usuarioId,
        status: true 
    };

    const troca = await crud.listSeek(model, query);
    
    if (!troca.length) {
        return false;
    }

    return true;
};

module.exports = Troca;