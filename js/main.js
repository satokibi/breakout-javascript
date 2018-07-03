function drawLives(ctx) {
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

function mouseMoveHandler(e) {
	var relativeX = e.clientX - canvas.offsetLeft;
	if(relativeX > 0 && relativeX < canvas.width) {
		paddle.x = relativeX - paddle.width/2;
	}
}

function judgeIentersected(ax, ay, bx, by, cx, cy, dx, dy) {
  var ta = (cx - dx) * (ay - cy) + (cy - dy) * (cx - ax);
  var tb = (cx - dx) * (by - cy) + (cy - dy) * (cx - bx);
  var tc = (ax - bx) * (cy - ay) + (ay - by) * (ax - cx);
  var td = (ax - bx) * (dy - ay) + (ay - by) * (ax - dx);

  //return tc * td < 0 && ta * tb < 0;
  return tc * td <= 0 && ta * tb <= 0; // 端点を含む場合
};


document.addEventListener("mousemove", mouseMoveHandler, false);

window.onload = function() {
	// mousedownイベントの登録（始点の確定）
	canvas.onmousedown = function(e) {
		// クリック位置のスクリーン座標（mouseX, mouseY）を取得
		calcMouseCoordinate(e);
		// 始点、終点のスクリーン座標を設定（終点はクリア）
		paddle.sX = paddle.mouseX;
		paddle.sY = paddle.mouseY;
		paddle.eX = null;
		paddle.eY = null;
	}

	canvas.onmousemove = function(e) {
		// マウス位置のスクリーン座標（mouseX, mouseY）を取得
		calcMouseCoordinate(e);
	}

	// mouseupイベントの登録（終点、線分を確定）
	canvas.onmouseup = function(e) {
		// クリック位置のスクリーン座標（mouseX, mouseY）を取得
		calcMouseCoordinate(e);
		// 終点のスクリーン座標を設定
		paddle.eX = paddle.mouseX;
		paddle.eY = paddle.mouseY;
	}

	// mouseoutイベントの登録
	canvas.onmouseout = function(e) {
		// 始点・終点が共に確定していなければ、一旦クリア
		if (paddle.sX == null || paddle.sY == null || paddle.eX == null || paddle.eY == null) {
			paddle.sX = null;
			paddle.sY = null;
			paddle.eX = null;
			paddle.eY = null;
		}
	}
};

function calcMouseCoordinate(e) {
	// クリック位置の座標計算（canvasの左上を基準。-2ずつしているのはborderの分）
	var rect = e.target.getBoundingClientRect();
	paddle.mouseX = e.clientX - Math.floor(rect.left) - 2;
	paddle.mouseY = e.clientY - Math.floor(rect.top) - 2;
}


var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

stage = new Stage(19,5);
paddle = new Paddle(canvas.width, canvas.height);
score = new Score(10);
ball = new Ball(canvas.width, canvas.height);

count = 0;
var lives = 3;

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	stage.draw(ctx);
	ball.draw(ctx);
	paddle.draw(ctx);
	score.draw(ctx);
	drawLives(ctx);

	if(ball.move() != true) {
		lives --;
	}

	if(stage.collisiondetection(ball))
		score.plus();

	if(lives == 0) {
		alert("GAME OVER");
		document.location.reload();
	}

	if(count % 50 == 0) {
		ball.switch_time();
		count = 0;
	}

	count += 1;
	requestAnimationFrame(draw);
}

draw();

