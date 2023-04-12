const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes')

routes(app)

app.use(cors())

const port = process.env.PORT || 8081;

app.listen(port, () => console.log(`Conectado a porta ${port}`));

module.exports = app;