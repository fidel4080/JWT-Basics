const CustomAPIError = require('./customError.js');
const { StatusCodes } = require('http-status-codes');

class BadRequest extends CustomAPIError{
    constructor(message){
        super(message, StatusCodes.BAD_REQUEST);
    }
}

module.exports = BadRequest;