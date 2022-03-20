import { ctx, randCoord } from "./canvas.js";
import { distance, randColor, randInt } from "./helper.js";

const GROW_SPEED = 0.1;
const MAX_CIRCLE_NUMBER = 100000;
const MAX_ITERATIONS = 10000;

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
            let [x, y] = randCoord();
            let tries = 0;
            while (
                this.list.some((circle) => circle.contains(x, y))
            ) {
                tries++;
                if (tries === MAX_ITERATIONS) {
                    console.log(
                        `couldn't find a point after ${MAX_ITERATIONS} iterations`
                    );
                    return;
                }
                [x, y] = randCoord();
            }
            this.list.push(new Circle(x, y, 1));
        }
    }

    static handleTouches() {
        for (let i = 0; i < this.list.length; i++) {
            for (let j = i + 1; j < this.list.length; j++) {
                const c = this.list[i];
                const d = this.list[j];
                if (c.intersects(d)) {
                    c.growingSpeed = -GROW_SPEED;
                    d.growingSpeed = -GROW_SPEED;
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
        this.r += this.growingSpeed;
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
