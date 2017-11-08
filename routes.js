const router = require('express').Router();
const moveis = require('./controller/MoveisControllers')
const users = require('./controller/UsuariosControllers')
const troca = require('./controller/TrocaControllers')
const { autenticacaoOpcional, autenticacaoObrigatoria: autenticacao } = require('./middlewares/autenticacao')

router.get('/', (req, res) => {
    res.status(200).send("API TCC - Troca Moveis!!!");
});

/**
 * ROUTES USERS
 */
router.get('/users', autenticacao, users.lista);
router.post('/users', users.adicionar);
router.get('/users/:id', autenticacao, users.detalhes);
router.get('/users/:id/moveis', autenticacao, users.moveisPorUsuario);
router.put('/users/:id', autenticacao, users.alterar);
router.delete('/users/:id', autenticacao, users.remover);
router.post('/users/recuperar-senha', users.recuperarSenha);
router.post('/users/alterar-senha', users.alterarSenha);
router.get('/users/perfil/:id', autenticacao, users.perfil);

/**
 * ROUTES MOVEIS
 */
router.get('/moveis', moveis.lista);
router.get('/moveis/:id', autenticacaoOpcional, moveis.detalhes);
router.post('/moveis', autenticacao, moveis.adicionar);
router.put('/moveis/:id', autenticacao, moveis.alterar);
router.delete('/moveis/:id', autenticacao, moveis.remover);

/**
 * ROUTES TROCA
 */
// router.get('/troca/lista', autenticacao, troca.lista);
router.post('/troca/solicita', autenticacao, troca.solicitar);
router.post('/troca/cancelar', autenticacao, troca.cancelar);
router.get('/troca/recebidas/:usuarioId', autenticacao, troca.recebidas);
router.get('/troca/solicitadas/:usuarioId', autenticacao, troca.solicitadas);

/**
 * ROUTES LOGIN
 */
router.post('/login', users.logar);

module.exports = router;
