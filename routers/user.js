const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/signup', async (req, res) => {
    res.render('user_signup', {layout:'layouts/master_login'})
});
router.post('/signup', [
    check("username", "Please enter a vaild username!")
        .not()
        .isEmpty(),
    check("email", "Please enter a vaild email!").isEmail(),
    check("password", "Please enter a vaild passowrd!").isLength({
        min: 6
    })],
    async (req, res) => {
        console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }
        const { username, email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({
                    msg: "User already exist"
                })
            }
            user = new User({
                username,
                email,
                password
            });
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            };
            jwt.sign(
                payload,
                "randomString",
                {
                    expiresIn: 10000
                },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).render('dashboard', { token, layout:false });
                }
            )
        } catch (e) {
            console.log(e.message);
            res.status(500).send("Error in saving!")
        }
    }
);
router.get('/signin', async (req, res) => {
    res.render('user_signin', {layout:'layouts/master_login'})
});



router.post('/signin', [
    check("email", "Please enter a vaild email!").isEmail(),
    check("password", "Please enter a vaild password!").isLength({
        min: 6
    })
],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        const {email, password} = req.body;
        try{
            let user = await User.findOne({email});
            if(!user){
                return res.status(400).json({
                    message:"User not exist!"
                })
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                return res.status(400).json({
                    message:"Incorrect password!"
                })
            }

            const payload = {
                user:{
                    id: user.id
                }
            }

            jwt.sign(
                payload,
                "randomString",
                {expiresIn:3600},
                (err, token)=>{
                    if(err) throw err;   
                    res.set('token',token)                
                    res.status(200).render('user_dashboard', {token});                    
                }
            )

        }catch(e){
            console.log(e);
            res.status(500).json({
                message:"Error"
            })
        }
    }
);

router.get('/dashboard', auth, async(req, res)=>{
    res.status(200).render('user_dashboard', {token});
})

module.exports = router;