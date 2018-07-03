class Hp {
	constructor(num, canvasWidth) {
		this.lives = num;
		this.canWidth = canvasWidth;
	}

	damage(ctx) {
		this.lives--;
		console.log(this.lives);
	}

	check() {
		if(this.lives == 0) {
			return true;
		}
		return false;
	}

	draw(ctx) {
		ctx.font = "16px Arial";
		ctx.fillStyle = "#0095DD";
		ctx.fillText("Lives: "+this.lives, this.canWidth-65, 20);
	}
}


