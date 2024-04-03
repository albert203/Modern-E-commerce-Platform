import express, { Request, Response } from 'express';
// form validation and security
import Joi, * as joi from 'joi';
import * as bcrypt from 'bcryptjs';
import db from '../index.ts';
import { error } from 'console';
import { abort } from 'process';

// Define types for query results
interface User {
  // Define properties based on your table structure
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

// GET ALL 
export const getAll = async (req: Request, res: Response) => {
  try {
    //an array of users
    const [rows]: Array<User> = await db.execute('SELECT * FROM users');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Error connecting to database', details: error.message });
  }
};

export const createUserRest = async (req: Request, res: Response) => {

  // create validation using joi
  const userSchema = Joi.object({
    firstName: Joi.string()
      .required()
      .max(50),
    lastName: Joi.string()
      .required()
      .max(50),
    email: Joi.string()
        .required()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string()
      .required()
      .min(12)
      .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{12,}$'))
      .error(new Error('Password must be at least 12 characters long and contain one lowercase letter, one uppercase letter, one number, and one special symbol.')),
    confirmPassword: Joi.string()
      .required()
      .valid(Joi.ref('password')) // ensure passwords match
      .error(new Error('Passwords do not match.')),
  });
  // Validate user data
  const { error, value } = userSchema.validate(req.body, { abortEarly: false }); //abort early set to false ensures that the validation doesnt stop on first error

  if (error) {
    // Handle validation errors regardless of field
    console.error(error);  // Log the entire validation error object
    
    // If there are details (i.e. specific errors), return them as an array
    if (error.details) {
      const errors = error.details.map((detail) => ({
        field: detail.context.key,
        message: detail.message,
      }));
      return res.status(400).json({ errors });
    } else {
      // Handle other unexpected errors
      console.error('Unexpected error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  // BCRYPT HASHING
  // Generate a random salt (recommended strength around 10)
  try {
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, async (err: any, salt: any) => {
      if (err) {
        console.error(`bcrypt Salt error: ${err}`);
        return res.status(500).json({ error: 'Failed to hash password' });
      }
      // Hash the password with the generated salt
      const hashPassword = await bcrypt.hash(value.password, salt);
      console.log('Hashed password:', hashPassword);

      try {
        // Query using html form's data to create a user
        await db.execute('INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)', 
        [
          value.firstName,
          value.lastName,
          value.email,
          hashPassword // Hashed password before storing
        ]);

        // Send a JSON response with the newly created user
        res.json({
          message: `User ${value.firstName} ${value.lastName} (${value.email}) created successfully!`,
          user: {
            firstName: value.firstName,
            lastName: value.lastName,
            email: value.email,
            hashPassword: hashPassword
          },
        });

      } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Failed to create user' }); // Internal server error
      }
    });
  } catch (error) {
    console.error('Error hashing password:', error);
    res.status(500).json({ error: 'Failed to hash password' }); // Internal server error
  }
};