const bodyParser = require('body-parser')
const users = require('../routes/userRoutes')
const auth = require('../routes/autRoute')

module.exports = app => {
    app.use(
        bodyParser.json(),
        users,
        auth
        
    )
}