import express from 'express';
import { getAll, createUser, createUserRest } from '../controllers/queryController';

const queryRouter = express.Router();

queryRouter.route('/getall').get(getAll);
queryRouter.route('/signup').post(createUser); // Ensure consistency with client-side request URL
queryRouter.route('/signupp').post(createUserRest); // Ensure consistency with client-side request URL
export default queryRouter;

