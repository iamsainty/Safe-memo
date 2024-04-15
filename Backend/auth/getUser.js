// getUser.js
const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const User = require('../models/User');

router.post('/', fetchuser, async (req, res) => {
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
