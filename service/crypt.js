const jwt = require('jsonwebtoken');
require('dotenv').config();
const { secret } = process.env;

const encode = async(data) => {
    if (secret) {
        return jwt.sign({data}, secret);
    }
}
const decode = async(token) => {
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return error;
    }
}

module.exports = {
    encode,
    decode
};