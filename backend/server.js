import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();// Load environment variables from .env file
import { checkEnvVariable } from './utils/utils.js';
import { dbConnect } from './core/db.js';

const app = express();
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

app.get('/', (request, response) => {
    response.send("Connected!")
});


