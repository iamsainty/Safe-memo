require('dotenv').config();

const mongoose = require('mongoose');
const mongoURI = process.env.mongodbURI;

const connectToMongo = () => {
    console.log("Connecting to MongoDB...");
    mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }) 
        .then(() => {
            console.log("Connection successful");
        })
        .catch((err) => {
            console.error("Error connecting to MongoDB:", err);
        });
};

module.exports = connectToMongo;
