'use strict'

const express = require('express');
const { registro_admin, login_admin } = require('../controllers/AdminController');
const api = express.Router();

api.post('/registro_admin', registro_admin);
api.post('/login_admin', login_admin);

module.exports = api;