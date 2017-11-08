const jsonwebtoken = require('jsonwebtoken');

const autenticacaoObrigatoria = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        res.sendStatus(401);
        return;
    }

    req.usuario = jsonwebtoken.decode(authorization);

    next();
};

const autenticacaoOpcional = (req, res, next) => {
    const { authorization } = req.headers;

    if (authorization) {
        req.usuario = jsonwebtoken.decode(authorization);
    }

    next();
}

module.exports = {
    autenticacaoObrigatoria,
    autenticacaoOpcional
};