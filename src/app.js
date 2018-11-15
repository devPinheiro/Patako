import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import connect from './config/db';
import config from './config/config';


// initialize our express app
const app = express();
const route = express.Router();
const PORT = process.env.PORT || config.port;
// connect to mongodb
// connect();

// setup middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// create a simple route
app.get('/', (req, res)=>{
   res.send('Hello World');
});

// 
app.use((req, res, next) => {
   const error = new Error('not found');
   error.message = 'Invalid Route';
   error.status = 404;
   next(error);
}); 



// listen to Port
app.listen(PORT, ()=> console.log(`Server started at port: ${PORT}`));

