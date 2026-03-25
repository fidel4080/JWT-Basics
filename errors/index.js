const CustomAPIError = require('./customError.js');
const UnauthenticatedError = require('./unauthenticated.js');
const BadRequest = require('./badRequest.js');

module.exports = {
    BadRequest,
    UnauthenticatedError,
    CustomAPIError
};

