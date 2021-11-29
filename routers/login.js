const express = require('express');
const {check, validationResult} = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('./models/users');

const router = express.Router();

router.post('/signup', [
    check("username", "Please enter a vaild username!")
    .not()
    .isEmpty(),
    check("email", "Please enter a vaild email!").isEmail(),
    check("password", "Please enter a vaild passowrd!").isLength({
        min:6
    })],
    async(req, res)=>{
        const errors = validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({
                errors: errors.array()
            })
        }

        const {username, email, password} = req.body;
        try{
            let user = await user.findOne({email});
            if(user){
                return res.status(400).json({
                    msg:"User already exist"
                })
            }
            user = new user({
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
                    expiresIn:10000
                },
                (err, token) =>{
                    if(err) throw err;
                    res.status(200).json({token});
                }

            )

        }catch(e){
            console.log(e.message);
            res.status(500).send("Error in saving!")
        }
    }
);

module.exports = router