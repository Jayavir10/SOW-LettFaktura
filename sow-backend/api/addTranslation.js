import express from 'express';
import pool from '../config/pgDatabase.js';

const translationRouter = express.Router();

translationRouter.post('/', async (req, res) => {
    
    try {

        const { label, lang, value } = req.body;

        if (!label || !lang || !value) {
            return res.json({ success: false, message: 'Please provide all required fields' });
        }

        // Query for adding or updating translation
        const insertQuery = (`
            INSERT INTO translations (label, lang, value)
            VALUES ($1, $2, $3)
            ON CONFLICT (label, lang)
            DO UPDATE SET value = EXCLUDED.value;
        `);

        // Executing the query
        await pool.query(insertQuery, [label, lang, value]);

        res.json({ success: true, message: 'Translation added/updated successfully' });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }

});

export default translationRouter;


