const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const cors = require('cors');
const User = require('../models/User');

const JWT_SECRET = "hellosainty";

// CORS configuration
const corsOptions = {
    origin: 'https://safe-memo.web.app', // Allow requests only from this origin
    methods: ['POST'], // Allow POST requests
    allowedHeaders: ['Content-Type'], // Allow Content-Type header
};

// Handle preflight requests
router.options('*', cors(corsOptions));

// Apply CORS middleware to all routes in this router
router.use(cors(corsOptions));

// Creating new user
router.post('/createuser', [
    body('name', 'Enter a valid name').trim().isLength({ min: 1 }),
    body('username', 'Enter a valid username').trim().isLength({ min: 1 }),
    body('password', 'Password must be at least 5 characters long').isLength({ min: 5 }),
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    try {
        let user = await User.findOne({ username: req.body.username });
        if (user) {
            return res.status(400).json({ success, error: "Username already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            username: req.body.username,
            password: hashedPassword
        });

        const data = {
            user: {
                id: user.id
            }
        };

        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.header("Access-Control-Allow-Origin", "https://safe-memo.web.app");
        res.json({ success, authtoken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occurred");
    }
});

// Login a user 
router.post('/login', [
    body('username', 'Enter a valid username').trim().isLength({ min: 1 }),
    body('password', 'Password must be at least 5 characters long').isLength({ min: 5 }),
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
        let user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ success, error: "Username does not exist" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ success, error: "Password did not match" });
        }

        const data = {
            user: {
                id: user.id
            }
        };

        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.send({ success, authtoken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occurred");
    }
});

// Get user details
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userid = req.user.id;
        const user = await User.findById(userid).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occurred");
    }
});

module.exports = router;
