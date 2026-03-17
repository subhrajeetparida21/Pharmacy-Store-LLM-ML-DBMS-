/* --- STYLING --- */
const loginStyles = `
    .login-overlay {
        display: none;
        position: fixed;
        top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.6);
        z-index: 1000;
        backdrop-filter: blur(3px);
    }
    .login-modal {
        display: none;
        position: fixed;
        top: 50%; left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 30px;
        border-radius: 15px;
        box-shadow: 0 15px 35px rgba(0,0,0,0.3);
        z-index: 1001;
        text-align: center;
        width: 320px;
        font-family: Arial, sans-serif;
    }
    .login-modal h3 { color: #2c3e50; margin-bottom: 5px; }
    .login-modal p { color: #7f8c8d; font-size: 14px; margin-bottom: 20px; }
    .login-opt {
        display: block;
        text-decoration: none;
        padding: 12px;
        margin: 10px 0;
        border-radius: 8px;
        font-weight: bold;
        transition: 0.3s;
    }
    .cust { background: #3498db; color: white; }
    .adm { background: #2ecc71; color: white; }
    .login-opt:hover { opacity: 0.9; transform: translateY(-2px); }
    .close-modal {
        background: none; border: none; color: #e74c3c;
        margin-top: 15px; cursor: pointer; font-size: 14px;
    }
`;

// Inject Styles into Head
const styleSheet = document.createElement("style");
styleSheet.innerText = loginStyles;
document.head.appendChild(styleSheet);

/* --- LOGIC --- */
document.addEventListener('DOMContentLoaded', () => {
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