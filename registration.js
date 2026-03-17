// Registration page JavaScript
const customerBtn = document.getElementById('customerBtn');
const sellerBtn = document.getElementById('sellerBtn');
const sellerFields = document.getElementById('sellerFields');

customerBtn.addEventListener('click', () => {
    customerBtn.classList.add('active');
    sellerBtn.classList.remove('active');
    sellerFields.style.display = 'none';
});

sellerBtn.addEventListener('click', () => {
    sellerBtn.classList.add('active');
    customerBtn.classList.remove('active');
    sellerFields.style.display = 'block';
});

document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    // Here you would typically send data to server
    alert('Registration successful! Please login.');
    window.location.href = 'index.html';
});