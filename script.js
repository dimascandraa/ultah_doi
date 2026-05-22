const revealButton = document.getElementById("revealButton");
const flipCardInner = document.querySelector(".flip-card-inner");
const colorButton = document.getElementById("colorButton");
const root = document.documentElement;

if (revealButton) {
  revealButton.addEventListener("click", () => {
    if (flipCardInner) {
      flipCardInner.style.transform = "rotateY(180deg)";
    }
    createConfettiBurst(70);
    revealButton.textContent = "Selamat!";
  });
}

if (colorButton) {
  colorButton.addEventListener("click", () => {
    const themes = [
      { accent: "#ff7aa8", accent2: "#78d1ff" },
      { accent: "#f8c26d", accent2: "#9b5cff" },
      { accent: "#78ffda", accent2: "#ff6b96" },
      { accent: "#8ad7ff", accent2: "#ff8ad8" }
    ];
    const index = Math.floor(Math.random() * themes.length);
    root.style.setProperty("--accent", themes[index].accent);
    root.style.setProperty("--accent2", themes[index].accent2);
    createConfettiBurst(40);
  });
}

const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");
let confettiPieces = [];
let width = 0;
let height = 0;

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function randomRange(min, max) {
  return min + Math.random() * (max - min);
}

function createConfettiBurst(count) {
  for (let i = 0; i < count; i++) {
    confettiPieces.push({
      x: randomRange(0, width),
      y: randomRange(-20, height / 2),
      size: randomRange(6, 12),
      speed: randomRange(1.2, 3.8),
      angle: randomRange(0, Math.PI * 2),
      spin: randomRange(0.05, 0.18),
      color: `hsl(${Math.floor(randomRange(0, 360))}, 90%, 65%)`,
      opacity: randomRange(0.75, 1)
    });
  }
}

function updateConfetti() {
  ctx.clearRect(0, 0, width, height);
  confettiPieces = confettiPieces.filter((piece) => piece.y < height + piece.size);
  confettiPieces.forEach((piece) => {
    piece.y += piece.speed;
    piece.x += Math.sin(piece.angle) * 0.9;
    piece.angle += piece.spin;
    ctx.fillStyle = piece.color;
    ctx.globalAlpha = piece.opacity;
    ctx.fillRect(piece.x, piece.y, piece.size * 1.2, piece.size * 0.6);
  });
  ctx.globalAlpha = 1;
  requestAnimationFrame(updateConfetti);
}

updateConfetti();

const envelopeCard = document.getElementById("envelopeCard");
const envelopeMessage = document.getElementById("envelopeMessage");

if (envelopeCard && envelopeMessage) {
  envelopeCard.addEventListener("click", () => {
    envelopeMessage.classList.toggle("hidden");
    envelopeCard.classList.toggle("open");
  });
}

const galleryImages = document.querySelectorAll(".gallery-item img");
galleryImages.forEach((image) => {
  image.addEventListener("click", () => {
    window.open(image.src, "_blank");
  });
});

const hero = document.querySelector(".hero");
hero.addEventListener("mousemove", (event) => {
  const x = (event.clientX / window.innerWidth - 0.5) * 20;
  const y = (event.clientY / window.innerHeight - 0.5) * 20;
  hero.style.transform = `perspective(900px) rotateY(${x}deg) rotateX(${y}deg)`;
});
hero.addEventListener("mouseleave", () => {
  hero.style.transform = "none";
});
