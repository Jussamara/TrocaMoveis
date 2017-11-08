const DAO = require('./../dao/TrocaDAO');
const MoveisDAO = require('./../dao/MoveisDAO');
const UsuariosDAO = require('./../dao/UsuariosDAO');
const { enviarEmailCancelamentoTroca, enviarEmailSolicitacaoTroca } = require('./../services/email');
const jsonwebtoken = require('jsonwebtoken');

var Troca = {};

Troca.solicitar = async (req, res) => {
    try {
        const {
            solicitante: solicitanteId,
            movel: movelId
        } = req.body;
    
        const movel = await MoveisDAO.detalhes(movelId)
        
        const [ solicitante, usuarioDonoMovel ] = await Promise.all([
            UsuariosDAO.detalhes(solicitanteId),
            UsuariosDAO.detalhes(movel.dono)
        ]);

        const novaTroca = {
            solicitante: {
                id: solicitante._id,
                nome: solicitante.name
            },
            movel: {
                id: movel._id,
                dono: movel.dono,
                nome: movel.nome
            },
            status: true,
            data: new Date()
        };

        const troca = await DAO.solicitar(novaTroca);

        enviarEmailSolicitacaoTroca(solicitante, usuarioDonoMovel, movel);

        res.status(200).json(troca);

    } catch (err) {
        res.status(400).json(err)
    }
};

Troca.cancelar = async (req, res) => {
    try {
        const produto = req.body;
        
        const query = { 'movel.id': produto._id, 'solicitante.id': req.usuario._id, status: true };
        const [ troca ] = await DAO.lista(query);
        
        if (!troca) {
            res.sendStatus(404);
            return;
        }
        troca.dataCancelamento = new Date();
        troca.status = false;

        await DAO.cancelar(troca._id.toString(), troca);

        const [ solicitante, usuarioDonoMovel ] = await Promise.all([
            UsuariosDAO.detalhes(req.usuario._id),
            UsuariosDAO.detalhes(produto.dono)
        ]);

        enviarEmailCancelamentoTroca(solicitante, usuarioDonoMovel, produto);

        res.sendStatus(204);
    } catch (err) {
        res.status(400).json(err)
    }
};

Troca.lista = (req, res) => {
    DAO.solicitar({ status: true })
    .then((data)=>res.status(200).json(data))
    .catch((err)=>res.status(400).json(err));
};

Troca.solicitadas = async (req, res) => {
    try {
        const { usuarioId } = req.params;

        if (usuarioId !== req.usuario._id) {
            res.sendStatus(401);
            return;
        }

        const trocasPendentes = await DAO.lista({ 'solicitante.id': usuarioId, status: true });
        res.json(trocasPendentes);
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
};

Troca.recebidas = async (req, res) => {
    try {
        const { usuarioId } = req.params;

        if (usuarioId !== req.usuario._id) {
            res.sendStatus(401);
            return;
        }

        const trocasPendentes = await DAO.lista({ 'movel.dono': usuarioId, status: true });
        res.json(trocasPendentes);
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
};

module.exports = Troca;