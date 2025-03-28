const slides = document.querySelectorAll(".slider img");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const imgId = document.querySelector(".img-id");
const galleryContainer = document.querySelector(".gallery-container");
const navigationDots = document.querySelector(".navigation-dots");
galleryContainer.style.gridTemplateColumns = `repeat(${slides.length}, auto)`;
let currentSlide = 0;

updateSlidersControls();
function goToSlide(n) {
  slides[currentSlide].classList.remove("active");
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].classList.add("active");
  updateSlidersControls();
  updateThumbnailActiveState(currentSlide);
  updateNavigationDots();
}

prevBtn.addEventListener("click", () => {
  goToSlide(currentSlide - 1);
});
nextBtn.addEventListener("click", () => {
  goToSlide(currentSlide + 1);
});
function updateSlidersControls() {
  prevBtn.disabled = currentSlide === 0;
  nextBtn.disabled = currentSlide === slides.length - 1;
  imgId.innerHTML = `Image ${currentSlide + 1} of ${slides.length}`;
}
slides.forEach((img, index) => {
  const thumbnail = img.cloneNode();
  thumbnail.addEventListener("click", () => {
    goToSlide(index);
  });
  galleryContainer.appendChild(thumbnail);
});
function updateThumbnailActiveState(index) {
  galleryContainer.querySelectorAll("img").forEach((img, i) => {
    img.classList.toggle("active", i === index);
  });
}

createNavigationDots();
function createNavigationDots() {
  slides.forEach((slide, index) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (index === currentSlide) {
      dot.classList.add("active");
    }
    dot.addEventListener("click", () => {
      goToSlide(index);
    });
    navigationDots.appendChild(dot);
  });
}

function updateNavigationDots() {
  navigationDots.querySelectorAll(".dot").forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide);
  });
}

setInterval(() => {
  setTimeout(() => {
    goToSlide(currentSlide + 1);
  }, 1000);
}, 3000);
