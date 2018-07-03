class Paddle {
	constructor(canWidth, canHeight) {
		this.height = 10;
		this.width = 100;
		this.x = (canWidth - this.width)/2;
		this.canWidth = canWidth;
		this.canHeight = canHeight;

		this.sX = null; // 始点Ｓのx座標（スクリーン座標）
		this.sY = null; // 始点Ｓのy座標（スクリーン座標）
		this.eX = null; // 終点Ｅのx座標（スクリーン座標）
		this.eY = null; // 終点Ｅのy座標（スクリーン座標）
		this.mouseX; // ドラッグされている位置のx座標
		this.mouseY; // ドラッグされている位置のy座標
		this.lineWidth = 10;
	}

	draw(ctx) {
		this.drawStartPoint();
		this.drawTempPoint();
		this.drawEndPoint();

		//		ctx.beginPath();
		//		ctx.rect(this.x, this.canHeight-this.height, this.width, this.height);
		//		ctx.fillStyle = "#0095DD";
		//		ctx.fill();
		//		ctx.closePath();
	}

	checkPaddle() {
		if (this.sX != null && this.sY != null && this.eX != null && this.eY != null)
			return true;
		 else
			return false;
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
			this.drawLine(this.sX, this.sY, this.eX, this.eY, '#000', this.lineWidth);
		}
	}

	calcMouseCoordinate(e) {
		// クリック位置の座標計算（canvasの左上を基準。-2ずつしているのはborderの分）
		var rect = e.target.getBoundingClientRect();
		this.mouseX = e.clientX - Math.floor(rect.left) - 2;
		this.mouseY = e.clientY - Math.floor(rect.top) - 2;
	}

	onmousedown(e) {
		// クリック位置のスクリーン座標（mouseX, mouseY）を取得
		this.calcMouseCoordinate(e);
		// 始点、終点のスクリーン座標を設定（終点はクリア）
		this.sX = this.mouseX;
		this.sY = this.mouseY;
		this.eX = null;
		this.eY = null;
	}

	onmouseup(e) {
		// クリック位置のスクリーン座標（mouseX, mouseY）を取得
		this.calcMouseCoordinate(e);
		// 終点のスクリーン座標を設定
		this.eX = this.mouseX;
		this.eY = this.mouseY;
	}

	onmouseout(e) {
		// 始点・終点が共に確定していなければ、一旦クリア
		if (this.sX == null || this.sY == null || this.eX == null || this.eY == null) {
			this.clear();
		}
	}

	clear() {
			this.sX = null;
			this.sY = null;
			this.eX = null;
			this.eY = null;
	}

	getPoints() {
		if (this.sX == null || this.sY == null || this.eX == null || this.eY == null)
			return null;
		else  {
			let x1 = this.sX;
			let y1 = this.sY;
			let x2 = this.eX;
			let y2 = this.eY;

			if(this.sX < this.eX) {
				if(this.sY < this.eY) {
				}
				x1 = this.eX;
				y1 = this.eY;
				x2 = this.sX;
				y2 = this.sY;
			}

			return [{x:x1, y:y1-this.lineWidth/2}, {x:x2,y:y2-this.lineWidth/2}, {x:x2, y:y2+this.lineWidth/2}, {x:x1, y:y2+this.lineWidth/2}];

		}
	}


}

