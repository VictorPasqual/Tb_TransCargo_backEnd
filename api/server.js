const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes')

routes(app)

app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Max-Age", "86400")
    if (req.method === 'OPTIONS') {
        res.header('Acess-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }

    next();
});

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Conectado a porta ${port}`));

module.exports = app;