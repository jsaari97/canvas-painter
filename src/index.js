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
    this.tempElement.addEventListener('mousedown', this.onMouseDown, false)
    this.tempElement.addEventListener('mouseup', this.onMouseUp, false)
  }

  this.watch = () => {
    this.addEventListener('onDraw', e => {
      this.points.push(e.detail)
      this.Paint()
    }, false)

    this.addEventListener('onEnd', e => {
      this.applyStroke()
    }, false)
  }
}

export default CanvasPainter
