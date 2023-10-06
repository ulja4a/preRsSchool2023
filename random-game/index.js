const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;
let cellSize = 20;
let widthCell = width / cellSize;
let heightCell = height / cellSize;
let score = 0;
const scoreElement = document.querySelector('.score');
const playBtn = document.querySelector('.play');
const pauseBtn = document.querySelector('.pause');

let intervalDraw = setInterval(  () => {
  ctx.clearRect (0, 0, width, height);
  drawGrid();
  drawScore();
  apple.draw();
}, 100);

// Счет игры
function drawScore()  {
  scoreElement.style.color = "#91630e";
  scoreElement.textContent = `Score: ${score}`;
}
//----------------end---------------------------

// Конец игры
function gameOver()  {
  clearInterval(intervalDraw);
  ctx.fillText('Game over', width/2, height/2)
}
//------------------end--------------------

// Ячейки
let Cell = function (col, row) {
  this.col = col;
  this.row = row;
}

// Ричуем змейку
Cell.prototype.drawSquare = function (color) {
  let x = this.col * cellSize;
  let y = this.row * cellSize;
  ctx.fillStyle = color;
  ctx.fillRect(x, y, cellSize, cellSize);
}

// Рисуем яблоко
Cell.prototype.drawCircle = function (color) {
  let centerX = this.col*cellSize + cellSize/2;
  let centerY = this.row*cellSize + cellSize/2;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(centerX, centerY, cellSize/2, 0, 2 * Math.PI);
  ctx.fill();
}

let Apple = function() {
  this.position = new Cell(10, 10);
}
Apple.prototype.draw = function() {
  this.position.drawCircle('LimeGreen');
}
let apple = new Apple();
//---------end----------------------------------

// Рисуем сетку
function drawGrid() {
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#986f2a";
  for (let i = 0; i < widthCell; i++) {
    for (let j = 0; j < heightCell; j++) {
      ctx.strokeRect(i * cellSize, j * cellSize, cellSize, cellSize);
    }
  }
}
//------------------end--------------------------