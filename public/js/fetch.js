//////////////////////////  SIGN UP FORM CREATE USER /////////////////////////
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
      
      console.log(formData);
    
      try {
        const response = await fetch('/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
    
        if (!response.ok) {
          const errorData = await response.json();

        // Clear previous error messages
        // document.getElementById('firstNameError').textContent = '';
        // document.getElementById('lastNameError').textContent = '';
        // document.getElementById('emailError').textContent = '';
        // document.getElementById('passwordError').textContent = '';
        // document.getElementById('confirmPasswordError').textContent = '';
    
          if (errorData.errors) {
            // Accumulate errors in an array
            const errors = [];
            errorData.errors.forEach(error => {
              errors.push(error.message);
    
              // Optionally, update UI with error message for each field
              const errorElement = document.getElementById(`${error.field}Error`);
              if (errorElement) {
                errorElement.textContent = error.message;
                errorElement.style.display = 'block'; // Make error messages visible
              }
            });
    
            // Display all errors as a single message
            alert(`Error(s) during signup:\n${errors.join('\n')}`);
    
            // Alternatively, display errors in a dedicated error section
            const errorSection = document.getElementById('signupErrors');
            if (errorSection) {
              errorSection.innerHTML = ''; // Clear existing errors
              errors.forEach(error => {
                const errorItem = document.createElement('li');
                errorItem.textContent = error;
                errorSection.appendChild(errorItem);
              });
              errorSection.style.display = 'block'; // Make error section visible
            }
          } else {
            // Handle other errors (e.g., display a generic error message)
            console.error('Unexpected server error:', errorData.message);
            // ... display generic error message to user
          }
        } else {
          // Response when user input is correct and it will create the user
          const result = await response.json();
          console.log('User created:', result); // Handle successful signup
        }
      } catch (error) {
        console.error('Error creating user:', error); // Handle signup errors
      }
})