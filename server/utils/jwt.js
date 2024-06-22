const jwt = require('jsonwebtoken');

const createToken  = (payload)=>{
  const token = jwt.sign(payload, process.env.JWT_SECRET,{ expiresIn: process.env.JWT_LIFETIME });
  return token;
}

const isTokenValid = (token)=>{
    return jwt.verify(token, process.env.JWT_SECRET);
}

const attachCookiesToResponse = ({res, user})=>{
    const token = createToken(user);
    const oneDay = 1000*60*60*24;
    res.cookie('authCookie', token, {
        expires: new Date(Date.now() + oneDay),
        httpOnly: true
    })
}

module.exports = {
    createToken,
    isTokenValid,
    attachCookiesToResponse
}