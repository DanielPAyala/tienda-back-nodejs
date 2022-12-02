'use strict'

const Cliente = require('../models/cliente');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../helpers/jwt');

const registro_cliente = async (req, res) => {
    // 
    const data = req.body;
    let clientes_arr = [];

    clientes_arr = await Cliente.find({ email: data.email });

    if (clientes_arr.length == 0) {
        if (data.password) {
            bcrypt.hash(data.password, null, null, async (err, hash) => {
                if (hash) {
                    data.password = hash;
                    // Registro
                    const reg = await Cliente.create(data);
                    res.status(200).send({ message: reg });
                } else {
                    res.status(200).send({ message: 'ErrorServer', data: undefined });
                }
            });
        } else {
            res.status(200).send({ message: 'No hay una contraseña', data: undefined });
        }

    } else {
        res.status(200).send({ message: 'El correo ya existe en la base de datos', data: undefined });
    }
}

const login_cliente = async (req, res) => {
    const data = req.body;

    let cliente_arr = [];
    cliente_arr = await Cliente.find({ email: data.email });

    if (cliente_arr.length == 0) {
        res.status(200).send({ message: 'No se encontró el correo', data: undefined });
    } else {
        // Login
        let user = cliente_arr[0];

        bcrypt.compare(data.password, user.password, async (err, check) => {
            if (check) {
                res.status(200).send({
                    data: user,
                    token: jwt.createToken(user)
                });
            } else {
                res.status(200).send({ message: 'La contraseña es incorrecta', data: undefined });
            }
        });
    }
}

module.exports = {
    registro_cliente,
    login_cliente
}