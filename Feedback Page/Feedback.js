import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGPPvpADx8Qc6XIe67Q_6NN9vBcSOOIow",
  authDomain: "webdev-project-3-24323.firebaseapp.com",
  projectId: "webdev-project-3-24323",
  storageBucket: "webdev-project-3-24323.firebasestorage.app",
  messagingSenderId: "598732730010",
  appId: "1:598732730010:web:8af419ce5e788a9ded7923",
  measurementId: "G-Y9PHWJB7M7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Hamburger menu
const hamburgerBtn = document.getElementById('hamburger-btn');
const closeBtn = document.getElementById('close-btn');
const sidebarNav = document.getElementById('sidebar-nav');
const sidebarOverlay = document.getElementById('sidebar-overlay');

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

// Feedback form
const form = document.querySelector('.feedback-form');
const userFeedbacksContainer = document.getElementById('user-feedbacks');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const inputs = form.querySelectorAll('.form-input');
  const titleInput = inputs[0];
  const nameInput = inputs[1];
  const commentTextarea = form.querySelector('.form-textarea');
  
  const title = titleInput.value.trim();
  const name = nameInput.value.trim();
  const comment = commentTextarea.value.trim();
  
  if (!name || !title || !comment) {
    alert('Please fill in all fields');
    return;
  }
  
  try {
    await addDoc(collection(db, 'feedbacks'), {
      name: name,
      title: title,
      comment: comment,
      timestamp: serverTimestamp()
    });
    
    titleInput.value = '';
    nameInput.value = '';
    commentTextarea.value = '';
    
    alert('Thank you for your feedback!');
    
  } catch (error) {
    console.error('Error adding feedback:', error);
    alert('Error submitting feedback. Please try again.');
  }
});

const q = query(collection(db, 'feedbacks'), orderBy('timestamp', 'desc'));

onSnapshot(q, (snapshot) => {
  userFeedbacksContainer.innerHTML = '';
  
  snapshot.forEach((doc) => {
    const data = doc.data();
    
    const feedbackCard = document.createElement('div');
    feedbackCard.className = 'testimonial-card';
    
    feedbackCard.innerHTML = `
    <div class="testimonial-card">
      <h3 class="testimonial-title">${escapeHtml(data.title)}</h3>
      <p class="testimonial-text">${escapeHtml(data.comment)}</p>
      <p class="testimonial-text" style="font-size: 12px; opacity: 0.6; margin-top: 10px;">
        - ${escapeHtml(data.name)}
      </p>
    </div>
    `;
    
    userFeedbacksContainer.appendChild(feedbackCard);
  });
});

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}