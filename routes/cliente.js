'use strict'

const express = require('express');

const clienteController = require('../controllers/ClienteController');

const api = express.Router();

api.post('/registro_cliente', clienteController.registro_cliente);

module.exports = api;