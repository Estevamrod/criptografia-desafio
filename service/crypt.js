const jwt = require('jsonwebtoken');
require('dotenv').config();

const encode = async(data) => {
    if (process.env.JWT_SECRET) {
        return jwt.sign({data}, process.env.JWT_SECRET, { algorithm: 'HS512' });
    }
}
const decode = async(token) => {
    try {
        return jwt.verify(token,process.env.JWT_SECRET)
    } catch (error) {
        return error;
    }
}

module.exports = {
    encode,
    decode
};