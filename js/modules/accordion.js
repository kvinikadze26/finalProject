import { getElements, addClass, removeClass, setText } from "../utils/dom.js";

export function initAccordion() {
  const accordionItems = getElements(".accordion-item");

  accordionItems.forEach((item) => {
    const header = item.querySelector(".accordion-header");
    const content = item.querySelector(".accordion-content");
    const icon = item.querySelector(".accordion-icon");

    if (!header || !content || !icon) return;

    header.addEventListener("click", () => {
      const isActive = hasClass(content, "active");

      accordionItems.forEach((otherItem) => {
        if (otherItem !== item) {
          const otherContent = otherItem.querySelector(".accordion-content");
          const otherIcon = otherItem.querySelector(".accordion-icon");
          if (otherContent) removeClass(otherContent, "active");
          if (otherIcon) setText(otherIcon, "+");
        }
      });

      if (isActive) {
        removeClass(content, "active");
        setText(icon, "+");
      } else {
        addClass(content, "active");
        setText(icon, "−");
      }
    });
  });
}

function hasClass(element, className) {
  return element && element.classList.contains(className);
}
