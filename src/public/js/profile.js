// ─── Element refs ───────────────────────────────────────────────────────────
const editBtn        = document.querySelector('.profile-edit-button');
const editPanel      = document.querySelector('.edit-panel');
const cancelBtn      = document.querySelector('.profile-cancel-button');
const saveBtn        = document.querySelector('.profile-apply-button');
const errorContainer = document.querySelector('.error-container');

// ─── Toggle helpers ──────────────────────────────────────────────────────────
function openEditPanel() {
  editPanel.classList.add('open');
  editBtn.classList.add('hidden');
  errorContainer.innerHTML = '';
  console.log('Edit panel opened');
}

function closeEditPanel() {
  editPanel.classList.remove('open');
  editBtn.classList.remove('hidden');
  errorContainer.innerHTML = '';
}

// ─── Display helpers ─────────────────────────────────────────────────────────
function updateDisplayName(firstName, lastName) {
  document.querySelector('.user-name').textContent = `${firstName} ${lastName}`;
}

function showError(message) {
  const el = document.createElement('p');
  el.className = 'edit-error';
  el.textContent = message;
  errorContainer.appendChild(el);
}

function showSuccess(message) {
  errorContainer.innerHTML = `<p class="edit-success">${message}</p>`;
}

// ─── Event listeners ─────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  editBtn?.addEventListener('click', openEditPanel);
  cancelBtn?.addEventListener('click', closeEditPanel);

  saveBtn?.addEventListener('click', async () => {
    const firstName = document.querySelector('#firstName').value.trim();
    const lastName  = document.querySelector('#lastName').value.trim();
    errorContainer.innerHTML = '';

    // Basic client-side guard
    if (!firstName || !lastName) {
      showError('First and last name are required.');
      return;
    }

    saveBtn.disabled = true;
    saveBtn.textContent = 'Saving…';

    try {
      const res = await fetch('/api/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName }),
      });

      const data = await res.json();

      if (res.ok) {
        updateDisplayName(data.firstName, data.lastName);
        showSuccess('Profile updated.');
        // Close after a brief moment so user sees the confirmation
        setTimeout(closeEditPanel, 1200);
      } else {
        (data.errors ?? []).forEach(err => showError(err.message));
      }
    } catch {
      showError('Something went wrong. Please try again.');
    } finally {
      saveBtn.disabled = false;
      saveBtn.textContent = 'Save Changes';
    }
  });
});

// ─── Sidebar section switching ───────────────────────────────────────────────
let activeSection = 'profile';

function showSection(section) {
  document.getElementById(`${activeSection}-section`)?.classList.add('hidden');
  document.getElementById(`${section}-section`)?.classList.remove('hidden');
  activeSection = section;
}