const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const Nexmo = require('nexmo');
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

// @router   PUT api/dir
// @desc     Send Email to a user
// @access   Private
router.put('/', auth, async(req, res) => {
    try {

        const recipient = req.body.email;
        let sub = req.body.subject;
        let message = req.body.text;
        var transporter = nodemailer.createTransport({
        host : 'webmail.tanc.tk',
        auth: {
            user: 'tancred@tanc.tk',
            pass: '9JmtVjm_Gjr39rdj'
        }
        });

        var mailOptions = {
        from: 'tancred@tanc.tk',
        to: recipient,
        subject: sub,
        text: message
        };

        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            res.send(error);
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.send(info.response);
        }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error!');
    }
});

// @router   PUT api/dir/1
// @desc     Send SMS to user
// @access   Private
router.put('/1', async(req, res) => {
    try {

       const recipient = req.body.to;
       const message = req.body.text;

        const nexmo = new Nexmo({
        apiKey: '537ad656',
        apiSecret: 'rAqNo7LisoVIb3IE'
        });

        const from = 'Nexmo';
        const to = "91"+recipient;
        const text = message;

        nexmo.message.sendSms(from, to, text);
        res.send('done')
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error!');
    }
});

module.exports = router;