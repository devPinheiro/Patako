import express from 'express';
import { noteRouter } from './resources/notes';

export const apiRouter = express.Router();

// define api route for components
apiRouter.use('/notes', noteRouter);