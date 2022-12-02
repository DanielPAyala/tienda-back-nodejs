'use strict'

const Cliente = require('../models/cliente');

const registro_cliente = async (req, res) => {
    // 
    res.status(200).send({message:'Hola'});
}

module.exports = {
    registro_cliente
}