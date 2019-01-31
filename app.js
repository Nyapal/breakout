const canvas = document.getElementById('myCanvas');

class Ball {
  constructor(x, y, radius = 10) {
    this.x = x;
    this.y = y;
    this.dx = 2;
    this.dy = -2;
    this.radius = radius;
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
  }
}

class Brick {
  constructor(x, y, height = 20, width = 75, status = 1) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.status = status
  }

  render(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = randomColor();
    ctx.fill();
    ctx.closePath();
  }
}

class Paddle {
  constructor(x, height = 10, width = 75) {
    this.height = height;
    this.width = width;
    this.x = x;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, canvas.height - this.height, this.width, this.height)
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
  }
}

const ctx = canvas.getContext('2d');
const brickRowCount = 3;
const brickColumnCount = 5;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

const ball = new Ball(canvas.width / 2, canvas.height - 30)
ball.move();
ball.render(ctx);

const brick = new Brick(100, 140)
brick.render(ctx);

const paddle = new Paddle(canvas.width / 2)
paddle.render(ctx);

let rightPressed = false;
let leftPressed = false;
let score = 0;
let lives = 30;

const bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    const x = (c * (75 + brickPadding)) + brickOffsetLeft;
    const y = (r * (20 + brickPadding)) + brickOffsetTop;
    bricks[c][r] = new Brick(x, y)
  }
}

function keyDownHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = true;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = false;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = false;
  }
}

function mouseMoveHandler(e) {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddle.x = relativeX - paddle.width / 2;
  }
}

function randomColor() {
  return `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;
}

function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      const b = bricks[c][r];
      if (b.status === 1) {
        if (ball.x > b.x && ball.x < b.x + brick.width &&
            ball.y > b.y && ball.y < b.y + brick.height) {
          ball.dy = -ball.dy;
          b.status = 0;
          score++;
          if (score === brickRowCount * brickColumnCount) {
            alert('You win! Congratulations!')
            document.location.reload();
          }
        }
      }
    }
  }
}

function drawBall() {
  ball.render(ctx)
}

function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status === 1) {
        bricks[c][r].render(ctx)
      }
    }
  }
}

function drawLives() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  ctx.fillText(`Lives: ${ lives}`, canvas.width - 65, 20);
}

function drawPaddle() {
  paddle.render(ctx)
}

function drawScore() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  ctx.fillText(`Score: ${ score}`, 8, 20);
}


function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  collisionDetection();
  drawBall();
  drawBricks();
  drawLives();
  drawPaddle();
  drawScore();

  if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
    ball.dx = -ball.dx;
  }
  if (ball.y + ball.dy < ball.radius) {
    ball.dy = -ball.dy;
  } else if (ball.y + ball.dy > canvas.height - ball.radius) {
    if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
      ball.dy = -ball.dy
    } else {
      lives--;
      if (!lives) {
        alert ('GAME OVER');
        document.location.reload();
      } else {
        ball.x = canvas.width / 2;
        ball.y = canvas.height - 30;
        ball.dx = 2;
        ball.dy = -2;
        paddle.x = (canvas.width - paddle.width) / 2;
      }
    }
  }

  if (rightPressed && paddle.x < canvas.width - paddle.width) {
    paddle.x += 7;
  } else if (leftPressed && paddle.x > 0) {
    paddle.x -= 7;
  }

  ball.x += ball.dx;
  ball.y += ball.dy;
  requestAnimationFrame(draw);

  document.addEventListener('keydown', keyDownHandler, false);
  document.addEventListener('keyup', keyUpHandler, false);
  document.addEventListener('mousemove', mouseMoveHandler,false);
}

draw();
