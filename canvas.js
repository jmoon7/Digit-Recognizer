
var canvas, ctx,
    flag = false,
    paths = [],
    curPath = [];

function init() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext("2d");
  w = canvas.width;
  h = canvas.height;
  ctx.strokeStyle = "black";
  ctx.lineWidth = 15;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  canvas.addEventListener("mousemove", function (e) {
    move(e)
  });
  canvas.addEventListener("mousedown", function (e) {
    down(e)
  });
  canvas.addEventListener("mouseup", function (e) {
    up(e)
  });
  canvas.addEventListener("mouseout", function (e) {
    up(e)
  });
}

function down(e) {
  x = Math.round(e.clientX) - canvas.offsetLeft;
  y = Math.round(e.clientY) - canvas.offsetTop;
  curPath.push([x, y]);
  flag = true;
}

function up(e) {
  if (curPath.length > 1) {
    paths.push(curPath);
  }
  curPath = [];
  flag = false;
}

function move(e) {
  if (flag) {
    x = Math.round(e.clientX) - canvas.offsetLeft;
    y = Math.round(e.clientY) - canvas.offsetTop;
    curPath.push([x, y]);
    for (var i = 0; i < paths.length; i++) {
      if (paths[i].length > 0) {
        draw(paths[i]);
      }
    }
    draw(curPath);
  }
}

function draw(path) {
  ctx.beginPath();
  ctx.moveTo(path[0][0], path[0][1]);
  for (var i = 0; i < path.length - 1; i++) {
    var xc = (path[i][0] + path[i + 1][0]) / 2;
    var yc = (path[i][1] + path[i + 1][1]) / 2;
    ctx.quadraticCurveTo(path[i][0], path[i][1], xc, yc);
  }
  ctx.stroke();
  ctx.closePath();
}

function erase() {
  ctx.clearRect(0, 0, w, h);
  paths = [];
  curPath = [];
}
