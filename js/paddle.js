
class Paddle {
	constructor(can_width, can_height) {
		this.height = 10;
		this.width = 100;
		this.x = (can_width - this.width)/2;
		this.can_width = can_width;
		this.can_height = can_height;

		this.sX = null; // 始点Ｓのx座標（スクリーン座標）
		this.sY = null; // 始点Ｓのy座標（スクリーン座標）
		this.eX = null; // 終点Ｅのx座標（スクリーン座標）
		this.eY = null; // 終点Ｅのy座標（スクリーン座標）
		this.mouseX; // ドラッグされている位置のx座標
		this.mouseY; // ドラッグされている位置のy座標
	}

	draw(ctx) {
		this.drawStartPoint();
		this.drawTempPoint();
		this.drawEndPoint();

//		ctx.beginPath();
//		ctx.rect(this.x, this.can_height-this.height, this.width, this.height);
//		ctx.fillStyle = "#0095DD";
//		ctx.fill();
//		ctx.closePath();
	}


	// マウス位置に点を描画する
	drawTempPoint() {
		this.drawPoint(paddle.mouseX, paddle.mouseY, '#999');

		if (this.sX != null && this.sY != null && this.eX == null && this.eY == null) {
			// 始点が確定していて、終点が確定していない場合に線分を描画
			this.drawLine(this.sX, this.sY, this.mouseX, this.mouseY, '#999', 1);
		}
	}

	drawPoint(screenX, screenY, color) {
		ctx.fillStyle = color;

		// 指定位置を中心に円を描画
		ctx.beginPath();
		ctx.arc(screenX, screenY, 0.1, 0, Math.PI * 2, false);
		ctx.fill();

	}

	// 指定された2つの点を結ぶ線分を描画する
	drawLine(firstX, firstY, secondX, secondY, color, width) {
		ctx.strokeStyle = color;
		ctx.lineWidth = width;

		// 線分を描画
		ctx.beginPath();
		ctx.moveTo(firstX, firstY);
		ctx.lineTo(secondX, secondY);
		ctx.stroke();
	}

	// 始点を描画する
	drawStartPoint() {
		if (this.sX != null && this.sY != null) {
			this.drawPoint(paddle.sX, paddle.sY, '#000');
		}
	}

	// 終点を描画する
	drawEndPoint() {
		if (this.sX != null && this.sY != null && this.eX != null && this.eY != null) {
			this.drawPoint(this.eX, this.eY, '#000');
			this.drawLine(this.sX, this.sY, this.eX, this.eY, '#000', 20);
		}
	}
}


