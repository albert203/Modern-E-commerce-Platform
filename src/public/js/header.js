document.addEventListener('DOMContentLoaded', () => {
    const account_toggle = document.getElementById("account-toggle");
    const login_modal = document.getElementById("login_modal");
    const account_dropdown = document.getElementById("account-dropdown");
    const underlay = document.querySelector(".underlay");
    const form_close = document.querySelector(".form_close");
    const login_form = document.getElementById("login_form");
    const signup_form = document.getElementById("signup_form");
    const signup_link = document.getElementById("signup");
    const login_link = document.getElementById("login");

    login_form.classList.add('active');
    signup_form.classList.remove('active');

    function closeModal() {
        login_modal.classList.remove('active');
        underlay.classList.remove('active');
        account_dropdown.classList.remove('active');
    }

    function openModal() {
        login_modal.classList.add('active');
        underlay.classList.add('active');
        account_dropdown.classList.remove('active');
        showLogin();
    }

    function showLogin() {
        login_form.classList.add('active');
        signup_form.classList.remove('active');
    }

    function showSignup() {
        signup_form.classList.add('active');
        login_form.classList.remove('active');
    }

    account_toggle.addEventListener('click', () => {
        login_modal.classList.contains('active') ? closeModal() : openModal();
    });

    underlay.addEventListener('click', closeModal);
    form_close.addEventListener('click', closeModal);

    signup_link.addEventListener('click', (e) => { e.preventDefault(); showSignup(); });
    login_link.addEventListener('click', (e) => { e.preventDefault(); showLogin(); });
});