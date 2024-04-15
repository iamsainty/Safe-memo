// createUser.js
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const User = require('../models/User');

const JWT_SECRET = "hellosainty";

router.post('/', [
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

module.exports = router;
