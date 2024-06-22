const jwt = require('jsonwebtoken');

const generateJwtToken = async(payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME });
    return token;
}

module.exports = generateJwtToken;