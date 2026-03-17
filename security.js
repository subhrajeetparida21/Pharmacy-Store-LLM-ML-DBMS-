// Security verification page JavaScript
const userTypeSelect = document.getElementById('userType');
const passwordSection = document.getElementById('passwordSection');
const otpSection = document.getElementById('otpSection');
const sendOtpBtn = document.getElementById('sendOtpBtn');
const otpInput = document.getElementById('otp');
const verifyOtpBtn = document.getElementById('verifyOtpBtn');
const securityForm = document.getElementById('securityForm');
const loginMethods = document.querySelectorAll('input[name="loginMethod"]');

// Check URL parameters
const urlParams = new URLSearchParams(window.location.search);
const type = urlParams.get('type');

loginMethods.forEach(method => {
    method.addEventListener('change', function() {
        if (this.value === 'password') {
            passwordSection.style.display = 'block';
            otpSection.style.display = 'none';
            otpInput.style.display = 'none';
            verifyOtpBtn.style.display = 'none';
        } else {
            passwordSection.style.display = 'none';
            otpSection.style.display = 'block';
        }
    });
});

sendOtpBtn.addEventListener('click', function() {
    const contact = document.getElementById('contact').value;
    
    if (!contact) {
        alert('Please enter your email or mobile number.');
        return;
    }
    
    // Simulate sending OTP
    alert(`OTP sent to ${contact}. Please check and enter below.`);
    otpInput.style.display = 'block';
    verifyOtpBtn.style.display = 'block';
    sendOtpBtn.style.display = 'none';
});

securityForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const contact = document.getElementById('contact').value;
    const loginMethod = document.querySelector('input[name="loginMethod"]:checked').value;
    
    if (loginMethod === 'password') {
        const password = document.getElementById('password').value;
        if (!password) {
            alert('Please enter your password.');
            return;
        }
        // Simulate password login
        proceedToDashboard();
    } else {
        const otp = document.getElementById('otp').value;
        if (!otp) {
            alert('Please enter the OTP.');
            return;
        }
        if (otp.length === 6) {
            proceedToDashboard();
        } else {
            alert('Invalid OTP. Please try again.');
        }
    }
});

function proceedToDashboard() {
    if (type === 'customer') {
        window.location.href = 'customer_dashboard.html';
    } else if (type === 'seller') {
        window.location.href = 'seller_dashboard.html';
    } else if (type === 'admin') {
        window.location.href = 'admin_dashboard.html';
    } else {
        alert('Invalid login type');
    }
}