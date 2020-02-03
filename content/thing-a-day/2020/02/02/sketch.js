let hue = 60
let hueStep = 1
let radius
let track
let fft
let zoom = 0.25
let zoomDir = 1

function preload() {
  soundFormats('mp3')
  track = loadSound('./02-Palindrome.mp3')
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight)
  background(0)
  fft = new p5.FFT()
  radius = width / 2
  angleMode(DEGREES)
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
  background(0, 0, 0, 1)
  if (!track.isPlaying()) {
    return
  }
  if (frameCount % 4 !== 0) {
    return
  }
  // background(0)

  let spectrum = fft.analyze()
  noFill()
  colorMode(HSB, 100)
  hue += hueStep
  if (hue >= 100 || hue <= 60) {
    hueStep *= -1
  }
  stroke(hue, 100, 100, 50)
  strokeWeight(4)
  noSmooth()
  zoom = zoom + zoomDir * 0.01
  if (zoom > 1.25 || zoom <= 0.25) {
    zoomDir *= -1
  }
  scale(zoom, zoom)
  // rotate(frameCount / 4)
  beginShape()
  for (var i = 0; i < spectrum.length; i += 20) {
    let x = map(i, 0, spectrum.length, 0, width)
    let h = map(spectrum[i], 0, 255, height, 0)
    vertex(x, h) // , width / spectrum.length, h)
  }
  endShape()
}
