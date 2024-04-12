const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/notevault';

const connectToMongo = () => {
    mongoose.connect(mongoURI)
        .then(() => {
            console.log("Connection successful");
        })
        .catch((err) => {
            console.error("Error connecting to MongoDB:", err);
        });
};

module.exports = connectToMongo;