import express from 'express';
import cors from 'cors';
import "dotenv/config";
import pool from './config/pgDatabase.js';
import createUserTable from './models/userModel.js';
import createTranslationTable from './models/translationModel.js';


// Initializing the app
const app = express();
const PORT = process.env.PORT || 4000;

// Creating datbase tables
await createUserTable(pool);
await createTranslationTable(pool);

// Middleware
app.use(cors());
app.use(express.json());

// Sample route
app.get('/', (req, res) => {
  res.send('SOW Backend Server is running...');
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});