const nodemailer = require('nodemailer');

const url = process.env.NODE_ENV === 'production' ? 'https://tccprojetotrocas.herokuapp.com' : 'http://localhost:3000';

function enviarEmailSolicitacaoTroca (solicitante, usuarioDonoMovel, movel) {
    const html = `<h1>Solitação de Troca</h1>
        Você recebeu uma solicitação de troca para o produto <a href="${url}/anuncio/${movel._id}">${movel.nome}</a>
        <br><br><br>
        O usuário que solicitou a troca se chama ${solicitante.name}.<br>
        Você pode ver os produtos desse usuário <a href="${url}/usuario/${solicitante._id}">aqui</a> bem como os dados para entrar em contato com o mesmo.
        <br><br><br>
        Não perca essa oportunidade.
        <br>`;

    return enviarEmail(usuarioDonoMovel, 'Solicitação de troca', html)

}

function enviarEmailCancelamentoTroca (solicitante, usuarioDonoMovel, movel) {
    const html = `<h1>Cancelamento de Troca</h1>
        O usuário ${solicitante.name} cancelou a troca solicitada anteriormente do produto ${movel.nome}`;

    return enviarEmail(usuarioDonoMovel, 'Cancelamento de troca', html)
}

function enviarEmailRecuperarSenha (usuario, token) {
    const html = `<h1>Recuperar senha</h1>
    Para gerar uma nova senha <a href="${url}/usuario/alterar-senha?token=${token}">clique aqui</a>`;

    return enviarEmail(usuario, 'Recuperar senha', html);
}

module.exports = {
    enviarEmailCancelamentoTroca,
    enviarEmailSolicitacaoTroca,
    enviarEmailRecuperarSenha
}

function enviarEmail (destinatario, titulo, html) {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'tccprojetotrocas@gmail.com',
                pass: 'ProjetoTrocas123'
            }
        });

        const mailOptions = {
            from: '"Projeto Trocas" <tccprojetotrocas@gmail.com>',
            to: `"${destinatario.name} <${destinatario.email}>`,
            subject: titulo,
            html: html
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(info.messageId);
        });
    });
};