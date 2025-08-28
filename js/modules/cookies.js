import { getElement, addClass, addEvent, setText } from "../utils/dom.js";

export function initCookieNotification() {
  const cookieNotification = getElement("cookie-notification");
  const acceptBtn = getElement("accept-cookies");

  if (!cookieNotification || !acceptBtn) return;

  const cookiesAccepted = localStorage.getItem("cookiesAccepted");

  if (cookiesAccepted) {
    addClass(cookieNotification, "hidden");
    return;
  }

  addEvent(acceptBtn, "click", () => {
    localStorage.setItem("cookiesAccepted", "true");
    addClass(cookieNotification, "hidden");

    showCookieMessage("Cookies accepted! Thank you for your preference.");
  });

  function showCookieMessage(message) {
    const notification = document.createElement("div");
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #27ae60;
      color: white;
      padding: 15px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.2);
      z-index: 1000;
      animation: slideIn 0.3s ease;
    `;
    setText(notification, message);

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
}
