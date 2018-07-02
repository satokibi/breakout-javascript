class Ball {

	constructor(can_width, can_height) {
		this.ballRadius = 10;
		this.x = canvas.width/2;
		this.y = canvas.height-30;
		this.dx = 10;
		this.dy = -10;

		this.can_width = can_width;
		this.can_height = can_height;

	}

	drawBall(ctx) {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI*2);
		ctx.fillStyle = "#0095DD";
		ctx.fill();
		ctx.closePath();
	}

	move(paddle) {
		if(this.x + this.dx > this.can_width - this.ballRadius || this.x + this.dx < this.ballRadius) {
			this.dx = -this.dx;
		}
		if(this.y + this.dy > this.can_height - this.ballRadius || this.y + this.dy < this.ballRadius) {
			this.dy = -this.dy;
		}else if(this.y + this.dy > this.can_height-this.ballRadius) {
			lives--;
			if(!lives) {
				alert("GAME OVER");
				document.location.reload();
			}
			else {
				paddle.x = this.x;
			}
		}
		this.x += this.dx;
		this.y += this.dy;
	}
}


var balls = [];
ball = new Ball(canvas.width, canvas.height);
balls.push(ball);
var count = 0;

function draw() {

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for(let i=0;i<balls.length;i++) {
		balls[i].drawBall(ctx);
		balls[i].move();
	}
	count += 1;

	if(count % 100 == 0) {
		ball = new Ball(canvas.width, canvas.height);
		balls.push(ball);
	}

}


class Paddle {
	constructor(can_width, can_height) {
		this.height = 10;
		this.width = 75;
		this.x = (can_height - this.width)/2;
		this.can_height = can_height;
	}

	drawPaddle(ctx) {
		ctx.beginPath();
		ctx.rect(this.x, this.can_height-this.height, this.width, this.height);
		ctx.fillStyle = "#0095DD";
		ctx.fill();
		ctx.closePath();
	}
}




var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;

var brickRowCount = 19;
var brickColumnCount = 8;
var brickWidth = 30;
var brickHeight = 30;
var brickPadding = 1;
var brickOffsetTop = 40;
var brickOffsetLeft = 6;
var score = 0;
var lives = 3;

var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
	bricks[c] = [];
	for(var r=0; r<brickRowCount; r++) {
		bricks[c][r] = { x: 0, y: 0, status: 1 };
	}
}

document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
	var relativeX = e.clientX - canvas.offsetLeft;
	if(relativeX > 0 && relativeX < canvas.width) {
		paddleX = relativeX - paddleWidth/2;
	}
}

function collisionDetection() {
	for(var c=0; c<brickColumnCount; c++) {
		for(var r=0; r<brickRowCount; r++) {
			var b = bricks[c][r];
			if(b.status == 1) {
				if(x + ballRadius> b.x && x - ballRadius< b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
					dy = -dy;
					b.status = 0;
					score++;
					if(score == brickRowCount*brickColumnCount) {
						alert("YOU WIN, CONGRATS!");
						document.location.reload();
					}
				}
			}
		}
	}
}

function drawBall() {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

function drawPaddle() {
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

function drawBricks() {
	for(var c=0; c<brickColumnCount; c++) {
		for(var r=0; r<brickRowCount; r++) {
			if(bricks[c][r].status == 1) {
				var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
				var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
				bricks[c][r].x = brickX;
				bricks[c][r].y = brickY;
				ctx.beginPath();
				ctx.rect(brickX, brickY, brickWidth, brickHeight);
				ctx.fillStyle = "#0095DD";
				ctx.fill();
				ctx.closePath();
			}
		}
	}
}

function drawScore() {
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Score: "+score, 8, 20);
}

function drawLives() {
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

function draw() {
	// aaa
	count += 1;
	if(count % 100 == 0) {
		ball = new Ball(canvas.width, canvas.height);
		balls.push(ball);
	}
	// aaa


	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBricks();


	drawBall();
	for(let i=0;i<balls.length;i++) {
		balls[i].drawBall(ctx);
		balls[i].move();
	}


	drawPaddle();
	drawScore();
	drawLives();
	collisionDetection();

	if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
		dx = -dx;
	}
	if(y + dy < ballRadius) {
		dy = -dy;
	}
	else if(y + dy > canvas.height-ballRadius) {
		if(x > paddleX && x < paddleX + paddleWidth) {
			dy = -dy;
		}
		else {
			lives--;
			if(!lives) {
				alert("GAME OVER");
				document.location.reload();
			}
			else {
				x = canvas.width/2;
				y = canvas.height-30;
				dx = 3;
				dy = -3;
				paddleX = (canvas.width-paddleWidth)/2;
			}
		}
	}

	x += dx;
	y += dy;
	requestAnimationFrame(draw);
}

draw();
