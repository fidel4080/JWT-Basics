const jwt = require('jsonwebtoken');
const CustomAPIError = require('../errors/customError.js');

const authenticationMiddleware = async (req, res, next)=>{
    const authHeader = req.headers.authorization;

    //Check if token is present
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new CustomAPIError('No token Provided!', 401);
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const {id, username} = decoded;

        req.user = {id, username};
        next();
    } catch (error) {
        console.log(error);
        throw new CustomAPIError('Not authorized to access this route', 401);
    }
}

module.exports = authenticationMiddleware;