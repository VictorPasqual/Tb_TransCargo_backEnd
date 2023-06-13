const { Router } = require('express');
const RouteController = require('../controllers/RouteController');
const axios = require('axios');
const { apiKey } = require('../config/MAP_API');
const router = Router();

router
    .get('/routes', RouteController.readAllRoutes)
    .get('/routes/:id', RouteController.readOneRoute)
    .post('/routes', RouteController.postRoute)
    .post('/routes/distance', async (req, res) => {
        const { origemCEP, destinoCEP } = req.body;

        console.log('Origem:', origemCEP);
        console.log('Destino:', destinoCEP);
        console.log('URL:', `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origemCEP}&destinations=${destinoCEP}&key=${apiKey}`);

        try {
            const response = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origemCEP}&destinations=${destinoCEP}&key=${apiKey}`);

            console.log(response.data)
            console.log(response.data.rows)
            console.log(response.data.distance)
            console.log(response.data.rows.elements)


            if (response.data.rows && response.data.rows.length > 0 && response.data.rows[0].elements && response.data.rows[0].elements.length > 0) {
                const distancia = response.data.rows[0].elements[0].distance.text;

                console.log("Distância calculada:", distancia);

                res.json({ distancia });
            } else {
                console.error("Erro ao calcular distância:", response.data);
                res.status(500).json({ error: 'Erro ao calcular distância', error });
            }
        } catch (error) {
            console.error("Erro ao calcular distância:", error);
            res.status(500).json({ error: 'Erro ao calcular distância', error });
        }
    })
    .put('/routes/:id', RouteController.updateRoute)
    .delete('/routes/:id', RouteController.deleteRoute);

module.exports = router;
