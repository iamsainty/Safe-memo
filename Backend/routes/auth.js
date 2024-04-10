const User=require('../models/User')
const express=require('express');
const router=express.Router();
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET="hellosainty";


//creating new user 
router.post('/createuser',[
    body('name', 'Enter a valid name').isLength({min: 5}),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid password').isLength({min: 5}), 
],async (req, res)=>{
    let success=false;
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success, errors: errors.array()})
    }
    try {
        let user= await User.findOne({email: req.body.email});
        if(user){
            return res.status(400).json({ success, error: "E-mail already exists" })
        }

        const salt=await bcrypt.genSalt(10);
        const secpass=await bcrypt.hash(req.body.password, salt)
        user=await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secpass
        })

        const data={
            user: {
                id:user.id
            }
        }

        const authtoken=jwt.sign(data, JWT_SECRET)
        console.log(authtoken)
        success=true;
        res.json({success, authtoken})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occured");
    }
})


//login a user 
router.post('/login',[
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid password').isLength({min: 5}), 
],async (req, res)=>{
    let success=false;
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {email, password} = req.body;

    try {
        let user=await User.findOne({email});
        if(!user){
            return res.status(400).json({success, error: "Email does not exist"})
        }

        const checkpass=await bcrypt.compare(password, user.password);
        if(!checkpass){
            return res.status(400).json({success, error: "Password did not matched"})
        }


        const data={
            user: {
                id:user.id
            }
        }

        const authtoken=jwt.sign(data, JWT_SECRET)
        success=true;
        res.send({success, authtoken})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occured");
    }
})

//get user details
router.post('/getuser', fetchuser, async (req, res)=>{
    try {
        const userid=req.user.id;
        const user= await User.findById(userid).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occured");
    }
})


module.exports=(router)