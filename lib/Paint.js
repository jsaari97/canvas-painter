'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Paint = function Paint() {
  'use strict';

  var tempContext = this.tempContext;
  var pts = this.points;

  if (pts.length < 3) {
    var b = pts[0];
    tempContext.beginPath();
    tempContext.arc(b.x, b.y, tempContext.lineWidth / 2, 0, Math.PI * 2, !0);
    tempContext.fill();
    tempContext.closePath();

    return;
  }

  tempContext.clearRect(0, 0, this.tempElement.width, this.tempElement.height);

  tempContext.beginPath();
  tempContext.moveTo(pts[0].x, pts[0].y);

  for (var i = 1; i < pts.length - 2; i++) {
    var c = (pts[i].x + pts[i + 1].x) / 2;
    var d = (pts[i].y + pts[i + 1].y) / 2;

    tempContext.quadraticCurveTo(pts[i].x, pts[i].y, c, d);
  }

  // For the last 2 points
  tempContext.quadraticCurveTo(pts[i].x, pts[i].y, pts[i + 1].x, pts[i + 1].y);

  tempContext.stroke();
};

exports.default = Paint;