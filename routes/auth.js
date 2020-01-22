const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const College = require('../models/College');
const User = require('../models/User');
const Directorate = require('../models/Directorate');


// @router   GET api/auth/:id
// @desc     Get logged in account
// @access   Private
router.get('/:id', auth, async(req, res) => {
    if (req.params.id === '1'){
        try {
            const college = await College.findById(req.college.id).select('-password');
            res.json(college);
    
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server Error!');
        }
    }
    else if (req.params.id === '2'){
        try {
            const user = await User.findById(req.user.id).select('-password');
            res.json(user);
            
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server Error!');
        }
    }
    else{
        try {
            const directorate = await Directorate.findById(req.directorate.id).select('-password');
            res.json(directorate);
    
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server Error!');
        }
    }
});

// @router   POST api/auth/:id
// @desc     Auth account & get token (login)
// @access   Public
router.post('/:id',  [
        check('email', 'Please enter a valid email!').isEmail(),
        check('password', 'Please enter your password!').exists()
    ], 
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array()});
        }
        const { email, password } = req.body;

        let db = '';
        if (req.params.id === '2'){
            db = User;
        }
        else if (req.params.id === '3'){
            db = Directorate;
        }
        else{
            db = College;
        }
        try {
            const account = await db.findOne({ email });
            if(!account){
                return res.status(400).json({ msg: 'Invalid Credentials!' });
            }
            const isMatch = await bcrypt.compare(password, account.password);
            if(!isMatch){
                return res.status(400).json({ msg: 'Invalid Credentials!' });
            }
            let payload = '';
            if (req.params.id === '2'){
                payload = {
                    user: {
                        id: account.id
                    }
                }
            }
            else if (req.params.id === '3'){
                payload = {
                    directorate: {
                        id: account.id
                    }
                }
            }
            else{
                payload = {
                    college: {
                        id: account.id
                    }
                }
            }
            
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

module.exports = router;