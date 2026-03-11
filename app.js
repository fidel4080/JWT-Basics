require('dotenv').config();

const express = require('express');
const app = express();

const notFoundMiddleware = require('./middlewares/notFound.js');
const errorHandlerMiddleware = require('./middlewares/errorHandler.js');
const router = require('./routes/main.js')

app.use(express.static('./public'));
app.use(express.json());

app.use('/api/v1', router);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async (req, res)=> {
    try {
        app.listen(port, ()=> {
            console.log(`✅Server listening on port: ${port}...`)
        });
    } catch (error) {
        console.error(error);
    }
}

start();
