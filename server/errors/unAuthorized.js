const {StatusCodes} = require('http-status-codes');
const CustomAPIError = require('./customErrorAPI');

class Unauthorized extends CustomAPIError{
    constructor(message)
    {
        super(message);
        this.statusCode = StatusCodes.FORBIDDEN;
    }
}

module.exports = Unauthorized;