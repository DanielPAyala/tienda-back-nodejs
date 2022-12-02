'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'carlosporras';

exports.createToken = (user) => {
    const payload = {
        sub: user._id,
        nombres: user.nombres,
        apellidos: user.apellidos,
        email: user.email,
        iat: moment().unix(),
        exp: moment().add(7, 'days').unix()
    }

    return jwt.encode(payload, secret);
}