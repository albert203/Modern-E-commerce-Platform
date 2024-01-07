import express, { Request, Response } from 'express';
import notesRouter from './routes/notesRoutes';
// import queryRouter from './routes/queryRoutes';


// to post things we need to use middleware
// if we do not write this we cannot get the req.body
const app = express();
app.use(express.json());
const port = Bun.env.DB_PORT || 8000;

app.use('/api/notes', notesRouter);
// app.use('/api/query', queryRouter);

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});

/////////////////////////////////////////////////////////////////////////////////////

// GET REQUEST TEST

// app.get('/', (req: Request, res: Response) => {
//   // res.status(200) -> good connection
//   res.status(200).json({
//     message: 'hello from express in BUN',
//     data: [],
//   });
// });

/////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////

// CREATE A SERVER

// const server = Bun.serve({
//   // DB_PORT in .env file,
//   // Bun.env.DB_PORT is the same as process.env.DB_PORT
//   port: Bun.env.DB_PORT || 8000,
//   fetch(req) {
//     const url = new URL(req.url);
//     if (url.pathname === "/") {
//       return new Response("Homepage");
//     }
//     if (url.pathname === "/json") {
//       const data = JSON.stringify({
//         status: 200,
//         message: "This is json data",
//       });
//       return new Response(data, {
//         headers: { "Content-Type": "application/json" },
//       });
//     }

//     if (url.pathname === "/file") {
//       return new Response(Bun.file("file.txt"));
//     }

//     if (url.pathname === "/blog") {
//       return new Response("<h1>Blog<h1>", {
//         status: 200,
//         headers: { "Content-Type": "text/html" },
//       });
//     }

//     // page not found response
//     return new Response("404");
//   },
// });

// console.log(`listening on port: ${server.port}`);

/////////////////////////////////////////////////////////////////////////////////////
