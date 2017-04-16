'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var createCanvas = function createCanvas(element) {
  'use strict';

  var parent = element.parentNode;

  var canvas = document.createElement('canvas');
  canvas.setAttribute('width', element.getAttribute('width'));
  canvas.setAttribute('height', element.getAttribute('height'));
  canvas.setAttribute('style', 'position:absolute;left:0;');
  parent.appendChild(canvas);

  return canvas;
};

exports.default = createCanvas;