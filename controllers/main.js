const jwt = require('jsonwebtoken');
const CustomAPIError = require('../errors/customError.js');

const login = async (req, res) => {
    const {username, password} = req.body;

    //check if username and password exist

    if(!username || !password){
        throw new CustomAPIError('Please provide both email and password!', 400);
    }
    const id = new Date().getDate();

    //try to keep payload small, better experience for the user
    const token = jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn:'30d'});

    res.status(201).json({msg: 'User created successfully', token});
}

const dashboard = async (req, res) => {
    const luckyNumber  = Math.floor(Math.random() * 100);

    const authHeader = req.headers.authorization;

    //Check if token is present
    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new CustomAPIError('No token Provided!', 401);
    }

    const token = authHeader.split(' ')[1];
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);

        res.status(200).json({
            msg: `Hello ${decoded.username}`,
            secret: `Here is your authorized data, your lucky number is ${luckyNumber}`
        });

    } catch (error) {
        console.log(error);
        throw new CustomAPIError('Not authorized to access this route', 401);
    }

    
}

module.exports = {
    login,
    dashboard
}