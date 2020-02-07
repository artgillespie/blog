let hue = 80
let hueStep = 1.25
let track
let fft
let fCount = 0
let data = []
let cam
let cameraY
let cameraYIncr = -1

function preload() {
  soundFormats('mp3')
  track = loadSound('./06-Default-Dead.mp3')
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight - 40, WEBGL)
  cam = createCamera()
  cam.perspective()
  cameraY = height / 2
  background(0)
  fft = new p5.FFT()
  radius = width / 2
  angleMode(DEGREES)
  // noSmooth()
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

  cameraY += cameraYIncr
  if (cameraY <= 0 || cameraY >= height / 2) {
    cameraYIncr *= -1
  }

  colorMode(HSB, 100)
  strokeWeight(1)
  translate(-width / 2, -height / 2)
  cam.perspective()
  cam.setPosition(width / 2, cameraY, -600)

  for (var idx = 0; idx <= 100; idx++) {
    noFill()
    //fill(0)
    stroke(idx / 10, 100, 100, 100)
    beginShape()
    for (var i = 0; i < currentSpectrum.length; i += 10) {
      let x = map(i, 0, currentSpectrum.length, 0, width)
      let h = map(currentSpectrum[i], 0, 255, 150, 0)
      vertex(x, h, map(idx, 0, 100, -5000, 0))
    }
    endShape()
  }
}
