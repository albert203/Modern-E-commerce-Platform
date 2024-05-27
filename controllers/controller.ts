import express, { Request, Response } from 'express';
// form validation and security
import Joi from 'joi';
import bcrypt from 'bcryptjs';
import db from '../index.ts';

// Define types for query results
interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

// GET ALL 
export const getAll = async (req: Request, res: Response) => {
  try {
    const [rows]: Array<User> = await db.execute('SELECT * FROM users');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Error connecting to database', details: error.message });
  }
};

// Create Joi schema for user input validation with custom error messages
const userSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .max(50)
    .messages({
      'any.required': 'First name is required.',
      'string.max': 'First name must be less than 50 characters.'
    }),
  lastName: Joi.string()
    .required()
    .max(50)
    .messages({
      'any.required': 'Last name is required.',
      'string.max': 'Last name must be less than 50 characters.'
    }),
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .messages({
      'any.required': 'Email is required.',
      'string.email': 'Email must be valid.'
    }),
  password: Joi.string()
    .required()
    .min(12)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/)
    .messages({
      'any.required': 'Password is required.',
      'string.min': 'Password must be at least 12 characters long.',
      'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.'
    }),
  confirmPassword: Joi.string()
    .required()
    .valid(Joi.ref('password'))
    .messages({
      'any.required': 'Confirm password is required.',
      'any.only': 'Passwords do not match.'
    })
});

const checkDuplicateEmail = async (email: any) => {
  try {
    console.log('email:', email);
    console.log("in checkDuplicateEmail function");
    const [rows]: Array<User> = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    console.log("rows:", rows);
    if (rows.length > 0) {
      console.log("rows.length > 0");
      return true;
    }
    
  } catch (error) {
    console.log("in checkDuplicateEmail function error");
    console.error('Error checking for duplicate email in the database:', error);
    throw new Error('Error checking for duplicate email in the database');
  }
};


export const createUserRest = async (req: Request, res: Response) => {
  try {
    // Validate user data
    const { error, value } = userSchema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((detail) => ({
        field: detail.context.key,
        message: detail.message,
      }));
      return res.status(400).json({ errors });
    }

    // Check for duplicate email
    const emailExists = await checkDuplicateEmail(value.email);
    if (emailExists) {
      console.log('emailExists is true');
      return res.status(400).json({ error: 'Email already exists' });
    }

    // BCRYPT HASHING
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(value.password, salt);

    // Insert user into the database
    await db.execute('INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)', [
      value.firstName,
      value.lastName,
      value.email,
      hashPassword
    ]);

    res.json({
      message: `User ${value.firstName} ${value.lastName} (${value.email}) created successfully!`,
      user: {
        firstName: value.firstName,
        lastName: value.lastName,
        email: value.email,
      },
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Unexpected server error occurred' });
  }
};



export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password){
    return res.status(400).json({
      error: 'Email and password are required'
    })
  } 

  try {
    const [rows]: Array<User> = await db.execute('SELECT * FROM users WHERE email = ?', [email]);

    if (rows.length === 0) {
      return res.status(401).json({
        error: 'Invalid email or password'
      });
    }

    const user = rows[0];

    // compares password from the request with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        error: 'Invalid email or password'
      });
    }

    req.session.user = {
      id: user.id,
      firstName: user.firstname,
      lastName: user.lastname,
      email: user.email
    };

    res.json({ message: 'Login Successful' });
  } catch (error) {
    console.error('Error during login', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// export const logoutUser = async (req: Request, res: Response) => {
//   req.session.destroy((err) => {
//     if (err) {
//       console.error('Error destroying session', err);
//       return res.status(500).json({ error: 'Internal server error' });
//     }
//     res.json({ message: 'Logout Successful' });
//   });
// };
