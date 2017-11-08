const jsonwebtoken = require('jsonwebtoken');
const DAO = require('./../dao/MoveisDAO');
const TrocasDAO = require('./../dao/TrocaDAO');

var Moveis = {};

Moveis.adicionar = (req, res) =>{
    return DAO.adicionar(req.body)
    .then((data) => res.json(data))
    .catch((err)=> res.json(err))
    ;
};

Moveis.alterar = (req, res) =>{
    return DAO.alterar(req.params.id, req.body)
    .then((data) => res.status(200).json(data))
    .catch((err)=> res.status(400).json(err));
};

Moveis.detalhes = async (req, res) => {
    try {
        let movel = await DAO.detalhes(req.params.id);

        if (req.usuario) {
            const jaSolicitouTroca = await TrocasDAO.verificaUsuarioSolicitouTroca(movel._id, req.usuario._id);
            movel.trocaSolicitada = jaSolicitouTroca;
        }
        
        res.send( movel);
    } catch (err) {
        console.error(err);
        res.status(400).json(err)
    }
};

Moveis.remover = (req, res) =>{
    return DAO.remover(req.params.id)
        .then((data) => res.sendStatus(202))
        .catch((err) => res.status(400).json(err));
};

Moveis.lista = (req, res) =>{
    return DAO.lista({})
    .then((data) => res.status(200).json(data))
    .catch((err)=> res.status(400).json(err))
};

module.exports = Moveis;