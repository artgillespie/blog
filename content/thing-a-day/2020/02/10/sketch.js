let cameraY
let fCount = 0
let vertices = []
let scale = 80
let rows
let columns
let w
let h
let hue = 30
let hueInc = 0.2
let yRot = 0
let yInc = 0.1

function preload() {
  soundFormats('mp3')
  track = loadSound('./10-Stop-Running.mp3')
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight - 40, WEBGL)
  cam = createCamera()
  cam.perspective()
  cameraY = height / 2
  colorMode(HSB, 100)
  background(0)
  fft = new p5.FFT()
  angleMode(DEGREES)
  w = width * 4.0
  h = height * 3.0

  rows = round(h / scale)
  columns = round(w / scale)
  hue = 30
}

function togglePlay() {
  track.setVolume(0.5)
  if (track.isPlaying()) {
    track.pause()
  } else {
    track.loop()
  }
}

document.getElementById('play-btn').addEventListener('click', togglePlay)

function draw() {
  /*
  if (!track.isPlaying()) {
    return
  }
  */

  fCount++
  background(0)
  noFill()
  stroke(255)
  translate(w / 2, h / 2)

  rotateX(70)
  yRot += yInc
  rotateY(yRot)
  if (yRot > 25 || yRot < -15) {
    yInc *= -1.0
  }

  translate(-w, -h - yRot)

  const currentSpectrum = fft.analyze()
  let zVals = []
  hue += hueInc
  if (hue >= 70 || hue <= 30) {
    hueInc *= -1.0
  }
  vertices.unshift({ hue, z: zVals })
  for (let x = 0; x < columns; x++) {
    zVals.push(currentSpectrum[x] * 3)
  }

  for (let y = 0; y < vertices.length; y++) {
    let { hue, z } = vertices[y]
    stroke(hue, 100, 100)
    strokeWeight(4.0)
    beginShape(TRIANGLE_STRIP)
    for (let x = 0; x < z.length; x++) {
      vertex(x * scale, y * scale, z[x])
      vertex(x * scale, (y + 1) * scale, z[x])
    }
    endShape()
    if (y * scale > h) {
      vertices.pop()
    }
  }
}
