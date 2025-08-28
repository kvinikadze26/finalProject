import { getElement, addClass, removeClass, addEvent } from "../utils/dom.js";

export function initScrollToTop() {
  const scrollBtn = getElement("scroll-to-top");

  if (!scrollBtn) return;

  addEvent(window, "scroll", () => {
    if (window.pageYOffset > 300) {
      addClass(scrollBtn, "visible");
    } else {
      removeClass(scrollBtn, "visible");
    }
  });

  addEvent(scrollBtn, "click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
