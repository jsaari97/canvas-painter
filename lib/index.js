'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draw = require('./draw');

var _draw2 = _interopRequireDefault(_draw);

var _changeBrush = require('./changeBrush');

var _changeBrush2 = _interopRequireDefault(_changeBrush);

var _createCanvas = require('./createCanvas');

var _createCanvas2 = _interopRequireDefault(_createCanvas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CanvasPainter = function CanvasPainter(_ref) {
  var _this = this;

  var element = _ref.element,
      brush = _ref.brush,
      refreshRate = _ref.refreshRate,
      onStart = _ref.onStart,
      onDraw = _ref.onDraw,
      onEnd = _ref.onEnd;

  this.brush = brush;
  this.context = element.getContext('2d');
  this.createCanvas = _createCanvas2.default.bind(this);
  this.tempElement = (0, _createCanvas2.default)(element);
  this.tempContext = this.tempElement.getContext('2d');
  this.Paint = _draw2.default.bind(this);
  this.changeBrush = _changeBrush2.default.bind(this);
  this.points = [];
  this.count = 0;
  this.onEnd = onEnd;
  this.onStart = onStart;

  this.changeBrush(this.brush);

  this.applyStroke = function () {
    _this.points = [];
    _this.count = 0;
    _this.context.drawImage(_this.tempElement, 0, 0);
    _this.tempContext.clearRect(0, 0, _this.tempElement.width, _this.tempElement.height);
  };

  this.addClick = function (_ref2) {
    var pageX = _ref2.pageX,
        pageY = _ref2.pageY;

    var x = pageX - _this.tempElement.offsetLeft;
    var y = pageY - _this.tempElement.offsetTop;

    var point = {
      x: x,
      y: y
    };

    _this.count++;

    if (_this.count % refreshRate === 0) {
      _this.points.push(point);
      _this.Paint();

      if (typeof onDraw === 'function') {
        onDraw(point);
      }
    } else if (_this.count < 3) {
      _this.points.push(point);
      _this.Paint();

      if (typeof onDraw === 'function') {
        onDraw(point);
      }
    }
  };

  this.onMouseDown = function (e) {
    _this.tempElement.addEventListener('mousemove', _this.addClick, false);

    if (typeof _this.onStart === 'function') {
      _this.onStart(_this.brush);
    }

    _this.addClick(e);
  };

  this.onMouseUp = function (e) {
    _this.tempElement.removeEventListener('mousemove', _this.addClick, false);

    _this.applyStroke();

    if (typeof _this.onEnd === 'function') {
      _this.onEnd(e);
    }
  };

  this.init = function () {
    _this.tempElement.addEventListener('mousedown', _this.onMouseDown, false);
    _this.tempElement.addEventListener('mouseup', _this.onMouseUp, false);
  };
};

exports.default = CanvasPainter;