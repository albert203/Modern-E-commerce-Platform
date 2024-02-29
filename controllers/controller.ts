import express, { Request, Response } from 'express';
// form validation and security
import Joi, * as joi from 'joi';
import * as bcrypt from 'bcryptjs';
import db from '../index.ts';
import { hash } from 'bun';

// Define types for query results
interface User {
  // Define properties based on your table structure
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

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


// Works with postman /////////////////////

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


// Trying to get it to work with a RESTful API /////////////
export const createUserRest = async (req: Request, res: Response) => {

  // create validation using joi
  const schema = Joi.object({
    firstName: Joi.string()
      .required()
      .max(50),
    lastName: Joi.string()
      .required()
      .max(50),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string()
      .required()
      .min(12)
      .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{12,}$'))
      .error(new Error('Password must be at least 12 characters long and contain one lowercase letter, one uppercase letter, one number, and one special symbol.')),
    confirmPassword: Joi.string()
      .required()
      .valid(Joi.ref('password')) // ensure passwords match
      .error(new Error('Passwords do not match.'))
  });

  const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.message }); // Bad request with specific error message
    }

  // Hashing using bcrypt
  // Generate a random salt (recommended strength around 10)
  const saltRounds = 10;
  bcrypt.genSalt(saltRounds, async (err: any, salt: any) => {
    if (err) {
      console.error('Error generating salt', err);
      return res.status(500).json({ error: 'Failed to hash password' });
    }
  // Hash the password with the generated salt
  const hashPassword = await bcrypt.hash(value.password, salt);
  console.log('Hashed password:', hashPassword );
  const { firstName, lastName, email, password } = req.body;

  try {
    // Query using html form's data to create a user
    await db.execute('INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)', [
      value.firstName, 
      value.lastName, 
      value.email, 
      hashPassword
    ]); // Hashed password before storing
    
    res.json({
      message: `User ${firstName} ${lastName} (${email}) created successfully!`,
      user: {
        firstName,
        lastName,
        email,
        password
      },
    }); // Send a JSON response with the newly created user

    console.log({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    }); // Log specific data

  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' }); // Send a 500 Internal Server Error response
  }
})
}
