import cors from "cors";
import express from "express";
import expressRateLimit from "express-rate-limit";
import fs from 'fs';
import path from 'path';
import catchAll from "./middlewares/catch-all";
import routeNotFound from './middlewares/routeNotFound';

const app = express();

// security DoS Attack: limits number of request from the same IP:
app.use(expressRateLimit({
    windowMs: 1000, //time limit
    max: 20 //max requests allowed in that time window
}));

app.use(express.json());
app.use(cors());

app.use(routeNotFound)

app.use(catchAll);

// // Test database connection
// async function testConnection() {
//     try {
//         await sequelize.authenticate();
//         console.log('✅ Database connection established successfully.');
//     } catch (error) {
//         console.error('❌ Unable to connect to database:', error);
//     }
// }

// app.listen(appConfig.port, async () => {
//     console.log(`🚀 Server running on port ${appConfig.port}`);
//     await testConnection();
// });


