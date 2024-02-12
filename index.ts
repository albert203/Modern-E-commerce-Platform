import express, { Request, Response} from 'express';
import { getAll, createUser, createUserRest } from '../controllers/controller';
import mysql from 'mysql2/promise';


const db = mysql.createPool({
  host: Bun.env.DB_HOST,
  user: Bun.env.DB_USER,
  password: Bun.env.DB_PASS,
  database: Bun.env.DB_DATABASE,
});

// to post things we need to use middleware
// if we do not write this we cannot get the req.body
const app = express();

const port = Bun.env.DB_PORT || 8000;

app.get('/api/getall', getAll());
app.post('/api/signup', createUser());
app.post('/api/signupp', createUserRest());

// this doesnt confirm the connection is working
app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
}).use(express.json());

export default db;



