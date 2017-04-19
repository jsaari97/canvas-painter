import Paint from './draw'
import changeBrush from './changeBrush'
import createCanvas from './createCanvas'

const CanvasPainter = function ({ element, brush, refreshRate, onStart, onDraw, onEnd }) {
  this.brush = brush
  this.context = element.getContext('2d')
  this.createCanvas = createCanvas.bind(this)
  this.tempElement = createCanvas(element)
  this.tempContext = this.tempElement.getContext('2d')
  this.Paint = Paint.bind(this)
  this.changeBrush = changeBrush.bind(this)
  this.points = []
  this.count = 0
  this.onEnd = onEnd
  this.onStart = onStart
  this.role = ''

  this.changeBrush(this.brush)

  this.applyStroke = () => {
    this.points = []
    this.count = 0
    this.context.drawImage(this.tempElement, 0, 0)
    this.tempContext.clearRect(0, 0, this.tempElement.width, this.tempElement.height)
  }

  this.addClick = ({ pageX, pageY }) => {
    const x = pageX - this.tempElement.offsetLeft
    const y = pageY - this.tempElement.offsetTop

    const point = {
      x,
      y
    }

    this.count++

    if (this.count % refreshRate === 0) {
      this.points.push(point)
      this.Paint()

      if (typeof onDraw === 'function') {
        onDraw(point)
      }
    } else if (this.count < 3) {
      this.points.push(point)
      this.Paint()

      if (typeof onDraw === 'function') {
        onDraw(point)
      }
    }
  }

  this.onMouseDown = (e) => {
    this.tempElement.addEventListener('mousemove', this.addClick, false)
    this.tempElement.addEventListener('mouseleave', this.onMouseUp, false)

    if (typeof this.onStart === 'function') {
      this.onStart(this.brush)
    }

    this.addClick(e)
  }

  this.onMouseUp = (e) => {
    this.tempElement.removeEventListener('mousemove', this.addClick, false)
    this.tempElement.removeEventListener('mouseleave', this.onMouseUp, false)

    this.applyStroke()

    if (typeof this.onEnd === 'function') {
      this.onEnd(e)
    }
  }

  this.init = () => {
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

  this.clearCanvas = () => {
    this.context.clearRect(0, 0, element.width, element.height)
    this.count = 0
    this.points = []
  }

  this.onDrawEvent = (e) => {
    this.points.push(e.detail)
    this.Paint()
  }

  window.addEventListener('clearCanvas', this.clearCanvas, false)

  this.watch = () => {
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
}

export default CanvasPainter
