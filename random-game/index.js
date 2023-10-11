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
const newGame = document.querySelector('.new_game');
const setting = document.querySelector('.setting');
const sound = document.querySelector('.sound');
const mute = document.querySelector('.mute');

/*let animationTime = 100;
let startGame = function () {
  ctx.clearRect (0, 0, width, height);
  drawGrid();
  drawScore();

  setTimeout(startGame, animationTime);
}*/

let startGame = false;
let intervalDraw;


// Счет игры
function drawScore()  {
  scoreElement.style.color = "#91630e";
  scoreElement.textContent = `Score: ${score}`;
}
//----------------end---------------------------

// Конец игры
function gameOver()  {
  clearInterval(intervalDraw);
  ctx.globalAlpha = 0.7;
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.globalAlpha = 1.0;
  ctx.fillStyle = 'orange';
  ctx.font = '64px cursive';
  ctx.textAlign = 'center';
  ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2);
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

let Snake = function () {
  this.segments = [
    new Cell(0, 5)
  ]
  this.direction = 'right';
  this.nextDirection = 'right';
}

Snake.prototype.draw = function() {
  for (i=0; i<this.segments.length; i++) {
    ctx.globalAlpha = 0.3;
    this.segments[i].drawSquare('LimeGreen');
  }
  ctx.globalAlpha = 1.0;
}
let snake = new Snake();
//----------end-------------------------------------

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
  this.position.drawCircle('red');
}
let apple = new Apple();

Apple.prototype.move = function () {
  let randomeCol = Math.floor(Math.random()*(widthCell-2))+1;
  let randomeRow = Math.floor(Math.random()*(heightCell-2))+1;
  this.position = new Cell(randomeCol, randomeRow);
}
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

//Проверка столкновения змейки с яблоком или с собой
Cell.prototype.equal = function (otherCell) {
  return this.col === otherCell.col &&this.row === otherCell.row;
}
//----------------------------end----------------

//Проверяем столкновение со стеной
Snake.prototype.checkCollision = function (head) {
  let leftCollision = (head.col === -1);
  let topCollision = (head.row === -1);
  let rightCollision = (head.col === (widthCell));
  let bottomCollision = (head.row === (heightCell));
  let wallCollision = leftCollision||topCollision||rightCollision||bottomCollision;
  let selfCollision = false;
  for (let i=0; i< this.segments.length; i++) {
    if (head.equal(this.segments[i])) {
      selfCollision = true;
    }
  }
  return wallCollision||selfCollision;
}
//------------------------------end----------------------------

//Движение змейки
Snake.prototype.move = function () {
  let head = this.segments[0];
  let newHead;
  this.direction = this.nextDirection;

  if (this.direction === 'right') {
    newHead = new Cell(head.col+1, head.row);
  } else if (this.direction === 'down') {
    newHead = new Cell(head.col, head.row+1);
  } else if (this.direction === 'left') {
    newHead = new Cell(head.col-1, head.row);
  } else if (this.direction === 'up') {
    newHead = new Cell(head.col, head.row-1);
  }

  if (this.checkCollision(newHead)) {
    gameOver();
    return;
  }
  this.segments.unshift(newHead);
  if (newHead.equal(apple.position)) {
    score++;
    apple.move();
  } else {
    this.segments.pop();
  }
}

//События на клавиатуре, движение змейки стрелками
let directions = {
  37: "left",
  38: "up",
  39: "right",
  40: "down"
}

Snake.prototype.setDirection = function (newDirection) {
  if ( this.direction === "up" && newDirection === "down") {
    return;
  } else if (this.direction === "right" && newDirection === "left") {
    return;
  } else if (this.direction === "down" && newDirection === "up") {
    return;
  } else if (this.direction === "left" && newDirection === "right") {
    return;
  }
  this.nextDirection = newDirection;
}

//Инициализация игры при загрузке
function initialDisplay() {
  ctx.clearRect(0, 0, width, height);
  drawGrid();
  drawScore();
  apple.draw();
  snake.draw();
}

initialDisplay();


//Старт игры при нажатии стрелки
document.addEventListener('keydown', (e) => {
  let newDirection = directions[e.keyCode];

  if (newDirection !== undefined) {
    if (!startGame) {
      startGame = true;
      intervalDraw = setInterval(() => {
        ctx.clearRect(0, 0, width, height);
        drawGrid();
        drawScore();
        apple.draw();
        snake.draw();
        snake.move();
      }, 500);
    }
    snake.setDirection(newDirection);
  }
})

//Новая игра при нажатии на new Game
newGame.addEventListener('click', () => {
  if (intervalDraw) {
    clearInterval(intervalDraw);
  }
  startGame = false;
  score = 0;
  apple.move();
  snake = new Snake;
  snake.move();
  ctx.clearRect(0, 0, width, height);
  initialDisplay();
});
