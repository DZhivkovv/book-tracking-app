import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import authRouter from './routes/auth.routes.js';
import { checkEnvVariable } from './utils/utils.js';
import { dbConnect } from './core/db.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/auth',authRouter); // Use the authentication routes defined in auth.routes.js

const port = process.env.PORT;// Get the port variable from the .env file
checkEnvVariable('PORT');// Check if a port variable exists in the .env file   

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
}).on('error', (error) => {
    console.error(`Server failed to start: ${error}`);
});

const db_url = process.env.DB_URL;// Get the database url variable from the .env file
checkEnvVariable('DB_URL');
dbConnect(db_url);// Connect to the database
