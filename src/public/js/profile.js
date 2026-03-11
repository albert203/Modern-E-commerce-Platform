const profileText = document.querySelector('.profile-text');
const editButton = document.querySelector('.profile-edit-button');
const hiddenInputForm = document.querySelector('.hidden-input-form');
const cancelButton = document.querySelector('.profile-cancel-button');
const applyButton = document.querySelector('.profile-apply-button');

document.addEventListener('DOMContentLoaded', async () => {
  if (editButton) {
    editButton.addEventListener('click', (e) => {
      e.preventDefault();
      profileText.classList.add('hidden');
      editButton.classList.add('hidden');
      hiddenInputForm.classList.remove('hidden');
      cancelButton.parentElement.classList.remove('hidden');
      applyButton.parentElement.classList.remove('hidden');
    });
  }

  if (cancelButton) {
    cancelButton.addEventListener('click', (e) => {
      e.preventDefault();
      profileText.classList.remove('hidden');
      editButton.classList.remove('hidden');
      hiddenInputForm.classList.add('hidden');
      cancelButton.parentElement.classList.add('hidden');
      applyButton.parentElement.classList.add('hidden');
    });
  }

  if (applyButton) {
    applyButton.addEventListener('click', async (e) => {
      e.preventDefault();

      const firstName = document.querySelector('#firstName').value;
      const lastName = document.querySelector('#lastName').value;
      const errorContainer = document.querySelector('.error-container');

      // Clear previous error messages
      errorContainer.innerHTML = '';

      try {
        const response = await fetch('/api/update-profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ firstName, lastName }),
        });

        if (response.ok) {
          const data = await response.json();

          profileText.innerHTML = `
                <div>First Name: ${data.firstName}</div>
                <div>Last Name: ${data.lastName}</div>
                <button class="profile-edit-button">Edit</button>
        `;
          profileText.classList.remove('hidden');
          editButton.classList.remove('hidden');
          hiddenInputForm.classList.add('hidden');
          cancelButton.parentElement.classList.add('hidden');
          applyButton.parentElement.classList.add('hidden');
          errorContainer.innerHTML =
            'First and last name updated successfully.';
        } else {
          const errorData = await response.json();
          if (errorData.errors) {
            errorData.errors.forEach((error) => {
              const errorElement = document.createElement('div');
              errorElement.textContent = error.message;
              errorElement.classList.add('error-message');
              errorContainer.appendChild(errorElement);
            });
          }
        }
      } catch (error) {
        console.error('Error during fetch:', error);
      }
    });
  }
});

let lastOpenedSection = 'profile';

function showSection(section) {
  // Hide the last opened section if it exists
  if (lastOpenedSection) {
    document
      .getElementById(lastOpenedSection + '-section')
      .classList.add('hidden');
  }

  // Show the current section
  document.getElementById(section + '-section').classList.remove('hidden');

  // Update the last opened section
  lastOpenedSection = section;
}

function handleSectionToggle(section) {
  switch (section) {
    case 'profile':
      showSection('profile');
      break;
    case 'security':
      showSection('security');
      break;
    case 'orders':
      showSection('orders');
      break;
    case 'settings':
      showSection('settings');
      break;
    default:
      console.error('Unknown section:', section);
  }
}
