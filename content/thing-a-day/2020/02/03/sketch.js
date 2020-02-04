let hue = 80;
let hueStep = 1.25;
let radius;
let track;
let fft;
let baseY = 0;
let baseYDir = 20;
let fCount = 0;

function preload() {
  soundFormats('mp3');
  track = loadSound('./03-Origin-Stories.mp3');
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(0);
  fft = new p5.FFT();
  radius = width / 2;
  angleMode(DEGREES);
  noSmooth();
}

function togglePlay() {
  track.setVolume(0.5);
  if (track.isPlaying()) {
    track.pause();
  } else {
    track.loop();
  }
}

document.getElementById('play-btn').addEventListener('click', togglePlay);

function draw() {
  if (!track.isPlaying()) {
    return;
  }

  background(0, 0, 0, 1);
  if (fCount % 22 !== 0) {
    fCount++;
    return;
  }
  fCount++;
  if (baseY === 0) {
    background(0);
  }

  let spectrum = fft.analyze();
  noFill();
  noSmooth();
  colorMode(HSB, 100);
  hue += hueStep;
  if (hue >= 100 || hue <= 60) {
    hueStep *= -1;
  }
  stroke(hue, 100, 100, 100);
  strokeWeight(4);
  noSmooth();
  // rotate(frameCount / 4)
  translate(0, baseY);
  baseY += baseYDir;

  beginShape();
  for (var i = 0; i < spectrum.length; i += 20) {
    let x = map(i, 0, spectrum.length, 0, width);
    let h = map(spectrum[i], 0, 255, 100, 0);
    vertex(x, h);
  }
  endShape();
  baseY + baseYDir;
  if (baseY > 560) {
    baseY = 0;
  }
}
