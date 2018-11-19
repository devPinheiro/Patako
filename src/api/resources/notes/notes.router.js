import express from 'express';
import noteController from './notes.controller';

export const noteRouter = express.Router();
// define routes for the notes
noteRouter.route('/').get(noteController.getOne);
