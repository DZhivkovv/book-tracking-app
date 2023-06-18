import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import authRouter from './routes/auth.routes.js';
import bookRouter from './routes/book.routes.js'
import { checkEnvVariable } from './utils/utils.js';
import { dbConnect } from './core/db.js';

dotenv.config();

const app = express();
const corsOptions = {
    origin: 'https://bookshelf-4fod.onrender.com',
    credentials: true,
    methods: ['OPTIONS', 'GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Depth', 'User-Agent', 'X-File-Size', 'X-Requested-With', 'If-Modified-Since', 'X-File-Name', 'Cache-Control', 'x-access-token'],
}

app.use(cors(corsOptions));
app.use(express.json());
app.use('/auth',authRouter); // Use the authentication routes defined in auth.routes.js
app.use('/books',bookRouter); // Use the routes for adding and removing books defined in book.routes.js

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
