import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
