const jwt = require('jsonwebtoken');
const {UnauthenticatedError} = require('../errors/index.js');

const authenticationMiddleware = async (req, res, next)=>{
    const authHeader = req.headers.authorization;

    //Check if token is present
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('No token Provided!');
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const {id, username} = decoded;

        req.user = {id, username};
        next();
    } catch (error) {
        console.log(error);
        throw new UnauthenticatedError('Not authorized to access this route');
    }
}

module.exports = authenticationMiddleware;