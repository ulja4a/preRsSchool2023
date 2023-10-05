const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;
const cellSize = 10;
let widthCell = width / cellSize;
let heightCell = height / cellSize;

let intervalDraw = setInterval(  () => {
  ctx.clearRect (0, 0, width, height);
}, 100);

let score = 0;
const scoreElement = document.querySelector('.score');
scoreElement.textContent = `${score}`;

let gameOver = () => {
  clearInterval(intervalDraw);
  ctx.fillText('Game over', width/2, height/2)
}