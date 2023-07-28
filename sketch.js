const numFrames = 250;
let x1, y1, x2, y2, xOG, yOG;
const points = 500;
const delayFactor = 1.7;
let noiseScale;
let arr_points = [];
let max_i = 8;

function setup() {
  createCanvas(750, 350);
  background(0);

  xOG = (t, i, max) => {
    let noiseMin = i ? i>2 : i+2;
    let noiseScale = noiseMin / 50;
    let noiseVal = noise(t * noiseScale) * 100;
    return (cos((TWO_PI / max) * i) * 100) + 15 * cos(TWO_PI * (t + noiseVal));
  }

  yOG = (t, i, max) => {
    let noiseMin = i<=2 ? i+2 : i-2;
    let noiseScale = noiseMin / 100;
    let noiseVal = noise((t + 1) * noiseScale) * 100;
    return (sin((TWO_PI / max) * i) * 100) + 20 * sin(TWO_PI * (t + noiseVal));
  }
}

function draw() {
  arr_points = [];
  translate(width / 2, height / 2);

  let t = frameCount / numFrames;

  background(0);
  push();
  stroke(255);
  strokeWeight(5);
  for (let i = 0; i < max_i; i += 1) {
    let x_point = xOG(t, i, max_i);
    let y_point = yOG(t, i, max_i);
    point(x_point, y_point);

    arr_points.push({ x: x_point, y: y_point });
  }
  pop();

  push();
  stroke(255, 35)
  strokeWeight(1);
  for (let i = 0; i < max_i; i += 1) {
    for (let k = 0; k < max_i; k += 1) {
      noiseScale = i / max_i;
      for (let j = 0; j <= points; j++) {
        let tt = j / points;
        let delayed = (t - delayFactor * tt);
        let delayed2 = (t - delayFactor * (1 - tt));
        let x_line = lerp(xOG(delayed, i, max_i), arr_points[k].x, tt);
        let y_line = lerp(yOG(delayed2, i, max_i), arr_points[k].y, tt);
          point(x_line, y_line);
      }
    }
  }
  pop();
}