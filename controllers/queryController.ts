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
    console.log('req.body', req.body);
    // default static values that will be overwritten by the html form's data
    const { firstName = 'testdefault', lastName = 'testdefault2', email = 'testdefault3', password = 'testdefault' } = req.body;
    
    // Query using html form's data to create a user
    const [rows]: Array<User> = await db.execute('INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)', [firstName, lastName, email, password]);
    res.json(rows);
    console.log('rows', rows);
    // Send a 201 response with the user creation user data
    res.status(201).json(rows);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' }); // Send a 500 Internal Server Error response
  }
};

// export const createUserQuery = async (
//   firstName: string, 
//   lastName: string, 
//   email: string, 
//   password: string
//   ) => {
//   try {
//     const [rows]: Array<User> = await db.execute('INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)', [firstName, lastName, email, password]);
//     // Assuming `db` is configured to interact with your database

//     // Handle successful user creation, e.g., return the created user or redirect
//   } catch (error) {
//     throw new Error('Error creating user:', error); // Rethrow for better error handling
//   }
// };

  