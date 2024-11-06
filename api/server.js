const express = require('express');
const recipesRouter = require('./recipes/router.js');

const server = express();

server.use(express.json());

server.use('/api/recipes', recipesRouter);

server.use('*', (req, res) => {
    res.status(404).json("Page not found.");
})

module.exports = server;