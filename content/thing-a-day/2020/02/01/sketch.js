let hue = 60
let hueStep = 1
let radius
let track

function preload() {
  soundFormats('m4a')
  track = loadSound('./audio.m4a')
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight)
  background(0)
  radius = width / 2
  angleMode(DEGREES)
}

document.getElementById('play-btn').addEventListener('click', () => {
  console.log('foo')
  track.setVolume(0.5)
  if (track.isPlaying()) {
    track.pause()
  } else {
    track.play()
  }
})

function draw() {
  // background(0, 0, 0, 1)
  if (!track.isPlaying()) {
    return
  }
  noFill()
  colorMode(HSB, 100)
  if (frameCount % 10 !== 0) {
    return
  }
  hue += hueStep
  if (hue >= 100) {
    hueStep *= -1
  }
  if (hue <= 60) {
    hueStep *= -1
  }
  stroke(hue, 100, 100, 75)
  strokeWeight(1)
  translate(width / 2, height / 2)
  rotate(frameCount / 2)
  scale(1 + 0.001 * frameCount)
  line(-100, 50, 100, 50)
}

function morphingCircle() {
  background(0, 0, 0, 4)
  noFill()
  colorMode(HSB, 100)
  stroke((frameCount / 3) % 100, 100, 100, 50)
  strokeWeight(1)
  translate(width / 2, height / 2)
  rotate(frameCount / 2)
  beginShape()
  for (let i = 0; i < 360; i++) {
    let n = noise(i / 25, frameCount / 300)
    const x = cos(i) * radius * n
    const y = sin(i) * radius * n
    vertex(x, y)
  }
  endShape(CLOSE)
}
