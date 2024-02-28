import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import labRoute from './routes/labRoutes.js'


dotenv.config();
import connectDb from "./lab_db.js";


// access port from .env
const PORT = process.env.PORT;
const app = express();

// middleware
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5174"

}));
app.use(morgan("dev"));
app.use("/api/labs", labRoute);


app.listen(PORT, (req, res) => {
  connectDb();
  console.log(`app is runnning on port ${PORT}`);
});
