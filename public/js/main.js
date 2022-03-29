import { clearCanvas } from "./canvas.js";
import { Circle } from "./Circle.js";

function loop() {
    clearCanvas();
    Circle.createCircle();
    Circle.updateCircles();
    Circle.shrinkAfterTouch();
    Circle.drawCircles();
    requestAnimationFrame(loop);
}

loop();
