import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { connect } from './config/db';
import config from './config/config';
import { apiRouter } from './api';


// initialize our express app
const app = express();
const route = express.Router();
const PORT = process.env.PORT || 3700;
// connect to mongodb
connect();

// setup middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// create api route
app.use('/api/v1',apiRouter);

// 
app.use((req, res, next) => {
   const error = new Error('not found');
   error.message = 'Invalid Route';
   error.status = 404;
   next(error);
}); 



// listen to Port
app.listen(PORT, ()=> console.log(`Server started at port: ${PORT}`));

// lets export app for our unit testing 
export default app;

