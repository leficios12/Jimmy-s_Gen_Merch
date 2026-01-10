import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore, collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// Firebase config 
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ":::",
  measurementId: ""
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);











document.addEventListener("DOMContentLoaded", function () {
  // Hamburger menu
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const closeBtn = document.getElementById('close-btn');
  const sidebarNav = document.getElementById('sidebar-nav');
  const sidebarOverlay = document.getElementById('sidebar-overlay');

  if (hamburgerBtn && sidebarNav && sidebarOverlay && closeBtn) {
    hamburgerBtn.addEventListener('click', () => {
      sidebarNav.classList.add('active');
      sidebarOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    closeBtn.addEventListener('click', () => {
      sidebarNav.classList.remove('active');
      sidebarOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });

    sidebarOverlay.addEventListener('click', () => {
      sidebarNav.classList.remove('active');
      sidebarOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });

    const sidebarLinks = document.querySelectorAll('.sidebar-links a');
    sidebarLinks.forEach(link => {
      link.addEventListener('click', () => {
        sidebarNav.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }




  // Get form element
  const contactForm = document.querySelector(".contact-form");

  // Form submission 
  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const firstName = contactForm.querySelector('input[name="firstName"]').value.trim();
      const lastName = contactForm.querySelector('input[name="lastName"]').value.trim();
      const email = contactForm.querySelector('input[name="email"]').value.trim();
      const message = contactForm.querySelector('textarea[name="message"]').value.trim();

      if (!firstName || !lastName || !email) {
        showMessage("Please fill in all required fields.", "error");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showMessage("Please enter a valid email address.", "error");
        return;
      }

      const submitBtn = contactForm.querySelector(".submit-btn");
      const originalText = submitBtn.textContent;

      //to avoid spams
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      //removes error/success message if already present
      const existingMessage = contactForm.querySelector(".form-message");
      if (existingMessage) {
        existingMessage.remove();
      }

      //add to db firestore
      try {
        await addDoc(collection(db, 'contacts'), {
          firstName: firstName,
          lastName: lastName,
          email: email,
          message: message,
          timestamp: serverTimestamp(),
        });

        showMessage(
          "Thank you for contacting us! We will get back to you soon.",
          "success"
        );

        contactForm.reset();

      } catch (error) {
        console.error('Error submitting contact form:', error);
        showMessage("Error submitting form. Please try again.", "error");
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }

  // Show message function
  function showMessage(text, type) {
    const existingMessage = document.querySelector(".form-message");
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create message element
    const messageDiv = document.createElement("div");
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = text;

    // Insert message before submit button
    const submitBtn = contactForm.querySelector(".submit-btn");
    contactForm.insertBefore(messageDiv, submitBtn);

    setTimeout(() => {
      messageDiv.remove();
    }, 5000);
  }
});
