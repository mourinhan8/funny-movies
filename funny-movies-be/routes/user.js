const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth")

const router = express.Router();

router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).json({message: "please input email"});
    }

    if (!password) {
        return res.status(400).json({message: "please input password"});
    }

    let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ message: 'User already exists' });
      }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ email, password: hashedPassword });

    try {
        await newUser.save();
        return res
            .status(201)
            .json({
                message: "success", 
                user: newUser._id, 
            });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).json({message: "please input email"});
    }

    if (!password) {
        return res.status(400).json({message: "please input password"});
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({message: "wrong email or password"});
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(404).json({message: "wrong email or password"});
        }
        return res.status(200).json({
            data: "success",
            token: jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

router.get('/profile', auth, async (req, res) => {
    const userId = req.userId;
    try {
        const user = await User.findById(userId);
        return res.status(200).json({
            id: user._id,
            email: user.email,
            likedMovies: user.likedMovies || [],
            dislikedMovies: user.dislikedMovies || [],
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;
