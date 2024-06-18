import mongoose from "mongoose";

import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 8080;
const DB = process.env.DATABASE;

// DB connection
mongoose
  .connect(DB)
  .then(() => console.log("DB connection successful 👋"))
  .catch((err) => console.log(err));

// Server connection
app.listen(PORT, () => console.log(`App running on port ${PORT}`));
