const express = require('express');
const router = express.Router();
const { body, query, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_SECRET = "Umangisagoodboy";

// Importing User Model
const User = require('../models/Users');

router.use(express.json());

// CREATE a user uaing POST: "api/auth/createuser" , No auth required
router.post('/createuser', 
    body('name','Enter a valid name').isLength({min:3}),
    body('email', 'Enter a Valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({min:5})

, async (req,res) => {
    console.log("/api/auth");
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }else{
        // Check weather user with this email exists already

        try{
            let user = await User.findOne({email:req.body.email});

            // console.log(user);
    
            if(user){
                res.status(400).json({error: "Sorry user with this email already exists"});
            }else{

               var salt = await bcrypt.genSalt(10);
               
                let secPass = await bcrypt.hash(req.body.password, salt);

                    user = await User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: secPass
                });

                const data = {
                    user: {
                        id: user.id
                    }
                }

                const authToken = jwt.sign(data, JWT_SECRET);
                console.log(authToken);
    
                res.json({authToken});
            }

        }catch(err){
            console.log(err.message);
            res.status(500).send("Some Error Occured");
        }
        
    }    
});

module.exports = router;