'use strict'

const Admin = require('../models/admin');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../helpers/jwt');

const registro_admin = async (req, res) => {
    // 
    const data = req.body;
    let admins_arr = [];

    admins_arr = await Admin.find({ email: data.email });

    if (admins_arr.length == 0) {
        if (data.password) {
            bcrypt.hash(data.password, null, null, async (err, hash) => {
                if (hash) {
                    data.password = hash;
                    // Registro
                    const reg = await Admin.create(data);
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

const login_admin = async (req, res) => {
    const data = req.body;

    let admin_arr = [];
    admin_arr = await Admin.find({ email: data.email });

    if (admin_arr.length == 0) {
        res.status(200).send({ message: 'No se encontró el correo', data: undefined });
    } else {
        // Login
        let admin = admin_arr[0];

        bcrypt.compare(data.password, admin.password, async (err, check) => {
            if (check) {
                res.status(200).send({
                    data: admin,
                    token: jwt.createToken(admin)
                });
            } else {
                res.status(200).send({ message: 'La contraseña es incorrecta', data: undefined });
            }
        });
    }
}

module.exports = {
    registro_admin,
    login_admin
}