import express from 'express';

import { getAll } from '../controllers/queryController';

const app = express();
app.use(express.json());

const queryRouter = express.Router();

queryRouter.route('/getall').get(getAll);

export default queryRouter;
