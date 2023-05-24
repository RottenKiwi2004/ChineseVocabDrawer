// Get the canvas element
const canvas = document.getElementById("canvas");

// Get the 2D drawing context
const context = canvas.getContext("2d");

adjustCanvasSize();
clearCanvas();

// Variables to store current position and stroke size
let currentX = 0;
let currentY = 0;
let isDrawing = false;
let strokeSize = 10; // Initial stroke size

// Event listeners for mouse events
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);

// Function to start drawing
function startDrawing(event) {
  isDrawing = true;
  currentX = event.clientX - canvas.offsetLeft;
  currentY = event.clientY - canvas.offsetTop;
}

// Function to draw
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

// Function to stop drawing
function stopDrawing() {
  isDrawing = false;
}

// Function to change stroke size
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

window.addEventListener("resize", adjustCanvasSize);
window.addEventListener("keypress", (e) => {
  switch (e.key) {
    case "C":
    case "c":
      clearCanvas();
      break;
    default:
      return;
  }
});
