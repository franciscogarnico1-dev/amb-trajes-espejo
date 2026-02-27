// ===============================
// CARRUSEL AUTO + DRAG + PAUSA
// ===============================

const carouselSection = document.querySelector(".carousel-section");
const track = document.querySelector(".carousel-track");

let isDragging = false;
let startX;
let scrollLeft;
let autoScroll;

// Duplicar contenido para efecto infinito
track.innerHTML += track.innerHTML;

// Auto movimiento suave
function startAutoScroll() {
  autoScroll = setInterval(() => {
    track.scrollLeft += 1;

    // Cuando llegue a la mitad del contenido duplicado
    if (track.scrollLeft >= track.scrollWidth / 2) {
      track.scrollLeft -= track.scrollWidth / 2;
    }
  }, 20);
}

function stopAutoScroll() {
  clearInterval(autoScroll);
}

// Detectar si está visible en pantalla
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        startAutoScroll();
      } else {
        stopAutoScroll();
      }
    });
  },
  { threshold: 0.4 },
);

sectionObserver.observe(carouselSection);

// Mouse drag
track.addEventListener("mousedown", (e) => {
  isDragging = true;
  track.classList.add("active");
  startX = e.pageX - track.offsetLeft;
  scrollLeft = track.scrollLeft;
  stopAutoScroll();
});

track.addEventListener("mouseleave", () => {
  isDragging = false;
  track.classList.remove("active");
});

track.addEventListener("mouseup", () => {
  isDragging = false;
  track.classList.remove("active");
});

track.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - track.offsetLeft;
  const walk = (x - startX) * 2;
  track.scrollLeft = scrollLeft - walk;
});

// Touch para celular
track.addEventListener("touchstart", () => stopAutoScroll());
track.addEventListener("touchend", () => startAutoScroll());

// ===============================
// ANIMACIÓN TARJETAS
// ===============================

const cards = document.querySelectorAll(".card, .paquete-card");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.2 },
);

cards.forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(40px)";
  card.style.transition = "all 0.6s ease";
  observer.observe(card);
});

track.addEventListener("mouseup", () => {
  isDragging = false;
  track.classList.remove("active");
  startAutoScroll();
});
