import express from 'express';
import noteController from './notes.controller';

export const noteRouter = express.Router();
// define routes for the notes
noteRouter.route('/')
    .post(noteController.create)
    .get(noteController.getAll);

noteRouter.route('/:id')
    .get(noteController.getOne)
    .delete(noteController.delete)
    .put(noteController.update);
