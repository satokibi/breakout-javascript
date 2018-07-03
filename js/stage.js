
class Stage {
	constructor() {
		this.row = 22;
		this.column = 8;
		this.blockPadding = 1;
		this.blockOffsetTop = 30;
		this.blockOffsetLeft = 15;
		this.blocks = [];

		for(let c=0; c<this.column; c++) {
			this.blocks[c] = [];
			for(let r=0; r<this.row; r++) {
				this.blocks[c][r] = { x: 0, y: 0 , status: 1, width:25, height:25};
			}
		}
	}

	draw(ctx) {
		for(let c=0; c<this.column; c++) {
			for(let r=0; r<this.row; r++) {
				if(this.blocks[c][r].status == 1) {
					const blockX = (r*(this.blocks[c][r].width+this.blockPadding))+this.blockOffsetLeft;
					const blockY = (c*(this.blocks[c][r].height+this.blockPadding))+this.blockOffsetTop;
					this.blocks[c][r].x = blockX;
					this.blocks[c][r].y = blockY;

					ctx.beginPath();
					ctx.rect(blockX, blockY, this.blocks[c][r].width, this.blocks[c][r].height);
					ctx.fillStyle = "#0095DD";
					ctx.fill();
					ctx.closePath();
				}
			}
		}
	}


	collisiondetection(ball) {
		let flag = false;
		for(let c=0; c<this.column; c++) {
			for(let r=0; r<this.row; r++) {
				let b = this.blocks[c][r];
				if(b.status == 1) {
					const points = this.getPoints(b);
					for(let pi=0;pi<points.length;pi++) {
						let pi2;
						if(pi == 3)
							pi2 = 0;
						else
							pi2 = pi+1;

						if(this.checkPointAndCircle(points[pi], ball)){
							const random = Math.floor(Math.random() * 2);
							if(random == 0)
								ball.dy = -ball.dy;
							else if(random == 1)
								ball.dx = -ball.dx;
							b.status = 0;
							flag = true;
						}
						else if(this.getDistancePointAndLine(ball, points[pi], points[pi2]) < ball.r) {
							if(pi == 0 || pi == 2)
								ball.dy = -ball.dy;
							if(pi == 1 || pi == 3)
								ball.dx = -ball.dx;
							b.status = 0;
							flag = true;
						}
					}
				}
			}
		}
		return flag;
	}

	checkPointAndCircle(point,ball) {
		const dx = ball.x - point.x;
		const dy = ball.y - point.y;
		if(dx*dx + dy*dy < ball.r*ball.r) return true;
		else return false;
	}

	getDistancePointAndLine(ball,point1,point2) {
		const dx = point2.x - point1.x;
		const dy = point2.y - point1.y;
		const a = dx*dx + dy*dy;
		const b = dx*(point1.x - ball.x) + dy * (point1.y - ball.y);
		let t = -b / a;
		if(t<0)t=0;
		if(t>1)t=1;
		const tx = point1.x + dx * t;
		const ty = point1.y + dy * t;
		return Math.sqrt((ball.x - tx)*(ball.x-tx) + (ball.y - ty)*(ball.y-ty));
	}

	getPoints(block) {
		return [{x:block.x, y:block.y}, {x:block.x + block.width/2, y:block.y}, {x:block.x + block.width/2, y:block.y + block.height/2}, {x:block.x, y:block.y + block.height/2}];
	}

}


