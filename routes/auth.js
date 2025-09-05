import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import express from "express";
import User from "../models/User.js";
const router = express.Router();

//! in memory token blacklist 
let tokenBlacklist = []; // toke added here afetr logout

// =========================
//! signup User (/signup)
// =========================
router.post("/signup",async (req,res)=> {
    try {
        const {name, email, password} = req.body;

        //! Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }
          
        //! Check if user exits
        const existingUser = await User.findOne({ email });
        if(existingUser) return res.status(400).json({msg: "user already exits"});

        //! HasPassword
        const saltRounds = 10;
        const HasPassword = await bcrypt.hash(password, saltRounds);
        //! password save with the hasshpassword

        //! Create new user with hashed password
        const newUser =  new User({
            name,
            email,
            password: HasPassword
        });
        await newUser.save();

        return res.status(201).json({
            message: "User created successfully",
            user: {
              id: newUser._id,
              name: newUser.name,
              email: newUser.email
            }
        });
    }catch(error) {
        return res.status(500).json({ error: error.message });
    }
});

// =========================
//! Login User (/Login)
// =========================

router.post("/login",async (req,res)=> {
    try {
        const {name, email, password} = req.body;

        //! Validate input
        if (!email || !password) {
            return res.status(400).json({ error: "Email and Password are required" });
        }
          
        //! Check if user exits
        const user = await User.findOne({ email });
        if(!user) return res.status(400).json({msg: "user not found"});

        //! Compare password with HasPassword
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({msg: "invalid password"});

        //! Generate JWT token
        const token = jwt.sign(
            //payload
            {id: user._id, email: user.email},
            //Seacrate key
            process.env.JWT_SECRET || "mySuperSecretKey123@!!",
            //option
            {expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
        )

        return res.status(201).json({
            message: "Login successfully",
            user: {
              id: user._id,
              name: user.name,
              email: user.email
            },
            token
        });
    }catch(error) {
        return res.status(500).json({ error: error.message });
    }
});

// =========================
//! Logout User (/logout)
// =========================

router.post("/logout", (req, res) => {
    // Get token from Authorization header
    const token = req.headers["authorization"]?.split(" ")[1];

    //Added token from blacklist
    tokenBlacklist.push(token);

    //Send success response
    return res.json({msg : "Logged out successfully"})

});

// =========================
//! Middleware to protect routes
// =========================

export const verifyToken = (req, res, next) => {
    //get token
    const token = req.headers["authorization"]?.split(" ")[1];
    if(!token) return res.status(401).json({msg: "No token provided"});

    //Check if token is blacklisted
    if(tokenBlacklist.includes(token)) {
        return res.status(401).json({msg: "Token has been logged out"});
    }

    //verify JWT token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(error) {
        return res.status(401).json({ msg: "Invalid token" });
    }

}

export default router;
