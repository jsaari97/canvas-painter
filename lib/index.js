'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Paint = require('./Paint');

var _Paint2 = _interopRequireDefault(_Paint);

var _CreateCanvas = require('./CreateCanvas');

var _CreateCanvas2 = _interopRequireDefault(_CreateCanvas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CanvasPainter(_ref) {
  var element = _ref.element,
      brush = _ref.brush,
      refreshRate = _ref.refreshRate,
      onStart = _ref.onStart,
      onDraw = _ref.onDraw,
      onEnd = _ref.onEnd;

  this.brush = brush;
  this.context = element.getContext('2d');
  this.tempElement = (0, _CreateCanvas2.default)(element);
  this.tempContext = this.tempElement.getContext('2d');
  this.Paint = _Paint2.default.bind(this);
  this.refreshRate = refreshRate || 3;
  this.points = [];
  this.count = 0;
  this.onEnd = onEnd;
  this.onStart = onStart;
  this.onDraw = onDraw;
  this.role = '';
  window.addEventListener('clearCanvas', this.clearCanvas, false);
}

CanvasPainter.prototype.applyStroke = function () {
  undefined.points = [];
  undefined.count = 0;
  undefined.context.drawImage(undefined.tempElement, 0, 0);
  undefined.tempContext.clearRect(0, 0, undefined.tempElement.width, undefined.tempElement.height);
};

CanvasPainter.prototype.changeBrush = function (brushOptions) {
  var brush = _extends({
    size: 5,
    color: 'black'
  }, undefined.brush, brushOptions);
  undefined.tempContext.lineWidth = brush.size;
  undefined.tempContext.lineJoin = 'round';
  undefined.tempContext.lineCap = 'round';
  undefined.tempContext.strokeStyle = brush.color;
  undefined.tempContext.fillStyle = brush.color;
};

CanvasPainter.prototype.addPoint = function (_ref2) {
  var pageX = _ref2.pageX,
      pageY = _ref2.pageY;

  var x = pageX - undefined.tempElement.offsetLeft;
  var y = pageY - undefined.tempElement.offsetTop;

  var point = { x: x, y: y };

  undefined.count++;

  if (undefined.count % undefined.refreshRate === 0) {
    undefined.points.push(point);
    undefined.Paint();

    if (typeof undefined.onDraw === 'function') {
      undefined.onDraw(point);
    }
  } else if (undefined.count < 3) {
    undefined.points.push(point);
    undefined.Paint();

    if (typeof undefined.onDraw === 'function') {
      undefined.onDraw(point);
    }
  }
};
CanvasPainter.prototype.onMouseDown = function (e) {
  undefined.tempElement.addEventListener('mousemove', undefined.addClick, false);
  undefined.tempElement.addEventListener('mouseleave', undefined.onMouseUp, false);

  if (typeof undefined.onStart === 'function') {
    undefined.onStart(undefined.brush);
  }

  undefined.addClick(e);
};

CanvasPainter.prototype.onMouseUp = function (e) {
  undefined.tempElement.removeEventListener('mousemove', undefined.addClick, false);
  undefined.tempElement.removeEventListener('mouseleave', undefined.onMouseUp, false);

  undefined.applyStroke();

  if (typeof undefined.onEnd === 'function') {
    undefined.onEnd(e);
  }
};

CanvasPainter.prototype.init = function () {
  if (undefined.role !== 'painter') {
    if (undefined.role === 'guesser') {
      window.removeEventListener('onDraw', undefined.onDrawEvent, false);
      window.removeEventListener('onEnd', undefined.applyStroke, false);
    }
    undefined.tempElement.addEventListener('mousedown', undefined.onMouseDown, false);
    undefined.tempElement.addEventListener('mouseup', undefined.onMouseUp, false);
    undefined.role = 'painter';
  }
};

CanvasPainter.prototype.clearCanvas = function () {
  undefined.context.clearRect(0, 0, undefined.tempElement.width, undefined.tempElement.height);
  undefined.count = 0;
  undefined.points = [];
};

CanvasPainter.prototype.onDrawEvent = function (e) {
  undefined.points.push(e.detail);
  undefined.Paint();
};

CanvasPainter.prototype.watch = function () {
  if (undefined.role !== 'guesser') {
    if (undefined.role === 'painter') {
      undefined.tempElement.removeEventListener('mousedown', undefined.onMouseDown, false);
      undefined.tempElement.removeEventListener('mouseup', undefined.onMouseUp, false);
    }
    window.addEventListener('onDraw', undefined.onDrawEvent, false);
    window.addEventListener('onEnd', undefined.applyStroke, false);
    undefined.role = 'guesser';
  }
};

exports.default = CanvasPainter;