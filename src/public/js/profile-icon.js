document.addEventListener('DOMContentLoaded', () => {
  const profileButton = document.getElementById('profile-button');
  const profileMenu = document.getElementById('profile-menu');

  // Toggle profile menu visibility
  profileButton.addEventListener('click', () => {
    console.log('Profile button clicked');
    profileMenu.style.display =
      profileMenu.style.display === 'none' ? 'flex' : 'none';
  });

  // Hide profile menu if clicked outside
  document.addEventListener('click', (e) => {
    if (!profileButton.contains(e.target)) {
      profileMenu.style.display = 'none';
    }
  });
});
