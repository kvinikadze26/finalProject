export function getElement(id) {
  return document.getElementById(id);
}

export function getElements(selector) {
  return document.querySelectorAll(selector);
}

export function createElement(tag, className = "", content = "") {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (content) element.textContent = content;
  return element;
}

export function addClass(element, className) {
  if (element) element.classList.add(className);
}

export function removeClass(element, className) {
  if (element) element.classList.remove(className);
}

export function toggleClass(element, className) {
  if (element) element.classList.toggle(className);
}

export function hasClass(element, className) {
  return element && element.classList.contains(className);
}

export function setText(element, text) {
  if (element) element.textContent = text;
}

export function setHTML(element, html) {
  if (element) element.innerHTML = html;
}

export function addEvent(element, event, handler) {
  if (element) element.addEventListener(event, handler);
}

export function removeEvent(element, event, handler) {
  if (element) element.removeEventListener(event, handler);
}
