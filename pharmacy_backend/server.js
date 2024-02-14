import express from 'express';
import morgan from 'morgan';
import cors from 'cors'
import dotenv from 'dotenv';
import drugRoute from './routes/drugRoute.js'

dotenv.config();
import connectDb from './db.js';
// console.log(DrugRouter)

const PORT = process.env.PORT 
const server = express();

// middleware
server.use(express.json());
server.use(cors({origin: "http://localhost:5173"}));
server.use(morgan("dev"));
server.use('/api/drugs', drugRoute)



server.listen(PORT, (req, res) => {
    connectDb();
    console.log(`server is runnning on port ${PORT}`)
})