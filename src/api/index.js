import express from 'express';
import { noteRouter } from './resources/notes';
import { userRouter } from './resources/users';

export const apiRouter = express.Router();

// define api route for components
apiRouter.use('/notes', noteRouter);
apiRouter.use('/users', userRouter);