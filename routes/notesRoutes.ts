// IMPORTS EXPRESS REST API
import express, { Request, Response } from 'express';

import {
  getNotes,
  createNotes,
  updateNotes,
  deleteNotes,
} from '../controllers/notesController';
// import { getAll } from '../controllers/queryController';

const notesRouter = express.Router();
const queryRouter = express.Router();

// CALLING THE REQUESTS AND RESPONSE FUNCTIONS
notesRouter.route('/').get(getNotes).post(createNotes);
notesRouter.route('/:name').patch(updateNotes).delete(deleteNotes);
// queryRouter.route('/getall').get(getAll);

export default notesRouter; queryRouter;

