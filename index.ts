import express, { Request, Response} from 'express';
import session from 'express-session';
import path from 'path';
import { getAll, createUserRest, loginUser, authMiddleware, updateUserProfile } from './controllers/controller';
import mysql from 'mysql2/promise';


const port = 3000;

const db = mysql.createPool({
  host: Bun.env.DB_HOST,
  user: Bun.env.DB_USER,
  password: Bun.env.DB_PASS,
  database: Bun.env.DB_DATABASE,
});

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || 'secret_key',
  resave: false, // prevents unnecessary session updates.
  saveUninitialized: false, // Set to false to not save empty sessions
  cookie: { secure: false } // Set to 'true' in production for HTTPS to encrypt cookie data
});

// to post things we need to use middleware
// if we do not write this we cannot get the req.body
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public/views')); // Assuming your .ejs files are in 'public/views'

app.use(express.json());
app.use(sessionMiddleware);
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from 'public'

// this doesnt confirm the connection is working
app.get('/api/getall', getAll);
app.post('/api/signup', createUserRest);

// Log in an existing user and create a session
app.post('/api/login', loginUser);


// Render EJS templates
app.get('/profile', (req: Request, res: Response) => {
  if (req.session.user) {
    // Use the login user session data to render the profile page
    const user = req.session.user; 
    res.render('profile', { user });

  } else {
    return res.redirect('/signup'); // Redirect to login if session data is not available
  }

});

// Protect the /api/update-profile endpoint with authMiddleware
app.post('/api/update-profile', authMiddleware, updateUserProfile);

app.get('/home', (req: Request, res: Response) => {
  res.render('home');
});

app.get('/shop', (req: Request, res: Response) => {
  res.render('shop');
});

app.get('/signup', (req: Request, res: Response) => {
  res.render('signup');
});

// Add the authMiddleware to the routes that require authentication
app.get('/profile', authMiddleware, (req: Request, res: Response) => {
  if (req.session.user) {
    const user = req.session.user; 
    res.render('profile', { user });
  } else {
    return res.redirect('/signup');
  }
});

// Destroy the current session and log out the user
// app.get('api/logout', logoutUser);

// A protected route that can only be accessed by authenticated users
// app.get('/protected', isLoggedIn, (req, res) => {
//   res.json({ message: 'This is a protected route' });
// });

const server = app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
})

export default db;



