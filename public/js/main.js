import { eraseCanvas } from "./canvas.js";
import { Circle } from "./Circle.js";

function loop() {
    eraseCanvas();
    Circle.createCircle();
    Circle.updateCircles();
    Circle.drawCircles();
    requestAnimationFrame(loop);
}

loop();
