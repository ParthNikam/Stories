import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();


import postRoute from './routes/posts.js';




const app = express();
const PORT = process.env.PORT;
const DATABASE_URL = "mongodb://127.0.0.1/mystory";

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/posts', postRoute);


mongoose
  .connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
  )
  .catch((error) => console.log(error.message));



