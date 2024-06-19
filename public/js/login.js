document.addEventListener('DOMContentLoaded', () => {
  const formOpenBtn = document.querySelector('.form-open');
  const formCloseBtn = document.querySelector('.form_close');
  const home = document.querySelector('.home-section');
  const formContainer = document.querySelector('.modal');
  const signupBtn = document.querySelector('#signup');
  const loginBtn = document.querySelector('#login');
  const pwShowHide = document.querySelectorAll('.pw_hide');
  const loginForm = document.getElementById('loginForm');
  const loginError = document.getElementById('loginError');

  formOpenBtn.addEventListener('click', () => home.classList.add('show'));
  formCloseBtn.addEventListener('click', () => home.classList.remove('show'));

  pwShowHide.forEach((icon) => {
    icon.addEventListener('click', () => {
      let getPwInput = icon.parentElement.querySelector('input');
      if (getPwInput.type === 'password') {
        getPwInput.type = 'text';
        icon.classList.replace('uil-eye-slash', 'uil-eye');
      } else {
        getPwInput.type = 'password';
        icon.classList.replace('uil-eye', 'uil-eye-slash');
      }
    });
  });

  signupBtn.addEventListener('click', (e) => {
    e.preventDefault();
    formContainer.classList.add('active');
    formOpenBtn.textContent = 'Signup';
  });
  loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    formContainer.classList.remove('active');
    formOpenBtn.textContent = 'Login';
  });

  // Login form submission
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(loginForm);
    const formDataObject = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(loginForm.action, {
        method: loginForm.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataObject),
      });

      if (!response.ok) {
        throw new Error('Invalid email or password');
      }

      // Redirect to Profile page if login is successful
      window.location.href = '/profile';
    } catch (error) {
      // Display login error message
      loginError.textContent = error.message;
    }
  });
});
