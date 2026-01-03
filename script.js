const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let w, h;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

ctx.globalCompositeOperation = "lighter";

const petals = [];
const petalCount = 120;
const center = { x: w / 2, y: h / 2 };

class Petal {
  constructor(angle) {
    this.angle = angle;
    this.radius = 0;
    this.speed = Math.random() * 0.6 + 0.4;
    this.life = 0;
    this.maxLife = 240 + Math.random() * 60;
    this.size = Math.random() * 1.4 + 0.6;
  }

  update() {
    this.life++;
    this.radius += this.speed;
  }

  draw() {
    const progress = this.life / this.maxLife;
    const ease = 1 - Math.pow(1 - progress, 3);

    const x =
      center.x +
      Math.cos(this.angle) * this.radius * ease;
    const y =
      center.y +
      Math.sin(this.angle) * this.radius * ease;

    const glow = 25 * (1 - progress);

    ctx.beginPath();
    ctx.fillStyle = `rgba(255,120,200,${0.15 * (1 - progress)})`;
    ctx.shadowBlur = glow;
    ctx.shadowColor = "rgba(255,120,200,0.9)";
    ctx.arc(x, y, 4 * this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function spawnFlower() {
  for (let i = 0; i < petalCount; i++) {
    petals.push(
      new Petal((Math.PI * 2 * i) / petalCount)
    );
  }
}

spawnFlower();

function animate() {
  ctx.clearRect(0, 0, w, h);

  petals.forEach((p) => {
    p.update();
    p.draw();
  });

  requestAnimationFrame(animate);
}

animate();
