



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



