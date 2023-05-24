const express = require("express");
const app = express();

const data = require("./data.json");
const path = require("path");

function decodeChapters(input) {
  let arr = [];
  while (input > 0) {
    arr.push(input % 2);
    input = input >> 1;
  }
  return arr;
}

// GET request handler
app.get("/vocab", (req, res) => {
  const queryParam = req.query.code;

  let chapters = decodeChapters(Number(req.query.code));

  let vocabArr = [];

  for (let ch in chapters)
    if (chapters[ch]) for (word of data[ch]) vocabArr.unshift(word);

  var item = vocabArr[Math.floor(Math.random() * vocabArr.length)];

  res.send(item);
});

app.use(express.static(path.join(__dirname)));

// GET request handler for HTML file
app.get("/html", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// GET request handler for CSS file
app.get("/css", (req, res) => {
  res.sendFile(path.join(__dirname, "style.css"));
});

// GET request handler for JavaScript file
app.get("/js", (req, res) => {
  res.sendFile(path.join(__dirname, "script.js"));
});

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
