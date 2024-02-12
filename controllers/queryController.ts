// import db from '../routes/queryRoutes';
import express, { Request, Response } from 'express';
import mysql from 'mysql2/promise';

// Define types for query results
interface User {
  // Define properties based on your table structure
  id: number;
  firstname: string;
  lastname: string;
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

export const createUser = async (req: Request, res: Response) => {
  try {
    
    // default static values that will be overwritten by the html form's data
    const { 
      firstName = 'defaultFirstName', 
      lastName = 'defaultLastName', 
      email = 'default.test@gmail.com', 
      password = 'defaultPassword' 
    } = req.body;

    // Query using html form's data to create a user
    const [rows]: Array<User> = await db.execute('INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)', [firstName, lastName, email, password]);
    console.log('rows', rows);
    res.json([rows]); // Send a JSON response with the newly created user

  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' }); // Send a 500 Internal Server Error response
  }
};

export const createUserRest = async (req: Request, res: Response) => {
  // default static values that will be overwritten by the html form's data
  const { firstName, lastName, email, password } = req.body;

  try {
    // Query using html form's data to create a user
    const [rows]: Array<User> = await db.execute('INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)', [firstName, lastName, email, password]);
    console.log('rows', rows);
    res.json([rows]); // Send a JSON response with the newly created user

  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' }); // Send a 500 Internal Server Error response
  }
};



  