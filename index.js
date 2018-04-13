const Two = require('two.js')
const snell = require('./snell')

// Make an instance of two and place it on the page.
var elem = document.getElementById('draw-shapes');
var params = { fullscreen: true };
var two = new Two(params).appendTo(elem);

var rect = two.makeRectangle(50, 50, 100, 100);

rect.fill = 'rgb(0, 200, 255)';
rect.opacity = 0.75;
rect.noStroke();

let xPos = 50
let yPos = 50

document.getElementById('draw-shapes').onmousemove = (e) => {
  xPos = e.clientX
  yPos = e.clientY
};

two.bind('update', function(frameCount) {
  rect.translation.x = xPos
  rect.translation.y = yPos
}).play();  // Finally, start the animation loop