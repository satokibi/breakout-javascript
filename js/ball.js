class Ball {
	constructor(can_width, can_height) {
		this.ballRadius = 10;
		this.x = canvas.width/2;
		this.y = canvas.height-30;
		this.dx = 20;
		this.dy = -20;
		this.time = 1;
		this.can_width = can_width;
		this.can_height = can_height;
		this.child = []
	}

	draw(ctx) {
		//this.drawChildLine(ctx);
		this.drawChildCircle(ctx);

		ctx.beginPath();
		ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI*2);
		ctx.fillStyle = "#0095DD";
		ctx.fill();
		ctx.closePath();
	}

	deleteChildLine(ctx) {
		for(let j=0;j<this.child.length;j++) {
			this.child.shift();
			for(let i=1;i<this.child.length;i++) {
				ctx.beginPath();
				ctx.lineWidth = 2;
				ctx.strokeStyle = "#FFAAAA";
				ctx.moveTo(this.child[i-1].x, this.child[i-1].y);
				ctx.lineTo(this.child[i].x, this.child[i].y);
				ctx.stroke();
				ctx.closePath();
			}
		}
	}

	drawChildCircle(ctx) {
		if(this.child.length > 50)
			this.child.shift();

		for(let i=0;i<this.child.length;i++) {
			ctx.beginPath();
			ctx.arc(this.child[i].x, this.child[i].y, this.ballRadius-8, 0, Math.PI*2);
			ctx.fillStyle = "#FFAAAA";
			ctx.fill();
			ctx.closePath();
		}
	}

	drawChildLine(ctx) {
		if(this.child.length > 50)
			this.child.shift();

		for(let i=1;i<this.child.length;i++) {
			ctx.beginPath();
			ctx.lineWidth = 2;
			ctx.strokeStyle = "#FFAAAA";
			ctx.moveTo(this.child[i-1].x, this.child[i-1].y);
			ctx.lineTo(this.child[i].x, this.child[i].y);
			ctx.stroke();
			ctx.closePath();
		}
	}

	slow() {
		this.dx = 0.2;
		this.dy = -0.2;
	}

	fast() {
		this.dx = 20;
		this.dy = -20;
	}

	switch_time() {
		if(this.time == 1) {
			this.time = 0;
			this.slow()
		}
		else if(this.time == 0) {
			this.time = 1;
			this.fast();
		}
	}

	moveTest() {
		if(this.x + this.dx > this.can_width - this.ballRadius || this.x + this.dx < this.ballRadius) {
			this.dx = -this.dx;
		}
		if(this.y + this.dy < this.ballRadius) {
			this.dy = -this.dy;
		}

		return this.x + this.dx, this.y + this.dy
	}



	move() {
		this.child.push({x:this.x, y:this.y});
		if(this.x + this.dx > this.can_width - this.ballRadius || this.x + this.dx < this.ballRadius) {
			this.dx = -this.dx;
		}
		if(this.y + this.dy < this.ballRadius) {
			this.dy = -this.dy;
		} else if(this.y + this.dy > this.can_height-this.ballRadius) {
			if(this.x > paddle.x && this.x < paddle.x + paddle.width) {
				this.dy = -this.dy;
			} else {
				this.x = this.can_width/2;
				this.y = this.can_height-30;
				this.dx = 0;
				this.dy = 0;
				return false;
			}
		}

		this.x += this.dx;
		this.y += this.dy;
		return true;
	}

}


