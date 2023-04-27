const bodyParser = require('body-parser')
const users = require('../routes/userRoutes')
const auth = require('../routes/autRoute')
const truck = require('../routes/caminhoesRoutes')
const cargas = require('../routes/cargasRoutes')

module.exports = app => {
    app.use(
        bodyParser.json(),
        users,
        auth,
        truck,
        cargas
    )
}