const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const College = require("../models/College");

// @router   POST api/college
// @desc     Add a college
// @access   Public
router.post(
  "/",
  [check("name", "Please enter a name!").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let college = await College.findOne({ name });
      if (college) {
        return res.status(400).json({ msg: "College is already added!" });
      }

      college = new College({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      college.password = await bcrypt.hash(password, salt);
      await college.save();

      const payload = {
        college: {
          id: college.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 86400,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );

      // res.json(college);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error!");
    }
  }
);

// @router   GET api/college
// @desc     Get list of registered people for a college
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const college = await College.findOne({ _id: req.college.id });
    if (!college) {
      return res.status(404).json({ msg: "college found'nt " });
    }
    const alumni = await User.find({
      college: college.name,
      authenticated: false,
    });
    res.json(alumni);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error!");
  }
});

// @router   GET api/college/:id
// @desc     Get list of alumni for a college
// @access   Private
router.get("/:id", auth, async (req, res) => {
  try {
    const college = await College.findOne({ _id: req.params.id });
    const alumni = await User.find({
      college: college.name,
      authenticated: true,
    });
    res.json(alumni);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error!");
  }
});

// @router   PUT api/college/:id
// @desc     Update user profile/authenticate
// @access   Private
router.put("/:id", auth, async (req, res) => {
  //check if college exists
  const college = await College.findOne({ _id: req.college.id });
  if (!college) {
    return res.status(404).json({ msg: "college found'nt " });
  }

  //check if user belong to college
  let user = await User.findOne({ _id: req.params.id, college: college.name });
  if (!user) {
    return res.status(404).json({ msg: `User is not in ${college.name} ` });
  }

  try {
    user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { authenticated: true } },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error!");
  }
});

module.exports = router;
