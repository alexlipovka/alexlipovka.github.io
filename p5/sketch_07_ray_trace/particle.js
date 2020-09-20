class Particle {
	constructor() {
		this.fov = 60;
		this.pos = createVector(width / 2, height / 2);
		this.rays = [];
		this.heading = 0;
		this.res = 400;
		this.as = this.fov / this.res;
		for (let a = -this.fov / 2; a < this.fov / 2; a += this.as) {
			this.rays.push(new Ray(this.pos, radians(a)));
		}
	}

	updateRes(res) {
		this.res = res;
		this.as = this.fov / this.res;
		this.rays = [];
		for (let a = -this.fov / 2; a < this.fov / 2; a += this.as) {
			this.rays.push(new Ray(this.pos, radians(a) + this.heading));
		}
	}

	updateFOV(fov) {
		this.fov = fov;
		this.as = this.fov / this.res;
		this.rays = [];
		for (let a = -this.fov / 2; a < this.fov / 2; a += this.as) {
			this.rays.push(new Ray(this.pos, radians(a) + this.heading));
		}
	}

	rotate(angle) {
		this.heading += angle;
		let index = 0;
		for (let a = -this.fov / 2; a < this.fov / 2; a += this.as) {
			this.rays[index].setAngle(radians(a) + this.heading);
			index++;
		}
	}

	move(step) {
		const vel = p5.Vector.fromAngle(this.heading);
		vel.setMag(step);
		this.pos.add(vel);
	}

	update(x, y) {
		this.pos.set(x, y);
	}

	look(walls) {
		const scene = [];
		for (let i = 0; i < this.rays.length; i++) {
			const ray = this.rays[i];
			let closest = null;
			let record = Infinity;
			for (let wall of walls) {
				const pt = ray.cast(wall);
				if (pt) {
					let d = p5.Vector.dist(this.pos, pt);
					//устаранение фишай-эффекта
					const a = ray.dir.heading() - this.heading;
					if (!mouseIsPressed && this.fov < 180) {
						d *= cos(a);
					}
					if (d < record) {
						record = d;
						closest = pt;
					}
				}
			}
			if (closest) {
				stroke(255, 120);
				line(this.pos.x, this.pos.y, closest.x, closest.y);
				noStroke();
				ellipse(closest.x, closest.y, 5);
				// text(round(degrees(ray.dir.heading())), closest.x, closest.y);
			}
			scene[i] = record;
		}
		return scene;
	}

	show() {
		push();
		fill(255, 0, 0);
		ellipse(this.pos.x, this.pos.y, 5);
		// for (let ray of this.rays) {
		// 	ray.show();
		// }
		stroke(255, 0, 0);
		const vel = p5.Vector.fromAngle(this.heading);
		vel.setMag(100);
		line(this.pos.x, this.pos.y, this.pos.x + vel.x, this.pos.y + vel.y);
		pop();
	}
}
