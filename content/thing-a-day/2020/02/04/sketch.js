let hue = 80;
let hueStep = 1.25;
let track;
let fft;
let fCount = 0;
let data = []

function preload() {
  soundFormats('mp3');
  track = loadSound('./04-Run.mp3');
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight - 40, WEBGL);
  background(0);
  fft = new p5.FFT();
  radius = width / 2;
  angleMode(DEGREES);
  noSmooth();
  let zero = []
  for (var i = 0; i < 1024; i++) {
    zero.push(0)
  }
  for (var i = 0; i < height/10; i++) {
    data.push({hue, spectrum: zero})
  }
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

  fCount++;
  background(0)

  if (fCount % 2 === 0) {
    hue += hueStep;
    if (hue >= 100 || hue <= 60) {
      hueStep *= -1;
    }
    data.push({
      hue,
      spectrum: fft.analyze()
    })
    if(data.length > height / 10) {
      data.shift()
    }
  }

  noFill();
  noSmooth();
  colorMode(HSB, 100);
  strokeWeight(1);
  noSmooth();
  translate(-width/2, -height/2);

  data.forEach(({ hue, spectrum }, idx) => {
    stroke(hue, 100, 100, 100);
    beginShape();
    for (var i = 0; i < spectrum.length; i += 10) {
      let x = map(i, 0, spectrum.length, 0, width);
      let h = map(spectrum[i], 0, 255, 100, 0) + 10 * idx;
      vertex(x, h);
    }
    endShape();
  })
}
