const jsonwebtoken = require('jsonwebtoken');
const ObjectId = require('mongoose').Types.ObjectId;
const DAO = require('./../dao/UsuariosDAO');
const MoveisDAO = require('./../dao/MoveisDAO');
const { enviarEmailRecuperarSenha } = require('./../services/email');

const chavePrivada = 'a81ncy%1mx9';

var User = {};

User.adicionar = async (req, res) =>{
    try {
        const usuario = req.body;
        usuario._id = ObjectId();
        usuario.token = jsonwebtoken.sign(usuario, chavePrivada);
        
        await DAO.adicionar(usuario);

        res.json(usuario);

    } catch (err) {
        res.status(400).json(err);
    }
};

User.lista = (req, res) => {
    if (!req.usuario || !req.usuario.admin) {
        res.sendStatus(401);
        return;
    }
    
    return DAO.lista({})
        .then((data) => res.status(200).json(data))
        .catch((err)=> res.status(400).json(err))
    ;
}

User.detalhes = async (req, res) => {
    try {
        if (req.params.id !== req.usuario._id && !req.usuario.admin) {
            res.sendStatus(401);
            return;
        }
    
        const usuario = await DAO.detalhes(req.params.id);
        res.status(200).json(usuario);
        
    } catch (err) {
        console.error(err)
        res.status(400).json(err);
    }
}

User.perfil = async (req, res) => {
    try {
        if (!req.usuario) {
            res.sendStatus(401);
            return;
        }
    
        const usuario = await DAO.detalhes(req.params.id);

        const {
            _id,
            name,
            email,
            telefone
        } = usuario;

        res.status(200).json({ name, email, telefone });
        
    } catch (err) {
        console.error(err)
        res.status(400).json(err);
    }
};

User.logar = async (req, res) =>{
    try {
        const { email, senha } = req.body;
        const [ usuario ] = await DAO.logar(email, senha);

        if (!usuario) {
            res.sendStatus(404);
            return;
        }

        delete usuario.senha;
        delete usuario.cpf;

        res.status(200).json(usuario);
    } catch (err) {
        res.status(400).json(err)
    }
};

User.alterar = (req, res) => {
    return DAO.alterar(req.params.id, req.body)
        .then((data) => res.status(200).json(data))
        .catch((err)=> res.status(400).json(err));
};

User.remover = (req, res) => {
    return DAO.remover(req.params.id)
        .then((data) => res.sendStatus(202))
        .catch((err) => res.status(400).json(err));
};

User.moveisPorUsuario = async (req, res) => {
    try {
        const usuarioId= req.params.id;
        const moveis = await MoveisDAO.lista({ dono: usuarioId })

        res.json(moveis);
    } catch (err) {
        res.status(400).json(err);
    }
};

User.recuperarSenha = async (req, res) => {
    try {
        const { email } = req.body;
        const [ usuario ] = await DAO.lista({ email });

        if (!usuario) {
            res.sendStatus(404);
            return;
        }

        const token = jsonwebtoken.sign(email, chavePrivada);
        await enviarEmailRecuperarSenha(usuario, token);

        res.sendStatus(202);
    } catch (err) {
        res.status(400).json(err)
    }
};

User.alterarSenha = async (req, res) => {
    try {
        const { token, senha } = req.body;

        if (!token) {
            res.sendStatus(400);
            return;
        }

        const email = jsonwebtoken.decode(token);
        const [ usuario ] = await DAO.lista({ email });

        if (!usuario) {
            res.sendStatus(404);
            return;
        }

        delete usuario.token;
        usuario.senha = senha;
        usuario.token = jsonwebtoken.sign(usuario, chavePrivada);

        await DAO.alterar(usuario._id.toString(), usuario);

        res.sendStatus(202);
    } catch (err) {
        res.status(400).json(err)
    }
};

module.exports = User;