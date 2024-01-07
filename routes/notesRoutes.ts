// IMPORTS EXPRESS REST API
import express, { Request, Response } from 'express';

import {
  getNotes,
  createNotes,
  updateNotes,
  deleteNotes,
} from '../controllers/notesController';

const notesRouter = express.Router();

// CALLING THE REQUESTS AND RESPONSE FUNCTIONS
notesRouter.route('/').get(getNotes).post(createNotes);
notesRouter.route('/:name').patch(updateNotes).delete(deleteNotes);

export default notesRouter;
