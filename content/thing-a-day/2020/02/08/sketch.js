let hue = 60
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
  track = loadSound('./08-I-Know-Kung-Fu.mp3')
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
  strokeWeight(2)
  // translate(-width / 2, -height / 2)
  cam.perspective()
  // cam.setPosition(width / 2, height / 2, -600)
  rotateZ(fCount / 5)

  for (var idx = 0; idx <= 75; idx++) {
    noFill()
    //fill(0)
    stroke(map(idx, 0, 75, 90, 30), 100, 100, 100)
    beginShape()
    for (var i = 0; i < currentSpectrum.length / 2; i += 10) {
      let x = map(i, 0, currentSpectrum.length / 2, -width / 2, 0)
      let h = map(currentSpectrum[i], 0, 255, 300, 0)
      vertex(x, h, map(idx, 0, 75, -13000, -500) + fCount * 4)
    }
    for (var i = currentSpectrum.length / 2; i >= 0; i -= 10) {
      let x = map(i, currentSpectrum.length / 2, 0, 0, width / 2)
      let h = map(currentSpectrum[i], 0, 255, 300, 0)
      vertex(x, h, map(idx, 0, 75, -13000, -500) + fCount * 4)
    }
    endShape()
  }
}
