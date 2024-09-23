// Refactor all code
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const app = express();

app.use(cors());

const port = 5000;

const filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(filename);

app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/carrito", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.get("/productos", (req, res) => {
  res.sendFile(path.join(__dirname, "./", "database", "products.json"));
});

app.listen(port, () => {
  console.log(`se esta escuchando el puerto:${port}`);
});
