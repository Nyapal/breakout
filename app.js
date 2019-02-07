
// ----------------------------------------------------
// Ball

class Ball {
  constructor(x, y, radius = 10) {
    this.x = x;
    this.y = y;
    this.dx = 5;
    this.dy = -5;
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

// -----------------------------------------------------
// Life

class Life {
  constructor(placement, lives = 30) {
    this.placement = placement
    this.lives = lives;
  }
  render(ctx) {
    ctx.font = '16px Arial';
    ctx.fillStyle = '#0095DD';
    ctx.fillText(`Lives: ${ this.lives}`, this.placement, 20);
  }
}

// -------------------------------------------------
// Paddle 

class Paddle {
  constructor(x, y, height = 10, width = 75) {
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height)
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
  }
}

// ----------------------------------------------------
// Brick 

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
    ctx.fillStyle =  '#0095dd' // randomColor();
    ctx.fill();
    ctx.closePath();
  }
}

// -----------------------------------------------------
// Bricks

class Bricks {
  constructor () {
    this.brickRowCount = 3;
    this.brickColumnCount = 5;
    this.brickPadding = 10;
    this.brickOffsetTop = 30;
    this.brickOffsetLeft = 30;
    this.bricks = [];
    this.createBricks()
  }

  createBricks () {
    for (let c = 0; c < this.brickColumnCount; c++) {
        this.bricks[c] = [];
        for (let r = 0; r < this.brickRowCount; r++) {
          const x = (c * (75 + this.brickPadding)) + this.brickOffsetLeft;
          const y = (r * (20 + this.brickPadding)) + this.brickOffsetTop;
          this.bricks[c][r] = new Brick(x, y)
        }
      }
  }

  render (ctx) {
    for (let c = 0; c < this.brickColumnCount; c++) {
      for (let r = 0; r < this.brickRowCount; r++) {
        if (this.bricks[c][r].status === 1) {
          this.bricks[c][r].render(ctx)
        }
      }
    }
  }

}
  
// ----------------------------------------------
// Score 
class Score {
  constructor(score = 30) {
    this.score = score;
  }
  render(ctx) {
    ctx.font = '16px Arial';
    ctx.fillStyle = '#0095DD';
    ctx.fillText(`Score: ${this.score}`, 8, 20);
  }
}


// function randomColor() {
//   return `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;
// }


function draw() {
  // CONNECTED TO KEYUP & KEYDOWN HANDLER 
  // if (rightPressed && paddle.x < canvas.width - paddle.width) {
  //   paddle.x += 7;
  // } else if (leftPressed && paddle.x > 0) {
  //   paddle.x -= 7;
  // }
  ball.x += ball.dx;
  ball.y += ball.dy;
  requestAnimationFrame(draw);
}

// draw();


/**
 * 
 * Game 
 *  Properties
 *    Ball
 *    Paddle
 *    Bricks
 * 
 *  Methods 
 *    draw
 *    drawBall
 *    drawPaddle 
 *    collisions
 * 
 */

 class Game {
   constructor() {
    this.canvas = document.getElementById('myCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.ball = new Ball(this.canvas.width / 2, this.canvas.height - 30);
    this.paddle = new Paddle(this.canvas.width / 2, this.canvas.height - 10);
    this.bricks = new Bricks();
    this.lives = new Life(this.canvas.width - 75);
    this.score = new Score();

    // let rightPressed = false;
    // let leftPressed = false;

    // document.addEventListener('keydown', function(e) { 
    //   this.keyDownHandler(e) 
    // }, false);

    // document.addEventListener('keyup', function(e) { 
    //   this.keyUpHandler(e) 
    // }, false);

    // document.addEventListener('mousemove', function(e) { 
    //   this.mouseMoveHandler(e) 
    // }, false);

    // this.lives = new Life()
    // this.paddle = new Paddle(this.canvas.width / 2)
    // this.score = new Score() 
    this.draw()
  }

  draw() {
    this.drawBall()
    this.drawPaddle()
    this.drawBricks()
    this.drawScore()
    this.drawLife()
  }
  
  drawBall() {
    this.ball.render(this.ctx)
  }
  
  drawBricks() {
    this.bricks.render(this.ctx)
  }

  drawLife() {
    this.lives.render(this.ctx)
  }

  drawPaddle() {
    this.paddle.render(this.ctx)
  }

  drawScore() {
    this.score.render(this.ctx)
  }


  collisionDectection() {
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

  keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      this.rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      this.leftPressed = true;
    }
  }

  keyUpHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      this.rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      this.leftPressed = false;
    }
  }

  mouseMoveHandler(e) {
    const relativeX = e.clientX - this.canvas.OffsetLeft;
    if (relativeX > 0 && relativeX < this.canvas.width) {
      this.paddle.x = relativeX - this.paddle.width / 2;
    }
  }

  playGame () {
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
  }
  
}
 
const game = new Game()