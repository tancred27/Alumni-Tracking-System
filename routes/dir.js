const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const College = require('../models/College');
const Dir = require('../models/Directorate');

// @router   POST api/dir
// @desc     Add The Directorate (reg)
// @access   Public
router.post('/', 
    [
        check('email', 'Please enter the email!').not().isEmpty(),
        check('password','Please enter the password!').isLength({min:4})
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array()});
        } 
        
        const { email, password } = req.body;
    
        try {
            let dir = await Dir.findOne({ email });
            if(dir){
                return res.status(400).json({ msg: 'Directorate is already added!' })
            }

            directorate = new Dir({
                email,
                password
            });

            const salt = await bcrypt.genSalt(10);
            directorate.password = await bcrypt.hash(password, salt);
            await directorate.save();

            const payload = {
                directorate: {
                    id: directorate.id
                }
            };
            
            jwt.sign(payload, config.get('jwtSecret'), {
                expiresIn: 86400
            }, (err, token) => {
                if(err) throw err;
                res.json({ token });
            });


        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server Error!');
        }
    }
);

// @router   GET api/dir
// @desc     Get list of colleges
// @access   Private
router.get('/', auth, async(req, res) => {
    try {
        const colleges = await College.find();
        res.json(colleges);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error!');
    }
});

module.exports = router;