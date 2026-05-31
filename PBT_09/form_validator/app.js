// ============================================
// Form Validator - Real-time Validation
// ============================================

// ============ DOM REFERENCES ============
const form = document.querySelector('#registerForm');
const fullName = document.querySelector('#fullName');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirmPassword');
const phone = document.querySelector('#phone');
const togglePassword = document.querySelector('#togglePassword');
const submitBtn = document.querySelector('#submitBtn');
const successModal = document.querySelector('#successModal');
const modalBody = document.querySelector('#modalBody');
const modalBtn = document.querySelector('#modalBtn');

// ============ VALIDATION STATE ============
const state = {
    name: false,
    email: false,
    password: false,
    confirm: false,
    phone: false
};

// ============ UI HELPERS ============
function setIcon(id, icon) {
    document.querySelector(id).textContent = icon;
}

function setError(id, message) {
    const el = document.querySelector(id);
    el.textContent = message;
}

function setWrapperState(inputId, success) {
    const wrapper = document.querySelector(inputId).closest('.input-wrapper');
    wrapper.classList.remove('success', 'error');
    if (success !== undefined) {
        wrapper.classList.add(success ? 'success' : 'error');
    }
}

function updateSubmitButton() {
    const allValid = Object.values(state).every(v => v === true);
    submitBtn.disabled = !allValid;
}

// ============ VALIDATORS ============

// Full Name: 2-50 characters
function validateName() {
    const val = fullName.value.trim();
    if (val.length === 0) {
        setError('#nameError', 'Vui lòng nhập họ tên');
        setIcon('#nameIcon', '');
        setWrapperState('#fullName', undefined);
        state.name = false;
    } else if (val.length < 2) {
        setError('#nameError', 'Tên phải có ít nhất 2 ký tự');
        setIcon('#nameIcon', '❌');
        setWrapperState('#fullName', false);
        state.name = false;
    } else if (val.length > 50) {
        setError('#nameError', 'Tên không được quá 50 ký tự');
        setIcon('#nameIcon', '❌');
        setWrapperState('#fullName', false);
        state.name = false;
    } else {
        setError('#nameError', '');
        setIcon('#nameIcon', '✅');
        setWrapperState('#fullName', true);
        state.name = true;
    }
    updateSubmitButton();
}

// Email: regex validation
function validateEmail() {
    const val = email.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (val.length === 0) {
        setError('#emailError', 'Vui lòng nhập email');
        setIcon('#emailIcon', '');
        setWrapperState('#email', undefined);
        state.email = false;
    } else if (!emailRegex.test(val)) {
        setError('#emailError', 'Email không hợp lệ (vd: example@email.com)');
        setIcon('#emailIcon', '❌');
        setWrapperState('#email', false);
        state.email = false;
    } else {
        setError('#emailError', '');
        setIcon('#emailIcon', '✅');
        setWrapperState('#email', true);
        state.email = true;
    }
    updateSubmitButton();
}

// Password: strength meter + validation
function validatePassword() {
    const val = password.value;
    const fill = document.querySelector('#strengthFill');
    const text = document.querySelector('#strengthText');

    if (val.length === 0) {
        setError('#passwordError', '');
        setIcon('#passwordIcon', '');
        setWrapperState('#password', undefined);
        fill.className = 'strength-fill';
        fill.style.width = '0%';
        text.textContent = 'Nhập mật khẩu';
        text.style.color = '#888';
        state.password = false;
        updateSubmitButton();
        // Also re-validate confirm
        if (confirmPassword.value) validateConfirmPassword();
        return;
    }

    // Check strength
    const hasLower = /[a-z]/.test(val);
    const hasUpper = /[A-Z]/.test(val);
    const hasNumber = /\d/.test(val);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>_\-+=\[\]\\;'/`~]/.test(val);
    const lengthOk = val.length >= 8;

    let errorMessages = [];
    if (!lengthOk) errorMessages.push('Ít nhất 8 ký tự');
    if (!hasLower) errorMessages.push('có chữ thường');
    if (!hasUpper) errorMessages.push('có chữ hoa');
    if (!hasNumber) errorMessages.push('có số');
    if (!hasSpecial) errorMessages.push('có ký tự đặc biệt');

    if (errorMessages.length > 0) {
        setError('#passwordError', 'Cần: ' + errorMessages.join(', '));
    } else {
        setError('#passwordError', '');
    }

    setIcon('#passwordIcon', errorMessages.length > 0 ? '❌' : '✅');
    setWrapperState('#password', errorMessages.length === 0);

    // Strength meter
    let strength = 0;
    if (lengthOk) strength++;
    if (hasLower && hasUpper) strength++;
    if (hasNumber) strength++;
    if (hasSpecial) strength++;

    fill.className = 'strength-fill';
    if (val.length < 8) {
        fill.classList.add('weak');
        text.textContent = 'Yếu';
        text.style.color = '#ff4757';
    } else if (strength <= 2) {
        fill.classList.add('weak');
        text.textContent = 'Yếu';
        text.style.color = '#ff4757';
    } else if (strength === 3) {
        fill.classList.add('medium');
        text.textContent = 'Trung bình';
        text.style.color = '#ffa502';
    } else {
        fill.classList.add('strong');
        text.textContent = 'Mạnh';
        text.style.color = '#2ed573';
    }

    state.password = errorMessages.length === 0;
    updateSubmitButton();

    // Re-validate confirm password
    if (confirmPassword.value) validateConfirmPassword();
}

