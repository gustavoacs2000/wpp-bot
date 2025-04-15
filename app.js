import dotenv from "dotenv";
import express, { static as serveStatic } from "express";
import { join } from "path";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import path from "path";

const app = express();
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(serveStatic(join(__dirname, "public")));
app.set("view engine", "ejs");

// Routes
import indexRoutes from "./routes/index.js";
app.use("/", indexRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
