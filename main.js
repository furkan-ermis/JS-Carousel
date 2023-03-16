const track = document.querySelector(".carousel__track");
const slides = Array.from(track.children);
const nextButton = document.querySelector(".carousel__button--right");
const prevButton = document.querySelector(".carousel__button--left");
const dotsNav = document.querySelector(".carousel__nav");
const dots = Array.from(dotsNav.children);
const slideWidth = slides[0].getBoundingClientRect().width;
// ----------------------------------------------------------------------
const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + "px";
};
const moveToSlide = (track, currentSlide, targetSlide) => {
  track.setAttribute(
    "style",
    "transform:translateX(-" + targetSlide.style.left + ")"
  );
  currentSlide.removeAttribute("data-current");
  targetSlide.setAttribute("data-current", "");
};
const updateDots = (currentDot, targetDot) => {
  currentDot.removeAttribute("data-current");
  targetDot.setAttribute("data-current", "");
};
const hideShowArrows = (slides, nextButton, prevButton, targetIndex) => {
  if (targetIndex === 0) {
    prevButton.setAttribute("data-hidden", "");
    nextButton.removeAttribute("data-hidden");
  } else if (targetIndex === slides.length - 1) {
    nextButton.setAttribute("data-hidden", "");
    prevButton.removeAttribute("data-hidden");
  } else {
    prevButton.removeAttribute("data-hidden");
    nextButton.removeAttribute("data-hidden");
  }
};
// ----------------------------------------------------------------------
slides.forEach(setSlidePosition);
nextButton.addEventListener("click", (e) => {
  const currentSlide = track.querySelector("[data-current]");
  const nextSlide = currentSlide.nextElementSibling;
  moveToSlide(track, currentSlide, nextSlide);
  const currentDot = dotsNav.querySelector(".carousel__nav [data-current]");
  const targetDot = currentDot.nextElementSibling;
  updateDots(currentDot, targetDot);
  const nextIndex = slides.findIndex((slide) => slide === nextSlide);
  hideShowArrows(slides, nextButton, prevButton, nextIndex);
});
prevButton.addEventListener("click", (e) => {
  const currentSlide = track.querySelector("[data-current]");
  const prevSlide = currentSlide.previousElementSibling;
  moveToSlide(track, currentSlide, prevSlide);
  const currentDot = dotsNav.querySelector(".carousel__nav [data-current]");
  const targetDot = currentDot.previousElementSibling;
  updateDots(currentDot, targetDot);
  const prevIndex = slides.findIndex((slide) => slide === prevSlide);

  hideShowArrows(slides, nextButton, prevButton, prevIndex);
});
dotsNav.addEventListener("click", function (event) {
  const targetDot = event.target.closest("button");
  if (!targetDot) return;

  const currentSlide = track.querySelector("[data-current]");
  const currentDot = dotsNav.querySelector(".carousel__nav [data-current]");
  const targetIndex = dots.findIndex((dot) => dot === targetDot);
  const targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
  hideShowArrows(slides, nextButton, prevButton, targetIndex);
});
// ----------------------------------------------------------------------
