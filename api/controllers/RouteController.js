const { RotasServices } = require('../services');
const rotasServices = new RotasServices();

class RouteController {
  static async readAllRoutes(req, res) {
    try {
      const allRoutes = await rotasServices.pegaTodosRegistros();
      return res.status(200).json(allRoutes)
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async readOneRoute(req, res) {
    const { id } = req.params;
    try {
      const oneRoute = await rotasServices.pegaUmRegistro({ id });
      if (!oneRoute) {
        return res.status(404).json({ message: "Rota não encontrada" });
      }
      return res.status(200).json(oneRoute);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async postRoute(req, res) {
    const newRota = req.body;
    try {
      if (Object.keys(newRota).length === 0) {
        throw new Error('corpo da requisição vazio');
      }

      const createRota = await rotasServices.criaRegistro(newRota);
      return res.status(200).json({ message: 'Uma Rota foi criada', createRota });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async updateRoute(req, res) {
    const { id } = req.params;
    const newRoute = req.body;
    try {
      await rotasServices.atualizaRegistro(newRoute, id);
      return res.status(200).json({ message: `Rota com ID ${id} atualizada` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async deleteRoute(req, res) {
    const { id } = req.params;
    try {
      await rotasServices.apagaResgistro(id);
      return res.status(200).json({ message: "Rota deletada com sucesso" });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = RouteController;
