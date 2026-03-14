// src/public/js/header.js
document.addEventListener('DOMContentLoaded', () => {

    // ─── Elements ─────────────────────────────────────────────────────────────

    const accountToggle = document.getElementById('account-toggle');
    const accountDropdown = document.getElementById('account-dropdown');
    const modal = document.getElementById('login_modal');
    const underlay = document.querySelector('.underlay');
    const formClose = document.querySelector('.form_close');
    const loginForm = document.getElementById('login_form');
    const signupForm = document.getElementById('signup_form');
    const loginError = document.getElementById('loginError');
    const signupLink = document.getElementById('signup');
    const loginLink = document.getElementById('login');
    const pwToggles = document.querySelectorAll('.pw_hide');

    let isLoggedIn = false;

    // ─── Modal ────────────────────────────────────────────────────────────────

    function openModal(formToShow = 'login') {
        if (isLoggedIn) return;
        modal.classList.add('active');
        underlay.classList.add('active');
        accountDropdown.classList.remove('active');
        formToShow === 'login' ? showLoginForm() : showSignupForm();
    }

    function closeModal() {
        modal.classList.remove('active');
        underlay.classList.remove('active');
        accountDropdown.classList.remove('active');
    }

    function showLoginForm() {
        loginForm.classList.add('active');
        signupForm.classList.remove('active');
    }

    function showSignupForm() {
        signupForm.classList.add('active');
        loginForm.classList.remove('active');
    }

    // ─── Account Toggle ───────────────────────────────────────────────────────

    accountToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!isLoggedIn) {
            modal.classList.contains('active') ? closeModal() : openModal('login');
        } else {
            accountDropdown.classList.toggle('active');
        }
    });

    document.addEventListener('click', (e) => {
        if (!accountDropdown.contains(e.target)) {
            accountDropdown.classList.remove('active');
        }
    });

    underlay.addEventListener('click', closeModal);
    formClose.addEventListener('click', closeModal);
    signupLink.addEventListener('click', (e) => { e.preventDefault(); showSignupForm(); });
    loginLink.addEventListener('click', (e) => { e.preventDefault(); showLoginForm(); });

    // ─── Dropdown Contents ────────────────────────────────────────────────────

    function showLoggedInMenu() {
        isLoggedIn = true;
        accountDropdown.classList.remove('active');
        accountDropdown.innerHTML = `
            <a href="/profile">My Profile</a>
            <a href="#" id="logout_btn">Log Out</a>
        `;
        document.getElementById('logout_btn').addEventListener('click', (e) => {
            e.preventDefault();
            handleLogout();
        });
    }

    function showLoggedOutMenu() {
        isLoggedIn = false;
        accountDropdown.classList.remove('active');
        accountDropdown.innerHTML = `
            <a href="#" id="open_signup">Create Account</a>
            <a href="#">Order History</a>
        `;
        document.getElementById('open_signup').addEventListener('click', (e) => {
            e.preventDefault();
            openModal('signup');
        });
    }

    // ─── Auth State ───────────────────────────────────────────────────────────

    async function checkAuthState() {
        try {
            const response = await fetch('/api/user');
            const data = await response.json();
            data.loggedIn ? showLoggedInMenu() : showLoggedOutMenu();
        } catch (error) {
            console.error('Error checking auth state:', error);
        }
    }

    // ─── Password Toggle ──────────────────────────────────────────────────────

    pwToggles.forEach((icon) => {
        icon.addEventListener('click', () => {
            const input = icon.parentElement.querySelector('input');
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.replace('uil-eye-slash', 'uil-eye');
            } else {
                input.type = 'password';
                icon.classList.replace('uil-eye', 'uil-eye-slash');
            }
        });
    });

    // ─── Login Submission ─────────────────────────────────────────────────────

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(loginForm);
        const formDataObject = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(loginForm.action, {
                method: loginForm.method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formDataObject),
            });

            if (response.ok) {
                closeModal();
                showLoggedInMenu();
            } else {
                throw new Error('Invalid email or password');
            }
        } catch (error) {
            loginError.textContent = error.message;
        }
    });

    // ─── Logout ───────────────────────────────────────────────────────────────

    async function handleLogout() {
        try {
            const response = await fetch('/api/logout', { method: 'POST' });
            if (response.ok) {
                showLoggedOutMenu();
                window.location.href = '/';
            }
        } catch (error) {
            console.error('Logout failed:', error);
        }
    }

    // ─── Init ─────────────────────────────────────────────────────────────────

    loginForm.classList.add('active');
    signupForm.classList.remove('active');
    checkAuthState();
});