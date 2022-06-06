import express from "express";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import colors from "colors";
import path from "path";
import cors from "cors";

import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import artistRoutes from "./routes/artistRoute.js";
import songRoutes from "./routes/songRoute.js";

dotenv.config();
connectDB();

const app = express(); // main thing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json()); // to accept json data
app.use(express.static('./uploads'))


//apis
app.use("/api/artist", artistRoutes);
app.use("/api/song", songRoutes);


// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}..`.yellow
      .bold
  )
);
