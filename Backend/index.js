const express = require('express');
const connectToMongo = require('./db');
const cors = require('cors');

connectToMongo();

const app = express();
const port = process.env.PORT || 5001;

app.use(express.json()); // Middleware for parsing JSON bodies
app.use(cors()); // Add the cors middleware to allow all origins

const authRouter = require('./routes/auth');
const notesRouter = require('./routes/notes');

// Routes
app.use('/', (req, res)=>{
  res.json( {message: "Welcome to the Notes API"} );
});
app.use('/api/auth', authRouter);
app.use('/api/notes', notesRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
