const changeBrush = function (brushOptions) {
  this.brush = {
    size: 5,
    color: 'black',
    ...this.brush,
    ...brushOptions
  }
  const context = this.tempContext

  context.lineWidth = this.brush.size
  context.lineJoin = 'round'
  context.lineCap = 'round'
  context.strokeStyle = this.brush.color
  context.fillStyle = this.brush.color
}

export default changeBrush
