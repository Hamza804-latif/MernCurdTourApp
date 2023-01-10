import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";

const port = 5000;
const app = express();
app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/tour-app")
  .then(() => {
    app.listen(port, () => console.log("server is running on " + port));
  })
  .catch((err) => {
    console.log(`${err} could not connect`);
  });
