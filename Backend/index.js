const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

const app = express();
connectToMongo();

const port = process.env.PORT || 5001;

// CORS configuration
const corsOptions = {
  origin: 'https://secret-script-eight.vercel.app', // Allow requests only from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
};

app.use(cors(corsOptions)); // Use cors middleware

app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
