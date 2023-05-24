const express = require("express");
const app = express();

const data = require("./data.json");

function decodeChapters(input) {
  let arr = [];
  while (input > 0) {
    arr.push(input % 2);
    input = input >> 1;
  }
  return arr;
}

// GET request handler
app.get("/example", (req, res) => {
  const queryParam = req.query.code;

  let chapters = decodeChapters(Number(req.query.code));

  let vocabArr = [];

  for (let ch in chapters)
    if (chapters[ch]) for (word of data[ch]) vocabArr.unshift(word);

  var item = vocabArr[Math.floor(Math.random() * vocabArr.length)];

  res.send(item);
});

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
