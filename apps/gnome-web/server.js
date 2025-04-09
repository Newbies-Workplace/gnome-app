import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import fallback from "express-history-api-fallback";

const __filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(__filename);

const app = express();

// config stuff
const publicDir = path.join(_dirname, "dist");
const port = process.env.SERVER_PORT || 8080;

// fallback to index.html
app.use(express.static(publicDir));
app.use(fallback(path.join(publicDir, "index.html")));

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
