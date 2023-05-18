const { CaminhoesServices } = require('../services')
const caminhoesServices = new CaminhoesServices()

class CaminhoesController {

    static async readAllTrucks(req, res) {
        try {
            const AllUsers = await caminhoesServices.pegaTodosRegistros()
            return res.status(200).json(AllUsers)
        } catch (err) {
            return res.status(500).json(err.message)
        }
    }

    static async readOneTruck(req, res) {
        const { id } = req.params
        try {
            const OneUser = await caminhoesServices.pegaUmRegistro({ id })
            return res.status(200).json(OneUser)
        } catch (err) {
            return res.status(500).json(err.message)
        }
    }

    static async postTruck(req, res) {
        const NewUser = req.body
        try {

            if (Object.keys(NewUser).length === 0) {
                throw new Error('corpo da requisição vazio');
            }

            const createUser = await caminhoesServices.criaRegistro(NewUser)
            return res.status(200).json({ message: 'Um Usuario foi criado', createUser });
        } catch (err) {
            return res.status(500).json(err.message)
        }
    }

    static async updateTruck(req, res) {
        const { id } = req.params
        const NewUser = req.body
        try {
            await caminhoesServices.atualizaRegistro(NewUser, id)
            return res.status(200).json({ mensagem: `id ${id} atualizado` });
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }

    static async deleteTruck(req, res) {
        const { id } = req.params
        try {
            await caminhoesServices.apagaResgistro(id)
            return res.status(200).json({ message: 'Um Usuario foi deletado' });
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }



}

module.exports = CaminhoesController;