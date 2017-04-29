import Paint from './Paint'
import CreateCanvas from './CreateCanvas'

function CanvasPainter ({ element, brush, refreshRate, onStart, onDraw, onEnd }) {
  this.brush = brush
  this.context = element.getContext('2d')
  this.tempElement = CreateCanvas(element)
  this.tempContext = this.tempElement.getContext('2d')
  this.Paint = Paint.bind(this)
  this.refreshRate = refreshRate || 3
  this.points = []
  this.count = 0
  this.onEnd = onEnd
  this.onStart = onStart
  this.onDraw = onDraw
  this.role = ''
  window.addEventListener('clearCanvas', this.clearCanvas, false)
}

CanvasPainter.prototype.applyStroke = () => {
  this.points = []
  this.count = 0
  this.context.drawImage(this.tempElement, 0, 0)
  this.tempContext.clearRect(0, 0, this.tempElement.width, this.tempElement.height)
}

CanvasPainter.prototype.changeBrush = (brushOptions) => {
  const brush = {
    size: 5,
    color: 'black',
    ...this.brush,
    ...brushOptions
  }
  this.tempContext.lineWidth = brush.size
  this.tempContext.lineJoin = 'round'
  this.tempContext.lineCap = 'round'
  this.tempContext.strokeStyle = brush.color
  this.tempContext.fillStyle = brush.color
}

CanvasPainter.prototype.addPoint = ({ pageX, pageY }) => {
  const x = pageX - this.tempElement.offsetLeft
  const y = pageY - this.tempElement.offsetTop

  const point = { x, y }

  this.count++

  if (this.count % this.refreshRate === 0) {
    this.points.push(point)
    this.Paint()

    if (typeof this.onDraw === 'function') {
      this.onDraw(point)
    }
  } else if (this.count < 3) {
    this.points.push(point)
    this.Paint()

    if (typeof this.onDraw === 'function') {
      this.onDraw(point)
    }
  }
}
CanvasPainter.prototype.onMouseDown = (e) => {
  this.tempElement.addEventListener('mousemove', this.addClick, false)
  this.tempElement.addEventListener('mouseleave', this.onMouseUp, false)

  if (typeof this.onStart === 'function') {
    this.onStart(this.brush)
  }

  this.addClick(e)
}

CanvasPainter.prototype.onMouseUp = (e) => {
  this.tempElement.removeEventListener('mousemove', this.addClick, false)
  this.tempElement.removeEventListener('mouseleave', this.onMouseUp, false)

  this.applyStroke()

  if (typeof this.onEnd === 'function') {
    this.onEnd(e)
  }
}

CanvasPainter.prototype.init = () => {
  if (this.role !== 'painter') {
    if (this.role === 'guesser') {
      window.removeEventListener('onDraw', this.onDrawEvent, false)
      window.removeEventListener('onEnd', this.applyStroke, false)
    }
    this.tempElement.addEventListener('mousedown', this.onMouseDown, false)
    this.tempElement.addEventListener('mouseup', this.onMouseUp, false)
    this.role = 'painter'
  }
}

CanvasPainter.prototype.clearCanvas = () => {
  this.context.clearRect(0, 0, this.tempElement.width, this.tempElement.height)
  this.count = 0
  this.points = []
}

CanvasPainter.prototype.onDrawEvent = (e) => {
  this.points.push(e.detail)
  this.Paint()
}

CanvasPainter.prototype.watch = () => {
  if (this.role !== 'guesser') {
    if (this.role === 'painter') {
      this.tempElement.removeEventListener('mousedown', this.onMouseDown, false)
      this.tempElement.removeEventListener('mouseup', this.onMouseUp, false)
    }
    window.addEventListener('onDraw', this.onDrawEvent, false)
    window.addEventListener('onEnd', this.applyStroke, false)
    this.role = 'guesser'
  }
}

export default CanvasPainter
