document.addEventListener('DOMContentLoaded', () => {
    const pwShowHide = document.querySelectorAll('.pw_hide');
    const login_form = document.getElementById("login_form");
    const loginError = document.getElementById('loginError');

    // Password toggle
    pwShowHide.forEach((icon) => {
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

    // Login submission
    login_form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(login_form);
        const formDataObject = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(login_form.action, {
                method: login_form.method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formDataObject),
            });

            if (!response.ok) throw new Error('Invalid email or password');
            else(respo)
        } catch (error) {
            loginError.textContent = error.message;
        }
    });
});