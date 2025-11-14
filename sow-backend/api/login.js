import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/pgDatabase.js';

const loginRouter = express.Router();

loginRouter.post('/', async (req, res) => {

    try {

        const { email, password } = req.body

        if (!email || !password) {
            return res.json({success: false, message: 'Please provide all required fields'})
        }

        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        const user = result.rows[0];

        if (!user) {
            return res.json({success: false, message: 'User does not exist'})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {
                expiresIn: '1d'
            })
            res.json({success: true, token})
        } else {
            res.json({success: false, message: 'Invalid credentials'})
        }
        
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }

});

export default loginRouter;
