import express from 'express';
import userController from './users.controller'; 


//define route for user endpoints

export const userRouter = express.Router();

userRouter.post('/signup',userController.signUp);
userRouter.post('/login',userController.login);
