import mongoose from 'mongoose';
import dotenv from 'dotenv';

export async function dbConnect(db_url){
    try{
        const connection = await mongoose.connect(db_url); // Connect to the database
        console.log(`Successful connection to the database`)   
        return connection
    } catch (error){
        console.error('Error connecting to the database:', error);
        throw error
    }
}