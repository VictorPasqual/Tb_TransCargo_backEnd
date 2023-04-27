const { Router } = require('express')
const CaminhoesController = require('../controllers/CaminhoesController')

const router = Router()

router

    .get('/trucks', CaminhoesController.readAllTrucks)
    .get('/trucks/:id', CaminhoesController.readOneTruck)
    .post('/trucks', CaminhoesController.postTruck)
    .put('/trucks/:id', CaminhoesController.updateTruck)
    .delete('/trucks/:id', CaminhoesController.deleteTruck)

module.exports = router 