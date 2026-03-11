// config/db.ts
// database configuration
import mysql from 'mysql2/promise';

// use 'db' when running docker container, otherwise use 'localhost'
const DB_HOST = process.env.DB_HOST == 'production' ? 'db' : 'localhost';


export const dbConfig = {
  host: DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

export const db = mysql.createPool(dbConfig);
