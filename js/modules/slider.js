import {
  getElement,
  getElements,
  addClass,
  removeClass,
  addEvent,
} from "../utils/dom.js";

export function initSlider() {
  const slider = getElement("slider");
  const slides = getElements(".slide");
  const prevBtn = getElement("prev-btn");
  const nextBtn = getElement("next-btn");
  const dotsContainer = getElement("slider-dots");

  if (!slider || slides.length === 0) return;

  let currentSlide = 0;
  let slideInterval;

  slides.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.className = "dot";
    if (index === 0) addClass(dot, "active");
    addEvent(dot, "click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = getElements(".dot");

  function showSlide(index) {
    slides.forEach((slide) => removeClass(slide, "active"));
    dots.forEach((dot) => removeClass(dot, "active"));

    addClass(slides[index], "active");
    addClass(dots[index], "active");
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  function goToSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
    resetInterval();
  }

  function resetInterval() {
    clearInterval(slideInterval);
    startAutoSlide();
  }

  function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 4000);
  }

  if (prevBtn) {
    addEvent(prevBtn, "click", () => {
      prevSlide();
      resetInterval();
    });
  }

  if (nextBtn) {
    addEvent(nextBtn, "click", () => {
      nextSlide();
      resetInterval();
    });
  }

  startAutoSlide();

  addEvent(slider, "mouseenter", () => clearInterval(slideInterval));
  addEvent(slider, "mouseleave", startAutoSlide);
}
