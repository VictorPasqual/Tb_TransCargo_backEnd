const database = require('../models');

class Services {
    constructor(nomeDoModelo) {
        this.nomeDoModelo = nomeDoModelo
    }

    async pegaTodosRegistros(where = {}) {
        return database[this.nomeDoModelo].findAll({ where: { ...where } })
    }

    async pegaUmRegistro(where = {}) {
        return database[this.nomeDoModelo].findOne({ where: { ...where } })
    }

    async criaRegistro(dados) {
        return database[this.nomeDoModelo].create(dados)
    }

    async atualizaRegistro(dadosAtual, id, transacao = {}) {
        return database[this.nomeDoModelo]
            .update(dadosAtual, { where: { id: id } }, transacao)
    }

    async atualizaRegistros(dadosAtual, where, transacao = {}) {
        return database[this.nomeDoModelo]
            .update(dadosAtual, { where: { ...where } }, transacao)
    }

    async apagaResgistro(id) {
        return database[this.nomeDoModelo].destroy({ where: { id: id } })
    }

    async restauraRegistro(id) {
        return database[this.nomeDoModelo].restore({ where: { id: id } })
    }

}


module.exports = Services
