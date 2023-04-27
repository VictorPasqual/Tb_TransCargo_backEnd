const { CargaServices } = require('../services')
const cargaServices = new CargaServices()

class CargaController {

    static async readAllCargas(req, res) {
        try {
            const AllCargas = await cargaServices.pegaTodosRegistros()
            return res.status(200).json(AllCargas)
        } catch (err) {
            return res.status(500).json(err.message)
        }
    }

    static async readOneCarga(req, res) {
        const { id } = req.params
        try {
            const OneCarga = await cargaServices.pegaUmRegistro({ id })
            return res.status(200).json(OneCarga)
        } catch (err) {
            return res.status(500).json(err.message)
        }
    }

    static async postCarga(req, res) {
        const NewCarga = req.body
        try {

            if (Object.keys(NewCarga).length === 0) {
                throw new Error('corpo da requisição vazio');
            }

            const createCarga = await cargaServices.criaRegistro(NewCarga)
            return res.status(200).json({ message: 'Uma Carga foi criada', createCarga });
        } catch (err) {
            return res.status(500).json(err.message)
        }
    }

    static async updateCarga(req, res) {
        const { id } = req.params
        const NewCarga = req.body
        try {
            await cargaServices.atualizaRegistro(NewCarga, id)
            return res.status(200).json({ mensagem: `id ${id} atualizado` });
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }

    static async deleteCarga(req, res) {
        const { id } = req.params
        try {
            await cargaServices.apagaResgistro(id)
            return res.status(200).json({ message: 'Uma Carga foi deletada' });
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }

}

module.exports = CargaController;