import { ctx, canvas } from "./canvas.js";
import { distance, randColor, randInt } from "./helper.js";

const GROW_SPEED = 0.1;
const MAX_CIRCLE_NUMBER = 100000;

export class Circle {
    static list = [];

    static updateCircles() {
        this.list.forEach((c) => c.update());
        Circle.handleTouches();
    }

    static drawCircles() {
        this.list.forEach((c) => c.draw(ctx));
    }

    static createCircle() {
        if (this.list.length < MAX_CIRCLE_NUMBER) {
            let x = randInt(0, canvas.width);
            let y = randInt(0, canvas.height);
            let tries = 0;
            while (
                this.list.some((circle) => circle.contains(x, y))
            ) {
                tries++;
                x = randInt(0, canvas.width);
                y = randInt(0, canvas.height);
                if (tries === 10000) {
                    console.log(
                        "couldn't find a point after 10000 iterations"
                    );
                    return;
                }
            }
            this.list.push(new Circle(x, y, 1));
        }
    }

    static handleTouches() {
        for (let i = 0; i < this.list.length; i++) {
            const c = this.list[i];
            for (let j = i + 1; j < this.list.length; j++) {
                const d = this.list[j];
                if (c.intersects(d)) {
                    c.growingSpeed = -0.1;
                    d.growingSpeed = -0.1;
                }
            }
        }
    }

    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.growingSpeed = GROW_SPEED;
        this.color = randColor();
    }

    update() {
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
        return (
            distance(this.x, this.y, other.x, other.y) <=
            this.r + other.r
        );
    }
}
