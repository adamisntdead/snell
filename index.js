const Two = require('two.js')
const dat = require('dat.gui').default
const snell = require('./snell')

const elem = document.getElementById('draw-shapes')
const two = new Two({ fullscreen: true }).appendTo(elem)

function render(theta1, theta2, medium1, medium2) {
  // Changed Medium
  const medium = two.makeRectangle(
    window.innerWidth / 2,
    window.innerHeight * 0.75,
    window.innerWidth,
    window.innerHeight / 2
  )
  medium.fill = '#cef3ff'
  medium.noStroke()

  const initialReflectStart = [
    -(window.innerHeight * Math.tan(theta1) / 2) + window.innerWidth / 2,
    0
  ]
  const initialReflect = lineToCenter(
    initialReflectStart[0],
    initialReflectStart[1],
    '#ffc4c4'
  )
  // Initial Beam
  const initialStart = [
    window.innerHeight * Math.tan(theta1) / 2 + window.innerWidth / 2,
    0
  ]
  const initial = lineToCenter(initialStart[0], initialStart[1], '#c62727')

  // Refracted Beam
  const refracted = lineToCenter(
    -(window.innerHeight * Math.tan(theta2) / 2) + window.innerWidth / 2,
    window.innerHeight,
    '#1642af'
  )

  // Text
  const textInitial = new Two.Text(
    `Incident Ray, ${medium1} (n = ${snell.refractiveIndices[medium1]})`,
    40,
    40,
    { size: 20, weight: 700, alignment: 'left' }
  )
  two.add(textInitial)

  const textRefracted = new Two.Text(
    `Refracted Ray, ${medium2} (n = ${snell.refractiveIndices[medium2]})`,
    40,
    window.innerHeight / 2 + 40,
    { size: 20, weight: 700, alignment: 'left' }
  )
  two.add(textRefracted)

  two.update()
  return [
    medium,
    initial,
    refracted,
    initialReflect,
    textInitial,
    textRefracted
  ]
}

function lineToCenter(a, b, color) {
  const end = [window.innerWidth / 2, window.innerHeight / 2]
  const line = two.makeLine(a, b, end[0], end[1])

  line.stroke = color
  line.linewidth = 5
  return line
}

let settings = {
  deg1: 0,
  deg2: 0,
  medium1: 'Vacuum',
  medium2: 'Vacuum'
}
let objs
refresh()

function refresh() {
  two.remove(objs)
  settings.deg2 = snell.calculateAngle(
    settings.deg1,
    snell.refractiveIndices[settings.medium1],
    snell.refractiveIndices[settings.medium2]
  )
  objs = render(
    settings.deg1,
    settings.deg2,
    settings.medium1,
    settings.medium2
  )
}

window.onload = function() {
  var gui = new dat.GUI()
  const deg1gui = gui
    .add(settings, 'deg1', -(Math.PI - 0.000001) / 2, (Math.PI - 0.000001) / 2)
    .name('Angle of Incidence (rad)')

  const medium1gui = gui
    .add(settings, 'medium1', Object.keys(snell.refractiveIndices))
    .name('Medium 1')
  const medium2gui = gui
    .add(settings, 'medium2', Object.keys(snell.refractiveIndices))
    .name('Medium 2')

  deg1gui.onChange(refresh)
  medium1gui.onChange(refresh)
  medium2gui.onChange(refresh)
}

window.addEventListener('resize', refresh)
