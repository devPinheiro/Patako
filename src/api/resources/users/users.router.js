import express from 'express';
import userController from './users.controller'; 


//define route for user endpoints

export const userRouter = express.Router();

userRouter.route('/').post(userController.create);
