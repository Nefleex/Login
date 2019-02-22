const express = require("express");
const path = require("path");
const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

app.use(express.static(path.join(__dirname, "/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

const port = 80;
app.listen(port);
