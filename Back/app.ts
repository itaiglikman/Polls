import cors from "cors";
import express from "express";
import expressRateLimit from "express-rate-limit";
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import catchAll from "./src/middlewares/catch-all";
import routeNotFound from './src/middlewares/routeNotFound';
import { Sequelize } from "sequelize";

// Load environment variables
dotenv.config();

const app = express();
export const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
export const USERNAME = process.env.DB_USERNAME || 'root';
export const PASSWORD = process.env.DB_PASSWORD || '';
export const DB_NAME = process.env.DB_NAME || 'polls_db';
export const HOST = process.env.DB_HOST || 'localhost';
export const MYSQL_PORT = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306;
export const sequelize = new Sequelize(`mysql://${USERNAME}:${PASSWORD}@${HOST}:${MYSQL_PORT}/${DB_NAME}`);

// security DoS Attack: limits number of request from the same IP:
app.use(expressRateLimit({
    windowMs: 1000, //time limit
    max: 20 //max requests allowed in that time window
}));

app.use(express.json());
app.use(cors());

app.use(routeNotFound)

app.use(catchAll);

// Test database connection
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connection established successfully.');
    } catch (error) {
        console.error('❌ Unable to connect to database:', error);
    }
}

app.listen(PORT, async () => {
    console.log(`🚀 Server running on port ${PORT}`);
    await testConnection();
});


