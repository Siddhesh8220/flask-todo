// just for experimentation

var canvas = document.querySelector("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var c = canvas.getContext("2d");

function Circle(x, y, dx, dy, radius, R, G, B) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.R = R;
  this.G = G;
  this.B = B;
  this.radius = radius;

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    c.strokeStyle = `rgb(${R},${G},${B})`;
    c.stroke();
  };

  this.update = function () {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x = this.x + this.dx;
    this.y = this.y + this.dy;

    this.draw();
  };
}

var circleArray = [];

for (var i = 0; i < 10; i++) {
  var x = Math.random() * (innerWidth - 2 * radius) + radius;
  var y = Math.random() * (innerHeight - 2 * radius) + radius;
  var dx = (Math.random() - 0.5) * 8;
  var dy = (Math.random() - 0.5) * 8;
  var radius = 30;
  var R = Math.random() * 255;
  var G = Math.random() * 255;
  var B = Math.random() * 255;
  circleArray.push(new Circle(x, y, dx, dy, radius, R, G, B));
}

function animate() {
  requestAnimationFrame(animate);

  c.clearRect(0, 0, innerWidth, innerHeight);

  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

animate();
