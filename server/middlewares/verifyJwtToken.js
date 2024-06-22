const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config");
const CustomError = require("../errors");

const verifyJWTToken = (...requiredRoles) => {
    return async (req, res, next) => {
        const token = req.headers.authorization;
      
            if (!token) {
                throw new CustomError.UnauthenticatedError("Unauthorized access!");
            }

            jwt.verify(token, jwt_secret, (err, decoded) => {
                if (err) {
                    console.error("JWT verification error:", err);
                    throw new CustomError.UnauthenticatedError("Unauthorized access!");
                }

                req.decoded = decoded;
                console.log(decoded)

                if (requiredRoles.length && !requiredRoles.includes(decoded.role)) {
                    throw new CustomError.UnauthorizedError("Forbidden!");
                }
                next();
            });
        };

    


};


module.exports = verifyJWTToken;