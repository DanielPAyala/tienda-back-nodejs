'use strict'

const express = require('express');
const { registro_cliente, login_cliente } = require('../controllers/ClienteController');
const api = express.Router();

api.post('/registro_cliente', registro_cliente);
api.post('/login_cliente', login_cliente);

module.exports = api;