const express = require("express");
const router = express.Router();
const { body, query, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "Umangisagoodboy";

// Importing User Model
const User = require("../models/Users");

router.use(express.json());

// ROUTE 1 : CREATE a user uaing POST: "api/auth/createuser" , No auth required
router.post(
  "/createuser",
  body("name", "Enter a valid name").isLength({ min: 3 }),
  body("email", "Enter a Valid email").isEmail(),
  body("password", "Password must be atleast 5 characters").isLength({
    min: 5,
  }),

  async (req, res) => {
    console.log("/api/auth");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    } else {
      // Check weather user with this email exists already

      try {
        let user = await User.findOne({ email: req.body.email });

        // console.log(user);

        if (user) {
          res
            .status(400)
            .json({ error: "Sorry user with this email already exists" });
        } else {
          var salt = await bcrypt.genSalt(10);

          let secPass = await bcrypt.hash(req.body.password, salt);

          user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
          });

          const data = {
            user: {
              id: user.id,
            },
          };

          const authToken = jwt.sign(data, JWT_SECRET);
          console.log(authToken);

          res.json({ authToken });
        }
      } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal Server Error");
      }
    }
  }
);

// Route 2 : Login a user using POST: "api/auth/login" , No auth required

router.post(
  "/login",
  body("email", "Enter a Valid email").isEmail(),
  body("password", "Password can not be blank").exists(),
  async (req, res) => {
    console.log("/Login");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    } else {
      // Check weather user with this email exists already
      try {
        let { email, password } = req.body;
        console.log("email = " + email);

        let user = await User.findOne({ email });
        console.log(user);

        if (user == null) {
          res
            .status(400)
            .json({ error: "Please try to connect with correct credentials" });
        } else {
          const passwordCompare = await bcrypt.compare(password, user.password);
          console.log(passwordCompare);

          if (!passwordCompare) {
            res
              .status(400)
              .json({
                error: "Please try to connect with correct credentials",
              });
          } else {
            const data = {
              user: {
                id: user.id,
              },
            };

            const authToken = jwt.sign(data, JWT_SECRET);
            console.log(authToken);

            res.json({ authToken });
          }
        }
      } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal Server Error");
      }
    }
  }
);

// ROUTE 3: Get Logged in User Details using POST "/api/auth/getuser" Login Required

router.post("/getuser", fetchuser ,async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId);
    const user = await User.findById(userId).select("-password");
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
