// IMPORTS EXPRESS REST API
import express, { Request, Response } from 'express';

import {
  getNotes,
  createNotes,
  updateNotes,
  deleteNotes,
} from '../controllers/notesController';

const app = express();
app.use(express.json());

const notesRouter = express.Router();

// CALLING THE REQUESTS AND RESPONSE FUNCTIONS
notesRouter.route('/').get(getNotes).post(createNotes);
notesRouter.route('/:name').patch(updateNotes).delete(deleteNotes);

/////////////////////////////////////////////////////////////////////////////////////

// CALLING THE REQUESTS AND RESPONSE FUNCTIONS
// app.get('/api/notes', getNotes);
// app.post('/api/notes', createNotes);
// app.patch('/api/notes/:name', updateNotes);
// app.delete('/api/notes/:name', deleteNotes);
// IMPORTS EXPRESS REST API

/////////////////////////////////////////////////////////////////////////////////////

export default notesRouter;
