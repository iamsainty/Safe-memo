// index.js

const express = require('express');
const connectToMongo = require('./db');
const cors = require('cors');
const authRouter = require('./routes/auth');
const notesRouter = require('./routes/notes');

// Connect to MongoDB
connectToMongo();

const app = express();
const port = process.env.PORT || 5001;

// CORS Configuration
const corsOptions = {
  origin: 'https://safe-memo.web.app', // Allow requests only from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Middleware for parsing JSON requests
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/notes', notesRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
