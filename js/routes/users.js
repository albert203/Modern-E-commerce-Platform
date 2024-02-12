// DEPENDENCIES
// console.log("users.js");
// import express from "express";
// import router from "express";
// import mysql from "mysql";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

const express = require("express");
// const router = express.Router();
const mysql = require("mysql");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const port = 3000;

app = express();

// DATABASE CONNECTION
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "anime_store",
});

// db.connect((err) => {
//   if (err) throw err;
//   console.log("Connected to the database");
// });

app.get("/", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log(result);
    }
  });
});

app.listen(port, function (err) {
  if (err) console.log("Error in server setup");
  console.log("Server listening on Port", port);
});
