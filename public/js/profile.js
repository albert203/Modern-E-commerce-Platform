const editButton = document.querySelector('.profile-edit-button');
const cancelButton = document.querySelector('.profile-cancel-button');
const applyButton = document.querySelector('.profile-apply-button');

document.addEventListener('DOMContentLoaded', async () => {
    
    if (editButton){
        editButton.addEventListener('click', async (e) => {
            e.preventDefault();
            editButton.classList.add('hidden');
            cancelButton.parentElement.classList.remove('hidden');
            applyButton.parentElement.classList.remove('hidden');
            
        });
    } else if (cancelButton){
        cancelButton.addEventListener('click', async (e) => {
            e.preventDefault();
            cancelButton.parentElement.classList.remove('hidden');
            cancelButton.parentElement.classList.remove('hidden');
        });

    } else if (applyButton){
        applyButton.addEventListener('click', async (e) => {
            e.preventDefault();
            applyButton.classList.add('hidden');
            editButton.classList.remove('hidden');
        });

    }

    
    
});


signupBtn.addEventListener("click", (e) => {
    e.preventDefault();
    formContainer.classList.add("active");
    formOpenBtn.textContent = "Signup"
  });
  loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    formContainer.classList.remove("active");
    formOpenBtn.textContent = "Login"
  });
