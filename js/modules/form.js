import { getElement, addEvent, setText } from "../utils/dom.js";

export function initFormValidation() {
  const form = getElement("contact-form");
  const passwordToggle = getElement("password-toggle");
  const passwordInput = getElement("password");

  if (!form || !passwordToggle || !passwordInput) return;

  addEvent(passwordToggle, "click", () => {
    const type = passwordInput.type === "password" ? "text" : "password";
    passwordInput.type = type;

    const icon = passwordToggle.querySelector("i");
    if (icon) {
      icon.className = type === "password" ? "fas fa-eye" : "fas fa-eye-slash";
    }
  });

  addEvent(form, "submit", (e) => {
    e.preventDefault();

    if (validateForm()) {
      showSuccessMessage();
      form.reset();
    }
  });

  function validateForm() {
    let isValid = true;

    clearErrors();

    const name = getElement("name").value.trim();
    if (!name) {
      showError("name", "Name is required");
      isValid = false;
    } else if (name.length < 2) {
      showError("name", "Name must be at least 2 characters");
      isValid = false;
    }

    const email = getElement("email").value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      showError("email", "Email is required");
      isValid = false;
    } else if (!emailRegex.test(email)) {
      showError("email", "Please enter a valid email address");
      isValid = false;
    }

    const password = getElement("password").value;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password) {
      showError("password", "Password is required");
      isValid = false;
    } else if (!passwordRegex.test(password)) {
      showError(
        "password",
        "Password must be at least 8 characters with uppercase, lowercase, number and special character"
      );
      isValid = false;
    }

    const message = getElement("message").value.trim();
    if (!message) {
      showError("message", "Message is required");
      isValid = false;
    } else if (message.length < 10) {
      showError("message", "Message must be at least 10 characters");
      isValid = false;
    }

    return isValid;
  }

  function showError(fieldId, message) {
    const errorElement = getElement(`${fieldId}-error`);
    if (errorElement) {
      setText(errorElement, message);
    }
  }

  function clearErrors() {
    const errorElements = document.querySelectorAll(".error-message");
    errorElements.forEach((element) => {
      setText(element, "");
    });
  }

  function showSuccessMessage() {
    const notification = document.createElement("div");
    notification.className = "success-notification";
    notification.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease;
      ">
        <i class="fas fa-check-circle" style="margin-right: 10px;"></i>
        Message sent successfully!
      </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
}
