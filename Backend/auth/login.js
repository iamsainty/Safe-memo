// login.js
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const User = require('../models/User');

const JWT_SECRET = "hellosainty";

router.post('/', [
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

module.exports = router;
