// src/public/js/header.js

// ─── Auth Modal ───────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {

    const accountToggle   = document.getElementById('account-toggle');
    const accountDropdown = document.getElementById('account-dropdown');
    const authModal       = document.getElementById('login_modal');
    const modalOverlay    = document.querySelector('.underlay');
    const modalClose      = document.querySelector('.form_close');
    const loginForm       = document.getElementById('login_form');
    const signupForm      = document.getElementById('signup_form');
    const loginError      = document.getElementById('loginError');
    const signupLink      = document.getElementById('signup');
    const loginLink       = document.getElementById('login');
    const passwordToggles = document.querySelectorAll('.pw_hide');

    let userLoggedIn = false;

    // ── Modal helpers ──────────────────────────────────────────────────────────

    function openAuthModal(form = 'login') {
        if (userLoggedIn) return;
        authModal.classList.add('active');
        modalOverlay.classList.add('active');
        accountDropdown.classList.remove('active');
        form === 'login' ? showLoginForm() : showSignupForm();
    }

    function closeAuthModal() {
        authModal.classList.remove('active');
        modalOverlay.classList.remove('active');
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

    // ── Account toggle ─────────────────────────────────────────────────────────

    accountToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!userLoggedIn) {
            authModal.classList.contains('active') ? closeAuthModal() : openAuthModal('login');
        } else {
            accountDropdown.classList.toggle('active');
        }
    });

    document.addEventListener('click', (e) => {
        if (!accountDropdown.contains(e.target)) {
            accountDropdown.classList.remove('active');
        }
    });

    modalOverlay.addEventListener('click', closeAuthModal);
    modalClose.addEventListener('click', closeAuthModal);
    signupLink.addEventListener('click', (e) => { e.preventDefault(); showSignupForm(); });
    loginLink.addEventListener('click',  (e) => { e.preventDefault(); showLoginForm(); });

    // ── Dropdown menus ─────────────────────────────────────────────────────────

    function showLoggedInMenu() {
        userLoggedIn = true;
        accountDropdown.classList.remove('active');
        accountDropdown.innerHTML = `
            <a href="/profile">My Profile</a>
            <a href="#" id="logout-btn">Log Out</a>
        `;
        document.getElementById('logout-btn').addEventListener('click', (e) => {
            e.preventDefault();
            handleLogout();
        });
    }

    function showLoggedOutMenu() {
        userLoggedIn = false;
        accountDropdown.classList.remove('active');
        accountDropdown.innerHTML = `
            <a href="#" id="open-signup">Create Account</a>
            <a href="#">Order History</a>
        `;
        document.getElementById('open-signup').addEventListener('click', (e) => {
            e.preventDefault();
            openAuthModal('signup');
        });
    }

    // ── Auth state ─────────────────────────────────────────────────────────────

    async function checkAuthState() {
        try {
            const res  = await fetch('/api/user');
            const data = await res.json();
            data.loggedIn ? showLoggedInMenu() : showLoggedOutMenu();
        } catch (err) {
            console.error('checkAuthState error:', err);
        }
    }

    // ── Password visibility ────────────────────────────────────────────────────

    passwordToggles.forEach((icon) => {
        icon.addEventListener('click', () => {
            const input    = icon.parentElement.querySelector('input');
            const isHidden = input.type === 'password';
            input.type = isHidden ? 'text' : 'password';
            icon.classList.replace(
                isHidden ? 'uil-eye-slash' : 'uil-eye',
                isHidden ? 'uil-eye'       : 'uil-eye-slash'
            );
        });
    });

    // ── Login submit ───────────────────────────────────────────────────────────

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const payload = Object.fromEntries(new FormData(loginForm).entries());

        try {
            const res = await fetch(loginForm.action, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                closeAuthModal();
                showLoggedInMenu();
            } else {
                throw new Error('Invalid email or password');
            }
        } catch (err) {
            loginError.textContent = err.message;
        }
    });

    // ── Logout ─────────────────────────────────────────────────────────────────

    async function handleLogout() {
        try {
            const res = await fetch('/api/logout', { method: 'POST' });
            if (res.ok) {
                showLoggedOutMenu();
                window.location.href = '/';
            }
        } catch (err) {
            console.error('handleLogout error:', err);
        }
    }

    // ── Init ───────────────────────────────────────────────────────────────────

    showLoginForm();
    checkAuthState();
});

// ─── Mobile Menu ──────────────────────────────────────────────────────────────

const mobileToggle  = document.getElementById('mobile-menu-toggle');
const mobileMenu    = document.getElementById('mobile-menu');
const hamburgerIcon = document.getElementById('menu-icon');
const closeIcon     = document.getElementById('close-icon');

mobileToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('active');
    hamburgerIcon.style.display = isOpen ? 'none'  : 'block';
    closeIcon.style.display     = isOpen ? 'block' : 'none';
});

// ─── Desktop Mega Menu ────────────────────────────────────────────────────────

document.querySelectorAll('.nav-item').forEach((navItem) => {
    const megaMenu = navItem.querySelector('.mega-menu');
    const chevron  = navItem.querySelector('.chevron');

    navItem.addEventListener('mouseenter', () => {
        megaMenu.classList.add('active');
        chevron.classList.add('rotate');
    });

    navItem.addEventListener('mouseleave', () => {
        megaMenu.classList.remove('active');
        chevron.classList.remove('rotate');
    });
});

// ─── Mobile Submenu ───────────────────────────────────────────────────────────

document.querySelectorAll('.mobile-nav-button').forEach((btn) => {
    btn.addEventListener('click', () => {
        const submenu = btn.nextElementSibling;
        const chevron = btn.querySelector('.chevron');

        document.querySelectorAll('.mobile-submenu').forEach((menu) => {
            if (menu !== submenu) {
                menu.classList.remove('active');
                menu.previousElementSibling.querySelector('.chevron').classList.remove('rotate');
            }
        });

        submenu.classList.toggle('active');
        chevron.classList.toggle('rotate');
    });
});

// ─── Search ───────────────────────────────────────────────────────────────────

const searchToggle    = document.getElementById('search-toggle');
const searchContainer = document.getElementById('search-input-container');
const searchInput     = document.getElementById('search-input');
const searchClose     = document.getElementById('search-close');
const searchIcon      = document.getElementById('search-icon');

function openSearch() {
    searchIcon.style.display      = 'none';
    searchContainer.style.display = 'block';
    searchInput.focus();
}

function closeSearch() {
    searchContainer.style.display = 'none';
    searchIcon.style.display      = 'block';
}

searchToggle.addEventListener('click', openSearch);
searchClose.addEventListener('click', closeSearch);

searchInput.addEventListener('blur', () => {
    setTimeout(() => {
        if (document.activeElement !== searchInput) closeSearch();
    }, 200);
});