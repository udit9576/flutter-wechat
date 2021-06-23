const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const JWT_SECRET = "23456yt456ty7854#@$%^yuhB^%dtvu*(&T()*&Tvkjo8u76ftGV*6t"; 



const User = require("../models/user_model");


const router = express.Router();

router.post('/signUp', async(req, res) => {
    const username = req.body.username;
    const user = await User.findOne({
        username : username
    })
    if(user){
        return  res.json({
            status: "error",
            error: "User Already Exists",
        });
    }
    const name = req.body.name;
    const phone = req.body.phone;
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    try{
        const response = User.create({
            name: name,
            phone: phone,
            username: username,
            password: hashedPassword,
        })
        console.log("User Created", response);
        return res.sendStatus(201);
    }catch(err){
        return res.json({
            status: "error",
            error: "Service Unavailable"
        })
    }
});

router.post('/login', async(req, res) => {
    console.log("Incomming request")
    console.log(req.body);
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({
        username: username
    })
    if(!user){
        return  res.json({
            status: "error",
            error: "Invalid Username/Password"
        });
    }
    if(await bcrypt.compare(password, user.password)){
        const token = jwt.sign({username: username, id:user._id},  JWT_SECRET);
        console.log("Logged in")
        return res.json({
            status: "Logged in",
            token: token
        })
    }

    return  res.json({status: "error", error: "Invalid Username/Password"});

});


module.exports = router