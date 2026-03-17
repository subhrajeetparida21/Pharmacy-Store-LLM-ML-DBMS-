// index.js - Main JavaScript for index.html (login modal logic)

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
    // Auto-open login modal if login=true parameter is present
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('login') === 'true') {
        const overlay = document.getElementById('loginOverlay');
        const modal = document.getElementById('loginModal');
        overlay.style.display = 'block';
        modal.style.display = 'block';
    }

    // Login modal logic
    const mainBtn = document.getElementById('mainLoginBtn');
    const overlay = document.getElementById('loginOverlay');
    const modal = document.getElementById('loginModal');
    const closeBtn = document.getElementById('closeModal');

    // Open Modal
    mainBtn.onclick = (e) => {
        e.preventDefault();
        overlay.style.display = 'block';
        modal.style.display = 'block';
    };

    // Close Modal
    const close = () => {
        overlay.style.display = 'none';
        modal.style.display = 'none';
    };

    closeBtn.onclick = close;
    overlay.onclick = close;
});