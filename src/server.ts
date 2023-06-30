import "dotenv/config";
import express from "express";
import cors from "cors";
import corsOptions from "./configs/corsOptions.ts"
import cookieParser from "cookie-parser"
import mongoose from "mongoose";
import connectDB from "./configs/dbConn.ts";
import credentials from "./middlewares/credentials.ts"

const app = express();

// Connect to MongoDB
connectDB();

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials)

// Cross Origin Resource Sharing
app.use(cors(corsOptions))

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }))

// built-in middleware for json
app.use(express.json());

// middleware for cookies
app.use(cookieParser())

// ROTAS

// Start
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
});