// server.js
//Install express server
import express, { static } from "express";
import { createServer } from "http";
import { join } from "path";
const app = express();
// Serve only the static files from the dist directory
app.use(static(__dirname + '/dist'));
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist/index.html'));
});
const port = process.env.PORT || 8080;
app.set(port);
const server = createServer(app);
server.listen(port, () => console.log("Runing"));