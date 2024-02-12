//////////////////////////  SIGN UP FORM CREATE USER //////////////////////////

const formSignup = document.getElementById('form-signup');

formSignup.addEventListener('submit', async (event) => {
    event.preventDefault();

      const firstName = formSignup.elements.namedItem('first-name').value;
      const lastName = formSignup.elements.namedItem('last-name').value;
      const email = formSignup.elements.namedItem('email').value;
      const password = formSignup.elements.namedItem('password').value;
      // const firstName = document.getElementById('firstName').value;
      // const lastName = document.getElementById('lastName').value;
      // const email = document.getElementById('email').value;
      // const password = document.getElementById('password').value;
    
      const formData = {
        firstName,
        lastName,
        email,
        password,
      };

      console.log(formData);

      try {
        const response = fetch('/api/signupp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: formData,
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const result = await response.json();
        console.log('User created:', result); // Handle successful signup
      } catch (error) {
        console.error('Error creating user:', error); // Handle signup errors
      }
    });


