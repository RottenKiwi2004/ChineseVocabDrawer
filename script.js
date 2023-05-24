// Get the canvas element
const canvas = document.getElementById("canvas");

// Get the 2D drawing context
const context = canvas.getContext("2d");

// Request code for vocab
let code = 0;
const totalChapter = 2;
let currentWord, currentPinyin, currentChinese;
let showPinyin = false,
  showChinese = false;

adjustCanvasSize();
clearCanvas();

// Variables to store current position and stroke size
let currentX = 0;
let currentY = 0;
let isDrawing = false;
let strokeSize = 10;

// Event listeners for mouse events
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);

function startDrawing(event) {
  isDrawing = true;
  currentX = event.clientX - canvas.offsetLeft;
  currentY = event.clientY - canvas.offsetTop;
}

function draw(event) {
  if (!isDrawing) return;
  const x = event.clientX - canvas.offsetLeft;
  const y = event.clientY - canvas.offsetTop;

  context.beginPath();
  context.moveTo(currentX, currentY);
  context.lineTo(x, y);
  context.lineWidth = strokeSize; // Set the stroke size
  context.strokeStyle = "#6f7f9a";
  context.stroke();

  currentX = x;
  currentY = y;
}

function stopDrawing() {
  isDrawing = false;
}

function changeStrokeSize(size) {
  strokeSize = size;
}

function adjustCanvasSize() {
  let h = window.innerHeight - 6;
  canvas.setAttribute("width", `${h}`);
  canvas.setAttribute("height", `${h}`);
}

function clearCanvas() {
  context.fillStyle = "#21262e";
  context.fillRect(0, 0, canvas.width, canvas.height);
}

function encodeChapters(chapter, state) {
  let mask = 1 << --chapter;
  code = (code & ~mask) | ((state ? 1 : 0) << chapter);

  if (code == 0) code = (1 << totalChapter) - 1;
}

function nextWord() {
  fetch(`/vocab?code=${code}`)
    .then((res) => res.json())
    .then((data) => {
      currentWord = data[0];
      currentPinyin = data[1];
      currentChinese = data[2];
      showChinese = true;
      showPinyin = true;
      toggleChinese();
      togglePinyin();
      document.querySelector("#vocab").textContent = currentWord;
      document.querySelector("#pinyin").textContent = currentPinyin;
      document.querySelector("#chinese").textContent = currentChinese;
      clearCanvas();
    });
}

function togglePinyin() {
  showPinyin = !showPinyin;
  document.querySelector("#pinyin").style.display = showPinyin
    ? "inline"
    : "none";
}

function toggleChinese() {
  showChinese = !showChinese;
  document.querySelector("#chinese").style.display = showChinese
    ? "inline"
    : "none";
}

window.addEventListener("resize", adjustCanvasSize);
window.addEventListener("keypress", (e) => {
  switch (e.key) {
    case "E":
    case "e":
      clearCanvas();
      break;
    case "S":
    case "s":
      togglePinyin();
      break;
    case "D":
    case "d":
      toggleChinese();
      break;
    case "F":
    case "f":
      nextWord();
      break;
    default:
      return;
  }
});
