//////////////////////////  SIGN UP FORM CREATE USER //////////////////////////

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
        const response = fetch('/api/signupp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
    
        const result = await response.json();
        console.log('User created:', result); // Handle successful signup
      } catch (error) {
        console.error('Error creating user:', error); // Handle signup errors
      }
    });


