class Ball {
	constructor(canWidth, canHeight) {
		this.r = 10;
		this.x = canvas.width/2;
		this.y = canvas.height - 180;
		this.dx = 0.1;
		this.dy = 0.1;
		this.speed = 22;
		this.slowSpeed = 0.1;
		this.slowFlag = true;
		this.canWidth = canWidth;
		this.canHeight = canHeight;
		this.child = []
	}

	draw(ctx) {
		this.drawChildLine(ctx);
		//this.drawChildCircle(ctx);
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
		ctx.fillStyle = "#0095DD";
		ctx.fill();
		ctx.closePath();
	}

	drawChildCircle(ctx) {
		if(this.child.length > 50)
			this.child.shift();
		for(let i=0;i<this.child.length;i++) {
			ctx.beginPath();
			ctx.arc(this.child[i].x, this.child[i].y, this.r-8, 0, Math.PI*2);
			ctx.fillStyle = "#CCCCCC";
			ctx.fill();
			ctx.closePath();
		}
	}

	drawChildLine(ctx) {
		if(this.child.length > 100)
			this.child.shift();
		for(let i=1;i<this.child.length;i++) {
			ctx.beginPath();
			ctx.lineWidth = 4;
			ctx.strokeStyle = "#CCCCCC";
			ctx.moveTo(this.child[i-1].x, this.child[i-1].y);
			ctx.lineTo(this.child[i].x, this.child[i].y);
			ctx.stroke();
			ctx.closePath();
		}
	}

	slow() {
		this.slowFlag = true;
		if(this.dx > 0)
			this.dx = this.slowSpeed;
		else if(this.dx < 0)
			this.dx = -this.slowSpeed;
		if(this.dy > 0)
			this.dy = this.slowSpeed;
		else if(this.dy < 0)
			this.dy = -this.slowSpeed;
	}

	fast() {
		this.slowFlag = false;
		if(this.dx > 0)
			this.dx = this.speed;
		else if(this.dx < 0)
			this.dx = -this.speed;
		if(this.dy > 0)
			this.dy = this.speed;
		else if(this.dy < 0)
			this.dy = -this.speed;
	}

	move(blocks, paddle, score) {
		this.child.push({x:this.x, y:this.y});

		if(this.x + this.dx > this.canWidth-this.r|| this.x + this.dx < this.r) {
			this.dx = -this.dx;
		}
		if(this.y + this.dy < this.r) {
			this.dy = -this.dy;
		} else if(this.y + this.dy > this.canHeight-this.r) {
			this.x = canvas.width/2;
			this.y = canvas.height - 180;
			this.dx = 0.1;
			this.dy = 0.1;
			return false;
		}
		else {
			this.paddleDetection(paddle);
			if(this.collisiondetection(blocks))
				score.plus();
		}
		this.x += this.dx;
		this.y += this.dy;

		if(this.slowCheck(paddle)) {
			this.slow();
		} else {
			this.fast();
		}

		return true;
	}

	getDistancePoints(point1, point2) {
		return Math.sqrt( (point1.x-point2.x) * (point1.x-point2.x) + (point1.y-point2.y) * (point1.y-point2.y));
	}
collisiondetection(blocks) {
		let minBlock = {distance:9999, c:0, r:0};
		let flag = false;
		for(let c=0; c<blocks.length; c++) {
			for(let r=0; r<blocks[0].length; r++) {
				let b = blocks[c][r];
				if(b.status == 1) {
					const points = this.getPoints(b);
					for(let pi=0;pi<points.length;pi++) {
						let pi2;
						if(pi == 3)
							pi2 = 0;
						else
							pi2 = pi+1;

						if(this.checkPointAndCircle(points[pi])){
							if(minBlock.distance > this.getDistancePoints({x:b.x + b.width/2, y:b.y + b.height/2}, {x:this.x, y:this.y})){
								minBlock.distance = this.getDistancePoints({x:b.x + b.width/2, y:b.y + b.height/2}, {x:this.x, y:this.y});
								minBlock.c = c;
								minBlock.r = r;
								const random = Math.floor(Math.random() * 2);
								if(random == 0)
									this.dy = -this.dy;
								else if(random == 1)
									this.dx = -this.dx;
								flag = true;
							}
//						}
//						else if(this.getDistancePointAndLine(points[pi], points[pi2]) < this.r) {
//							if(pi == 0 || pi == 2)
//								this.dy = -this.dy;
//							if(pi == 1 || pi == 3)
//								this.dx = -this.dx;
//							b.status = 0;
//							return true;
						} else if(this.judgeIentersected(points[pi].x, points[pi].y, points[pi2].x, points[pi2].y, this.x, this.y, this.x + this.dx, this.y + this.dy)) {
							if(minBlock.distance > this.getDistancePoints({x:b.x + b.width/2, y:b.y + b.height/2}, {x:this.x, y:this.y})){
								minBlock.distance = this.getDistancePoints({x:b.x + b.width/2, y:b.y + b.height/2}, {x:this.x, y:this.y});
								minBlock.c = c;
								minBlock.r = r;
								if(pi == 0 || pi == 2)
									this.dy = -this.dy;
								if(pi == 1 || pi == 3)
									this.dx = -this.dx;
								//b.status = 0;
								flag = true;
							}
						}
					}
				}
			}
		}

		blocks[minBlock.c][minBlock.r].status = 0;
		return flag;
	}

