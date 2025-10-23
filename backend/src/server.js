import express from "express";
import { ENV } from "./config/env.js";
import { connectDb } from "./config/db.js";
const app = express();

const PORT = ENV.PORT;
app.listen(PORT, () => {
  connectDb();
  console.log("Listening on port,", 3000);
});
