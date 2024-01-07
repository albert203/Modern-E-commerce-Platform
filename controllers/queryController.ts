// import db from '../routes/queryRoutes';
import express, { Request, Response } from 'express';
import mysql from 'mysql2/promise';

// Define types for query results
interface User {
  // Define properties based on your table structure
  id: number;
  username: string;
  email: string;
  password: string;
}

const db = mysql.createPool({
  host: Bun.env.DB_HOST,
  user: Bun.env.DB_USER,
  password: Bun.env.DB_PASS,
  database: Bun.env.DB_DATABASE,
});

export const getAll = async (req: Request, res: Response) => {
  try {
    //an array of users
    const [rows]: Array<User> = await db.execute('SELECT * FROM users');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Error connecting to database');
  }
};
