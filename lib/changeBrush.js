'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var changeBrush = function changeBrush(brushOptions) {
  this.brush = _extends({
    size: 5,
    color: 'black'
  }, this.brush, brushOptions);
  var context = this.tempContext;

  context.lineWidth = this.brush.size;
  context.lineJoin = 'round';
  context.lineCap = 'round';
  context.strokeStyle = this.brush.color;
  context.fillStyle = this.brush.color;
};

exports.default = changeBrush;