// auth.js
const express = require('express');
const router = express.Router();
const createUserRouter = require('./auth/createUser');
const loginRouter = require('./auth/login');
const getUserRouter = require('./auth/getUser');

router.use('/createuser', createUserRouter);
router.use('/login', loginRouter);
router.use('/getuser', getUserRouter);

module.exports = router;
