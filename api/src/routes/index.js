const express = require('express');
const country = require('./countries/country.js');
const activity = require('./activity/activity.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const server = express();
server.use("/countries", country);
server.use("/activity", activity);
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = server;