	paddleDetection(paddle) {
		if(this.slowFlag){
			if(this.judgeIentersected(paddle.sX, paddle.sY, paddle.eX, paddle.eY, this.x, this.y, this.x + this.dx * 20, this.y + this.dy * 20)) {
				this.dy = -this.speed;
			}
		} else
			if(this.judgeIentersected(paddle.sX, paddle.sY, paddle.eX, paddle.eY, this.x, this.y, this.x + this.dx, this.y + this.dy)) {
				this.dy = -this.speed;
			}

		//const points = paddle.getPoints();
		//if(points == null)
		//	return false;
		//for(let pi=0;pi<points.length;pi++) {
		//	let pi2;
		//	if(pi == 3)
		//		pi2 = 0;
		//	else
		//		pi2 = pi+1;
		//	if(this.checkPointAndCircle(points[pi])){
		//		this.dy = -this.dy;
		//	}
		//	else if(this.getDistancePointAndLine(points[pi], points[pi2]) < this.r) {
		//		this.dy = -this.dy;
		//	//} else if(this.judgeIentersected(points[pi].x, points[pi].y, points[pi2].x, points[pi2].y, this.x, this.y, this.x + this.dx, this.y + this.dy)) {
		//	} else if(this.judgeIentersected(paddle.sX, paddle.sY, paddle.eX, paddle.eY, this.x, this.y, this.x + this.dx, this.y + this.dy)) {

		//		this.dy = -this.speed;
		//	}
		//}
	}

	slowCheck(paddle) {
		if(this.canHeight - 180 > this.y) {
			return false;
		}

		if(this.dy < 0) {
			return false;
		}

		if(paddle.checkPaddle() == false) {
			return true;
		}

		if(this.judgeIentersected(paddle.sX, paddle.sY, paddle.eX, paddle.eY, this.x, this.y, this.x + this.dx * 10000, this.y + this.dy * 10000)) {
				return false;
		}

		if(this.judgeIentersected(0, this.canHeight, this.canWidth, this.canHeight, this.x, this.y, this.x + this.dx*10000, this.y + this.dy*10000)) {
			return true;
		} else{
			return false;
		}

	}

	checkPointAndCircle(point) {
		const dxl = this.x  + this.dx - point.x;
		const dyl = this.y + this.dy - point.y;
		if(dxl*dxl + dyl*dyl < this.r*this.r) return true;
		else return false;
	}

	getDistancePointAndLine(point1,point2) {
		const dxl = point2.x - point1.x;
		const dyl = point2.y - point1.y;
		const a = dxl*dxl + dyl*dyl;
		const b = dxl*(point1.x - this.x + this.dx) + dyl * (point1.y - this.y + this.dy);
		let t = -b / a;
		if(t<0)t=0;
		if(t>1)t=1;
		const tx = point1.x + dxl * t;
		const ty = point1.y + dyl * t;
		return Math.sqrt((this.x + this.dx - tx)*(this.x + this.dx-tx) + (this.y + this.dy - ty)*(this.y + this.dy - ty));
	}

	getPoints(block) {
		return [{x:block.x, y:block.y}, {x:block.x +block.width/2, y:block.y}, {x:block.x + block.width/2, y:block.y + block.height/2}, {x:block.x, y:block.y + block.height/2}];
	}

	getRadian(point1, point2, ball) {
		const dx1 = point1.x - ball.x;
		const dy1 = point1.y - ball.y;
		const dx2 = point2.x - ball.x;
		const dy2 = point2.y - ball.y;

		const dxdy = dx1 * dx2 + dy1 * dy2;
		const dxn = dx1 * dx1 + dy1 * dy1;
		const dyn = dx2 * dx2 + dy2 * dy2;

		return Math.acos(dxdy / (Math.sqrt(dxn * dxy)));
		//const radian = Math.acos(dxdy / (Math.sqrt(dxn * dxy)));
		//		return radian * 180 / Math.PI;

	}

	judgeIentersected(ax, ay, bx, by, cx, cy, dx, dy) {
		const ta = (cx - dx) * (ay - cy) + (cy - dy) * (cx - ax);
		const tb = (cx - dx) * (by - cy) + (cy - dy) * (cx - bx);
		const tc = (ax - bx) * (cy - ay) + (ay - by) * (ax - cx);
		const td = (ax - bx) * (dy - ay) + (ay - by) * (ax - dx);
		//return tc * td < 0 && ta * tb < 0;
		return tc * td <= 0 && ta * tb <= 0; // 端点を含む場合
	};

}
