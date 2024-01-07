import express, { Request, Response } from 'express';
import notesRouter from './routes/notesRoutes';
import queryRouter from './routes/queryRoutes';

// to post things we need to use middleware
// if we do not write this we cannot get the req.body
const app = express();
app.use(express.json());
const port = Bun.env.DB_PORT || 8000;

app.use('/api/notes', notesRouter);
app.use('/api/query', queryRouter);

// this doesnt confirm the connection is working
app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
