document.addEventListener('DOMContentLoaded', function () {
  const formSignup = document.getElementById('signup_form');

  formSignup.addEventListener('submit', async (event) => {
    event.preventDefault();

    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    const formData = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    };

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();

        // Clear previous error messages
        clearErrorMessages();

        if (errorData.error === 'Email already exists') {
          const errorElement = document.getElementById('emailError');
          if (errorElement) {
            errorElement.textContent = 'Email already exists';
            errorElement.style.display = 'block';
          }
        } else if (errorData.errors) {
          // Display field-specific errors
          errorData.errors.forEach(error => {
            const errorElement = document.getElementById(`${error.field}Error`);
            if (errorElement) {
              errorElement.textContent = error.message;
              errorElement.style.display = 'block';
            }
          });
        } else {
          console.error('Unexpected server error:', errorData.message);
          // Display a generic error message to the user
        }
      } else {
        // Handle successful signup
        const result = await response.json();
        console.log('User created:', result);
        // Optionally, redirect user to another page or show a success message
      }
    } catch (error) {
      console.error('Error creating user:', error);
      // Handle client-side errors (e.g., network issues)
    }
  });
});

// Clear all error messages
function clearErrorMessages() {
  const errorElements = document.querySelectorAll('.validation-message');
  errorElements.forEach(errorElement => {
    errorElement.textContent = '';
    errorElement.style.display = 'none';
  });
}
