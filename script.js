// Get the canvas element
const canvas = document.getElementById("canvas");

// Get the 2D drawing context
const context = canvas.getContext("2d");

// Request code for vocab
const totalChapter = 6;
let code = (1 << totalChapter) - 1;
let currentWord, currentPinyin, currentChinese;
let showPinyin = false,
  showChinese = false;

let sequential = false;

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
canvas.addEventListener("pointerdown", startDrawing);
canvas.addEventListener("pointermove", draw);
canvas.addEventListener("pointerup", stopDrawing);
canvas.addEventListener("pointerout", stopDrawing);

// Event listeners for touch events
canvas.addEventListener("touchstart", handleTouchStart, { passive: false });
canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
canvas.addEventListener("touchend", stopDrawing);

function startDrawing(event) {
  isDrawing = true;
  setPosition(event);
}

function draw(event) {
  if (!isDrawing) return;
  event.preventDefault();
  const x = event.clientX - canvas.offsetLeft;
  const y = event.clientY - canvas.offsetTop;

  context.beginPath();
  context.moveTo(currentX, currentY);
  context.lineTo(x, y);
  context.lineWidth = strokeSize; // Set the stroke size
  context.lineCap = "round";
  context.strokeStyle = "#6f7f9a";
  context.stroke();

  setPosition(event);
}

// Function to set the current position
function setPosition(event) {
  const { clientX, clientY } = getCoordinates(event);
  currentX = clientX - canvas.offsetLeft;
  currentY = clientY - canvas.offsetTop;
}

// Function to get the coordinates based on event type
function getCoordinates(event) {
  let clientX, clientY;

  if (event.touches) {
    clientX = event.touches[0].clientX;
    clientY = event.touches[0].clientY;
  } else {
    clientX = event.clientX;
    clientY = event.clientY;
  }

  return { clientX, clientY };
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

function randomiseList(isRandom) {
  sequential = !isRandom;
}

function nextWord() {
  console.log(code);
  fetch(`/vocab?code=${code}${sequential ? "" : "&randomise=true"}`)
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

// Function to handle touchstart event and prevent default touch behavior
function handleTouchStart(event) {
  event.preventDefault();
}

// Function to handle touchmove event and prevent default touch behavior
function handleTouchMove(event) {
  event.preventDefault();
}