// Confirm Password: must match
function validateConfirmPassword() {
    const val = confirmPassword.value;
    if (val.length === 0) {
        setError('#confirmError', 'Vui lòng xác nhận mật khẩu');
        setIcon('#confirmIcon', '');
        setWrapperState('#confirmPassword', undefined);
        state.confirm = false;
    } else if (val !== password.value) {
        setError('#confirmError', 'Mật khẩu không khớp');
        setIcon('#confirmIcon', '❌');
        setWrapperState('#confirmPassword', false);
        state.confirm = false;
    } else if (password.value.length === 0) {
        setError('#confirmError', 'Vui lòng nhập mật khẩu trước');
        setIcon('#confirmIcon', '');
        setWrapperState('#confirmPassword', undefined);
        state.confirm = false;
    } else {
        setError('#confirmError', '');
        setIcon('#confirmIcon', '✅');
        setWrapperState('#confirmPassword', true);
        state.confirm = true;
    }
    updateSubmitButton();
}

// Phone: 10 digits, auto-format with dashes
function validatePhone() {
    const val = phone.value.replace(/\D/g, '');

    if (val.length === 0) {
        setError('#phoneError', 'Vui lòng nhập số điện thoại');
        setIcon('#phoneIcon', '');
        setWrapperState('#phone', undefined);
        state.phone = false;
    } else if (val.length !== 10) {
        setError('#phoneError', 'Số điện thoại phải có đúng 10 chữ số');
        setIcon('#phoneIcon', '❌');
        setWrapperState('#phone', false);
        state.phone = false;
    } else {
        setError('#phoneError', '');
        setIcon('#phoneIcon', '✅');
        setWrapperState('#phone', true);
        state.phone = true;
    }
    updateSubmitButton();
}

// Phone auto-format
function formatPhone() {
    const raw = phone.value.replace(/\D/g, '');
    let formatted = '';
    if (raw.length > 0) formatted = raw.substring(0, 4);
    if (raw.length > 4) formatted += '-' + raw.substring(4, 7);
    if (raw.length > 7) formatted += '-' + raw.substring(7, 10);
    phone.value = formatted;
    validatePhone();
}

// ============ EVENT LISTENERS ============

// Real-time validation on input
fullName.addEventListener('input', validateName);
email.addEventListener('input', validateEmail);
password.addEventListener('input', validatePassword);
confirmPassword.addEventListener('input', validateConfirmPassword);
phone.addEventListener('input', formatPhone);

// Toggle password visibility
togglePassword.addEventListener('click', function() {
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    confirmPassword.setAttribute('type', type);
    this.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
});

// Blur: clear initial empty errors
fullName.addEventListener('blur', function() {
    if (this.value.trim() === '') {
        setError('#nameError', '');
        setIcon('#nameIcon', '');
        setWrapperState('#fullName', undefined);
    }
});

email.addEventListener('blur', function() {
    if (this.value.trim() === '') {
        setError('#emailError', '');
        setIcon('#emailIcon', '');
        setWrapperState('#email', undefined);
    }
});

// Form Submit
form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Final validation check
    validateName();
    validateEmail();
    validatePassword();
    validateConfirmPassword();
    validatePhone();

    const allValid = Object.values(state).every(v => v === true);
    if (!allValid) return;

    // Show success modal
    showSuccessModal();
});

// ============ SUCCESS MODAL ============
function showSuccessModal() {
    const data = {
        'Họ và Tên': fullName.value.trim(),
        'Email': email.value.trim(),
        'Số Điện Thoại': phone.value
    };

    modalBody.innerHTML = '';
    for (const [label, value] of Object.entries(data)) {
        const p = document.createElement('p');
        const labelSpan = document.createElement('span');
        labelSpan.className = 'label';
        labelSpan.textContent = label + ':';
        const valueSpan = document.createElement('span');
        valueSpan.textContent = value;
        p.appendChild(labelSpan);
        p.appendChild(valueSpan);
        modalBody.appendChild(p);
    }

    successModal.classList.remove('hidden');
    modalBtn.focus();
}

function closeModal() {
    successModal.classList.add('hidden');
    // Reset form
    form.reset();
    // Reset state
    Object.keys(state).forEach(key => state[key] = false);
    updateSubmitButton();
    // Clear icons and styles
    document.querySelectorAll('.input-icon').forEach(el => el.textContent = '');
    document.querySelectorAll('.input-wrapper').forEach(el => el.classList.remove('success', 'error'));
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    document.querySelector('#strengthFill').className = 'strength-fill';
    document.querySelector('#strengthFill').style.width = '0%';
    document.querySelector('#strengthText').textContent = 'Nhập mật khẩu';
    document.querySelector('#strengthText').style.color = '#888';
}

modalBtn.addEventListener('click', closeModal);

// Close modal on overlay click
successModal.addEventListener('click', function(e) {
    if (e.target === this) closeModal();
});

// Escape to close modal
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !successModal.classList.contains('hidden')) {
        closeModal();
    }
});