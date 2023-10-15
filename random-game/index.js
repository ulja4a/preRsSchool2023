const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;
let cellSize = 20;
let widthCell = width / cellSize;
let heightCell = height / cellSize;
let score = 0;
let speed = 300;
const scoreElement = document.querySelector('.score');
const play = document.querySelector('.play_btn');
const playBtn = document.querySelector('.play');
const pauseBtn = document.querySelector('.pause');
const newGame = document.querySelector('.new_game');
const setting = document.querySelector('.setting');
const sound = document.querySelector('.sound');
const mute = document.querySelector('.mute');
const tableScore = document.querySelector('.table');

let music = createMusic("./assets/audio/music.mp3");
music.loop = true;
let isPlay = false;
let isMute = false;
let pause = false;

let startGame = false;
let gamePaused = false;
let intervalDraw;
let isTableOpen = false;
let isGameOver = false;


// Счет игры
function drawScore()  {
  scoreElement.style.color = "#91630e";
  scoreElement.textContent = `Score: ${score}`;
}
//----------------end---------------------------

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
    gameOver(score);
    return;
  }
  this.segments.unshift(newHead);
  if (newHead.equal(apple.position)) {
    score++;
    drawScore();
    console.log(score);
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
  play.classList.add('pause');
  //music.play();
 
  
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
      }, speed);
    }
    snake.setDirection(newDirection);
  }
})

//Новая игра при нажатии на new Game
newGame.addEventListener('click', () => {
  music.pause();
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
  play.classList.remove('pause');
  if (isPlay) {
    music.pause();
    isPlay = false;
  }
});

function toggleGamePause() {
  if (gamePaused) {
    intervalDraw = setInterval(() => {
      ctx.clearRect(0, 0, width, height);
      drawGrid();
      drawScore();
      apple.draw();
      snake.draw();
      snake.move();
    }, speed);
  } else {
    clearInterval(intervalDraw);
  }
}

//Работа кнопки play/pause, старт вначале и пауза/продолжение во время игры
play.addEventListener('click', ()=> {
  if (!startGame) {
    startGame = true;
    gamePaused = false;
    initialDisplay();
    play.classList.toggle('pause');
    //music.play();
    intervalDraw = setInterval(() => {
      ctx.clearRect(0, 0, width, height);
      drawGrid();
      drawScore();
      apple.draw();
      snake.draw();
      snake.move();
    }, speed);
  } else {
    if (!gamePaused) {
      gamePaused = true;
      clearInterval(intervalDraw);
      play.classList.toggle('pause');
      //music.pause();
    } else {
      gamePaused = false;
      //music.play();
      play.classList.toggle('pause');
      intervalDraw = setInterval(() => {
        ctx.clearRect(0, 0, width, height);
        drawGrid();
        drawScore();
        apple.draw();
        snake.draw();
        snake.move();
      }, speed);
    }
  }
})


// Конец игры
function gameOver(score)  {
  isGameOver = true;
  clearInterval(intervalDraw);
  ctx.globalAlpha = 0.7;
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.globalAlpha = 1.0;
  ctx.fillStyle = 'orange';
  ctx.font = '64px cursive';
  ctx.textAlign = 'center';
  ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2 - 32);
  ctx.font = '24px cursive';
  ctx.fillText(`Your Score : ${score}`, canvas.width / 2, canvas.height / 2 + 32);
  saveScoreToLocalStorage(score);
}
//------------------end--------------------

//Музыка в игре
function createMusic(path) {
  let music = new Audio();
  music.src = path;
  music.volume = 0.2;
  return music;
}

function playPause() {
  console.log(0);
  if (isPlay) {
    if (sound.classList.contains('mute')) {
      music.volume = 0;
    }
    console.log(isPlay);
    music.pause();
    isPlay = false;
  } else {
    console.log(1);
    if (sound.classList.contains('mute')) {
      music.volume = 0;
    } else {
      console.log(2);
      if (startGame) {
      music.volume = 0.2;
      }
        else {
          console.log(3);
          music.volume = 0;
        }
    }
    console.log(isPlay);
    music.play();
    isPlay = true;
  }
}

sound.addEventListener('click', () => {
  if (startGame) {
    sound.classList.toggle('mute');
    playPause();
  } else {
    sound.classList.toggle('mute');
    music.volume = 0;
  }
})
/*sound.addEventListener('click', () => {
  sound.classList.toggle('mute');
  playPause();
})*/

// Таблица score
function saveScoreToLocalStorage(score) {
  let scores = JSON.parse(localStorage.getItem('scores')) || [];

  if (scores.length >= 10) {
    scores.shift();
  }

  scores.push(score);
  localStorage.setItem('scores', JSON.stringify(scores));
}

function getLast10ScoresFromLocalStorage() {
  let scores = JSON.parse(localStorage.getItem('scores')) || [];
  scores.sort((a, b) => b - a);
  return scores.slice(0, 10);
}

function table()  {
  clearInterval(intervalDraw);
  isTableOpen = true;
  ctx.globalAlpha = 0.7;
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.globalAlpha = 1.0;
  ctx.fillStyle = 'orange';
  ctx.font = '24px cursive';
  ctx.textAlign = 'center';
  ctx.fillText('Table Score', canvas.width / 2, 30);
  
  const scores = getLast10ScoresFromLocalStorage();
  ctx.textAlign = 'left';
  ctx.font = '16px cursive';
  ctx.fillStyle = 'white';

  // Отображаем последние 10 результатов в таблице
  for (let i = 0; i < scores.length; i++) {
    ctx.fillText(`${i + 1}:     ${scores[i]}`, 20, 60 + 20 * i);
  }
}

tableScore.addEventListener('click', () => {
  table();
  isTableOpen = true;
})

function closeTable() {
  isTableOpen = false;
  if (!startGame) {
    startGame = true;
    gamePaused = false;
    initialDisplay();
    play.classList.toggle('pause');
    //music.play();
    intervalDraw = setInterval(() => {
      ctx.clearRect(0, 0, width, height);
      drawGrid();
      drawScore();
      apple.draw();
      snake.draw();
      snake.move();
    }, speed);
  } else {
    if (!gamePaused) {
      gamePaused = true;
      clearInterval(intervalDraw);
      play.classList.toggle('pause');
      //music.pause();
    } else {
      gamePaused = false;
      //music.play();
      play.classList.toggle('pause');
      intervalDraw = setInterval(() => {
        ctx.clearRect(0, 0, width, height);
        drawGrid();
        drawScore();
        apple.draw();
        snake.draw();
        snake.move();
      }, speed);
    }
  }
}


canvas.addEventListener('click', (e) => {
  console.log(isTableOpen);
  if (isTableOpen) {
      closeTable();
    }
})