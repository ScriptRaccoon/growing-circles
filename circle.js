import { distance, randColor } from "./helper.js";

const GROW_SPEED = 0.1;

export class Circle {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.growingSpeed = GROW_SPEED;
        this.color = randColor();
    }

    update(ctx) {
        this.r = this.r + this.growingSpeed;
        if (this.r <= 1) {
            this.r = 1;
            this.growingSpeed = GROW_SPEED;
        }
    }

    draw(ctx) {
        ctx.globalAlpha = Math.min(this.r / 10, 1);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.globalAlpha = 1;
    }

    contains(u, v) {
        return distance(this.x, this.y, u, v) <= this.r;
    }

    intersects(other) {
        return distance(this.x, this.y, other.x, other.y) <= this.r + other.r;
    }
}
