import { Circle } from "./circle.js";
import { randInt, erase } from "./helper.js";

const MAX_CIRCLE_NUMBER = 100000;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function adjustCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

adjustCanvas();
window.addEventListener("resize", adjustCanvas);

const circleList = [];

function touchingCircles() {
    for (let i = 0; i < circleList.length; i++) {
        const c = circleList[i];
        for (let j = i + 1; j < circleList.length; j++) {
            const d = circleList[j];
            if (c.intersects(d)) {
                c.growingSpeed = -0.1;
                d.growingSpeed = -0.1;
            }
        }
    }
}

function updateCircles() {
    circleList.forEach((c) => c.update(ctx));
}

function drawCircles() {
    circleList.forEach((c) => c.draw(ctx));
}

function newCircle() {
    if (circleList.length < MAX_CIRCLE_NUMBER) {
        let x = randInt(0, canvas.width);
        let y = randInt(0, canvas.height);
        let tries = 0;
        while (circleList.some((c) => c.contains(x, y))) {
            tries++;
            x = randInt(0, canvas.width);
            y = randInt(0, canvas.height);
            if (tries === 10000) {
                console.log("couldn't find a point after 10000 iterations");
                return;
            }
        }

        let newCircle = new Circle(x, y, 1);
        circleList.push(newCircle);
    }
}

function loop() {
    touchingCircles();
    updateCircles();
    newCircle();
    erase(ctx);
    drawCircles();
    requestAnimationFrame(loop);
}

loop();
