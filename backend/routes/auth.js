const express = require('express');
const router = express.Router();
const { body, query, validationResult } = require('express-validator');

// Importing User Model
const User = require('../models/Users');

router.use(express.json());

// CREATE a user uaing POST: "api/auth" , No auth required
router.post('/', 
    body('name','Enter a valid name').isLength({min:3}),
    body('email', 'Enter a Valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({min:5})

, (req,res) => {
    console.log("/api/auth");
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }else{
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }).then(user => res.json(user))
        .catch(err => {
            console.log(err);
            res.json({error: 'Please Enter Unique value for Email'});
        });

        // res.send("All Okay");
        
    }    
});

module.exports = router;