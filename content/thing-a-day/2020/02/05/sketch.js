let hue = 80
let hueStep = 1.25
let track
let fft
let fCount = 0
let data = []

function preload() {
  soundFormats('mp3')
  track = loadSound('./05-Default-Alive.mp3')
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight - 40, WEBGL)
  background(0)
  fft = new p5.FFT()
  radius = width / 2
  angleMode(DEGREES)
  noSmooth()
  let zero = []
  for (var i = 0; i < 1024; i++) {
    zero.push(0)
  }
  for (var i = 0; i < height / 10; i++) {
    data.push({ hue, spectrum: zero })
  }
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

let fScale = 1
let xRot = 0
let zRot = 0
let zIncr = 0.01

function draw() {
  if (!track.isPlaying()) {
    return
  }

  fCount++
  background(0)

  const currentSpectrum = fft.analyze()

  if (fCount % 2 === 0) {
    hue += hueStep
    if (hue >= 100 || hue <= 60) {
      hueStep *= -1
    }
    data.push({
      hue,
      spectrum: currentSpectrum,
    })
    if (data.length > 50) {
      data.shift()
    }
  }

  noFill()
  noSmooth()
  colorMode(HSB, 100)
  strokeWeight(1)
  noSmooth()
  rotateX(xRot)
  scale(0.75, 1.0)
  translate(-width / 2, -height * 1.5)
  // rotateZ(frameCount / 100)
  //rotateY(frameCount / -100)
  xRot = 42
  zRot += zIncr
  if (zRot >= 13 || zRot <= -13) {
    zIncr *= -1.0
  }
  rotateZ(zRot)

  data.forEach(({ hue, spectrum }, idx) => {
    stroke(hue, 100, 100, 100)

    beginShape()
    for (var i = 0; i < currentSpectrum.length; i += 10) {
      let x = map(i, 0, currentSpectrum.length, 0, width)
      let h = map(currentSpectrum[i], 0, 255, 150, 0) + 30 * idx - (fCount % 30)
      vertex(x, h)
    }
    endShape()
  })
}
