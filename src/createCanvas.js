const createCanvas = function (element) {
  'use strict'
  const parent = element.parentNode

  const canvas = document.createElement('canvas')
  canvas.setAttribute('width', element.getAttribute('width'))
  canvas.setAttribute('height', element.getAttribute('height'))
  canvas.setAttribute('style', 'position:absolute;left:0;')
  parent.appendChild(canvas)

  return canvas
}

export default createCanvas
