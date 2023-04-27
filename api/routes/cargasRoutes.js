const { Router } = require('express')
const CargaController = require('../controllers/CargaController')
const { Op } = require('sequelize');

const router = Router()

const { Caminhoes, Cargas } = require('../models');

router
    .get('/cargas', CargaController.readAllCargas)
    .get('/cargas/id/:id', CargaController.readOneCarga)
    .get('/cargas/:notaFiscalOuCpfCnpj', async (req, res) => {
        const { notaFiscalOuCpfCnpj } = req.params;
      
        try {
          const carga = await Cargas.findOne({
            where: {
              [Op.or]: [
                { notaFiscal: notaFiscalOuCpfCnpj },
                { cpf_cnpj: notaFiscalOuCpfCnpj }
              ]
            }
          });
      
          if (carga) {
            res.json(carga);
          } else {
            res.status(404).send('Carga não encontrada');
          }
      
        } catch (error) {
          console.log(error);
          res.status(500).send('Erro interno do servidor');
        }
      })
      
    .get('/cargas/caminhao/:notaFiscalOuCpfCnpj', async (req, res) => {
        const { notaFiscalOuCpfCnpj } = req.params;

        try {
            const carga = await Cargas.findOne({
                where: {
                    [Op.or]: [
                        { notaFiscal: notaFiscalOuCpfCnpj },
                        { cpf_cnpj: notaFiscalOuCpfCnpj }
                    ]
                },
                include: [
                    {
                        model: Caminhoes
                    }
                ]
            });

            if (carga) {
                const caminhoes = carga.Caminho;
                res.json(caminhoes);
            } else {
                res.status(404).send('Carga não encontrada');
            }

        } catch (error) {
            console.log(error);
            res.status(500).send('Erro interno do servidor');
        }
    })

    .post('/cargas', CargaController.postCarga)
    .put('/cargas/:id', CargaController.updateCarga)
    .delete('/cargas/:id', CargaController.deleteCarga)

module.exports = router