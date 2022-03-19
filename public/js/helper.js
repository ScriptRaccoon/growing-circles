export function randInt(a, b) {
    return a + Math.floor((b - a) * Math.random());
}

export function distance(x, y, u, v) {
    return Math.sqrt(Math.pow(x - u, 2) + Math.pow(y - v, 2));
}

export function randColor() {
    const r = randInt(50, 255);
    const g = randInt(0, 50);
    const b = randInt(50, 255);
    return `rgb(${r},${g},${b})`;
}
