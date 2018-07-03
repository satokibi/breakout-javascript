
class Stage {
	constructor(row, column) {
		this.blockWidth = 30;
		this.blockHeight = 30;
		this.row = row;
		this.column = column;
		this.blockPadding = 1;
		this.blockOffsetTop = 30;
		this.blockOffsetLeft = 6;
		this.blocks = [];

		for(var c=0; c<this.column; c++) {
			this.blocks[c] = [];
			for(var r=0; r<this.row; r++) {
				this.blocks[c][r] = { x: 0, y: 0 , status: 1};
			}
		}
	}

	draw(ctx) {
		for(var c=0; c<this.column; c++) {
			for(var r=0; r<this.row; r++) {
				if(this.blocks[c][r].status == 1) {
					var blockX = (r*(this.blockWidth+this.blockPadding))+this.blockOffsetLeft;
					var blockY = (c*(this.blockHeight+this.blockPadding))+this.blockOffsetTop;
					this.blocks[c][r].x = blockX;
					this.blocks[c][r].y = blockY;

					ctx.beginPath();
					ctx.rect(blockX, blockY, this.blockWidth, this.blockHeight);
					ctx.fillStyle = "#0095DD";
					ctx.fill();
					ctx.closePath();
				}
			}
		}
	}

	collisiondetection(ball) {
		var flag = false;
		for(var c=0; c<this.column; c++) {
			for(var r=0; r<this.row; r++) {
				var b = this.blocks[c][r];
				if(b.status == 1) {
					if(ball.x > b.x && ball.x < b.x + this.blockWidth && ball.y > b.y && ball.y < b.y + this.blockHeight) {
						ball.dy = -ball.dy;
						b.status = 0;
						flag = true;
					}
				}
			}
		}
		return flag;
	}

}


