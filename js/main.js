import { initHeader } from "./modules/header.js";
import { initSlider } from "./modules/slider.js";
import { initAccordion } from "./modules/accordion.js";
import { initFormValidation } from "./modules/form.js";
import { initDestinations } from "./modules/destinations.js";
import { initWeather } from "./modules/weather.js";
import { initCookieNotification } from "./modules/cookies.js";
import { initScrollToTop } from "./modules/scroll.js";

document.addEventListener("DOMContentLoaded", () => {
  try {
    initHeader();
    initSlider();
    initAccordion();
    initFormValidation();
    initDestinations();
    initWeather();
    initCookieNotification();
    initScrollToTop();
  } catch (error) {
    console.error("Error initializing modules:", error);
  }
});
