export function randInt(a, b) {
    return a + Math.floor((b - a) * Math.random());
}

export function erase(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

export function distance(x, y, u, v) {
    return Math.sqrt(Math.pow(x - u, 2) + Math.pow(y - v, 2));
}

export function randColor() {
    return `rgb(${randInt(50, 255)},${randInt(0, 50)},${randInt(50, 255)})`;
}
