import {
  getElement,
  getElements,
  addClass,
  removeClass,
  toggleClass,
  addEvent,
} from "../utils/dom.js";

export function initHeader() {
  const header = getElement("header");
  const navToggle = getElement("nav-toggle");
  const navMenu = getElement("nav-menu");

  if (!header || !navToggle || !navMenu) return;

  addEvent(window, "scroll", () => {
    if (window.scrollY > 100) {
      addClass(header, "scrolled");
    } else {
      removeClass(header, "scrolled");
    }
  });

  addEvent(navToggle, "click", () => {
    toggleClass(navToggle, "active");
    toggleClass(navMenu, "active");
  });

  getElements(".nav-link").forEach((link) => {
    addEvent(link, "click", () => {
      removeClass(navToggle, "active");
      removeClass(navMenu, "active");
    });
  });

  getElements('a[href^="#"]').forEach((anchor) => {
    addEvent(anchor, "click", function (e) {
      e.preventDefault();
      const target = getElement(this.getAttribute("href").substring(1));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}
