const express = require("express");
const asyncHandler = require("express-async-handler")
const User = require("../Models/userModel")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")


// @desc get  users register
//@route get api/users/register
// @acces public

const registerUser = asyncHandler(async (req, res) => {

    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All Fields Are Mendatory")
    }

    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User is Exist")
    }


    //hash password
    const hashPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
        username, email, password: hashPassword
    });

    console.log(`user created ${user}`);
    if (user) {
        res.status(201).json({ _id: user.id, email: user.email })
    } else {
        res.status(400)
        throw new Error("User Data Not Valid")
    }
    res.json({ message: "Register the user" })
})


// @desc get  users login
//@route get api/users/login
// @acces public

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400)
        throw new Error("All Fields Are Mendatorty")
    }
    const user = await User.findOne({ email });

    //compare hash password
    if (user && (await bcrypt.compare(password, user.password))) {
        const accsssToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            },
        }, process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "150m" }
        )
        res.status(200).json({ accsssToken });

    } else {
        res.status(401)
        throw new Error("email or password is not valid")

    }
    // res.json({ message: "login the user" })
})


// @desc get  current info
//@route get api/users/current
// @acces private

const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user)
})

module.exports = { registerUser, loginUser, currentUser }