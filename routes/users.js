const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Notification=require('../models/Notification');

// @router   POST api/users
// @desc     Register a user
// @access   Public

router.post('/', 
    [
        check('name', 'Please enter a name!').not().isEmpty(),
        check('email', 'Please enter a valid email!').isEmail(),
        check('password', 'Password length must be at least 5 characters!').isLength({min:5})
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array()});
        } 
        
        const { name, email, dob, phone, company, college, branch, year, info, password } = req.body;

    
        try {
            let user = await User.findOne({ email });
            if(user){
                return res.status(400).json({ msg: 'A user already exists with the specified email ID!'})
            }

            user = new User({
                name,
                email,
                dob,
                phone,
                college,
                company,
                branch,
                year,
                info,
                password
            });

            const notf=new Notification({
                id:user.id
            })
           
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();
            await notf.save();

            const payload = {
                user: {
                    id: user.id
                }
            };
            
            jwt.sign(payload, config.get('jwtSecret'), {
                expiresIn: 86400
            }, (err, token) => {
                if(err) throw err;
                res.json({ token });
            });

        } catch (error) {
            console.log(error);
            res.status(500).send('Server Error!');
        }
    }
);

// @router   GET api/users/:id
// @desc     get authenticated users
// @access   Private
router.get('/auth', auth, async(req, res) => {
    try {
        const users = await User.find({authenticated:true});
        res.json(users)
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error!');
    }
});

// @router   GET api/users/:id
// @desc     Access any profile
// @access   Private
router.get('/:id', auth, async(req, res) => {
    try {
        const user = await User.findOne({_id: req.params.id});
        res.json(user)
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error!');
    }
});



// @router   PUT api/users
// @desc     Update a user
// @access   Private
router.put('/', auth, async (req, res) => {

    let user = await User.findById(req.user.id);

    if(!user) return res.status(404).json({ msg: 'User not found' }); 

    const { email, company, info, password } = req.body;

    // Build User Object:
    const userFields = {};
    if(email) userFields.email = email;
    if(company) userFields.company = company;
    if(info) userFields.info = info;
    if(password) userFields.type = password;
    
    try {   
        user = await User.findByIdAndUpdate(
            user._id ,
            { $set: userFields },
            { new: true});
        res.json(user);

    } catch (error) {
        console.log(error.msg);
        res.status(500).send('Server Error!');
    }
});

module.exports = router;