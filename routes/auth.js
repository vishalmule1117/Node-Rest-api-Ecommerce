import bcrypt from "bcrypt";
import express from "express";
import User from "../models/User.js";

const router = express.Router();

//Register User
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

export default router;
