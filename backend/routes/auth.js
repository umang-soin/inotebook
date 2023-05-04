const express = require('express');
const router = express.Router();

// Importing User Model
const User = require('../models/Users');

router.get('/', (req,res) => {
    console.log(req.body);
    res.send("Api Auth");
});

// CREATE a user uaing POST: "api/auth" , No auth required
router.post('/', (req, res) => {

    console.log(req.body);
    const user = User(req.body);
    user.save();
    res.send("USer Saved");
})

module.exports = router;