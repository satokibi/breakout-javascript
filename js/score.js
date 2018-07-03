
class Score {
	constructor(num) {
		this.score = 0;
		this.num = num;
	}

	plus() {
		this.score += this.num;
	}

	draw(ctx) {
		ctx.font = "16px Arial";
		ctx.fillStyle = "#0095DD";
		ctx.fillText("Score: " + this.score, 8, 20);
	}
}


