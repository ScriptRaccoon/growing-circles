import { randInt } from "./helper.js";

export const canvas = document.getElementById("canvas");
export const ctx = canvas.getContext("2d");

function adjustCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

adjustCanvas();

window.addEventListener("resize", adjustCanvas);

export function eraseCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

export function randCoord() {
    return [randInt(0, canvas.width), randInt(0, canvas.height)];
}
