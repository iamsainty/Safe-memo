const User=require('../models/User')
const express=require('express');
const router=express.Router();
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_SECRET="hellosainty";

router.post('/createuser',[
    body('name', 'Enter a valid name').isLength({min: 5}),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid password').isLength({min: 5}), 
],async (req, res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    try {
        let user= await User.findOne({email: req.body.email});
        if(user){
            return res.status(400).json({ error: "E-mail already exists" })
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

        const jwtdata=jwt.sign(data, JWT_SECRET)
        console.log(jwtdata)
        res.json(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occured");
    }
})
module.exports=(router)