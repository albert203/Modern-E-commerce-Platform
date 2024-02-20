// Toggle password visibility
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirmpassword');

// Wait for content to load first
document.addEventListener('DOMContentLoaded', () => {
  const togglePassword = document.querySelector('#togglePassword');
  const toggleConfirmPassword = document.querySelector('#toggleConfirmPassword');

  // On clicking the eye icon, toggle visibility
  togglePassword.addEventListener('click', () => {
    const type = password.type === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    
  });
  // On clicking the confirm password eye icon, toggle visibility
  toggleConfirmPassword.addEventListener('click', () => {
    const type = confirmPassword.type === 'password' ? 'text' : 'password';
    confirmPassword.setAttribute('type', type);
  });
});



// scrolling nav menu fades in and out using opacity
const navbar = document.querySelector('#nav-container');
let previousScrollY = 0;
const fadeThreshold = 10;
let isFadingOut = false;

window.addEventListener('scroll', () => {
  currentScrollY = window.scrollY;

  //fade out based on the direction and threshold
  if (
    currentScrollY > previousScrollY &&
    currentScrollY > fadeThreshold &&
    !isFadingOut
  ) {
    isFadingOut = true;
    FadeOutNavBar(currentScrollY);
  } else if (currentScrollY < previousScrollY && isFadingOut) {
    isFadingOut = false;
    FadeInNavBar(currentScrollY);
  }
  previousScrollY = currentScrollY;

  // console.log("opacity: " + navbar.style.opacity);
  // console.log("currentScrollY: " + currentScrollY);
  // console.log("previousScrollY: " + previousScrollY);
  // console.log("isFadingOut: " + isFadingOut);
});

function FadeOutNavBar(scrollY) {
  let opacity = Math.max(0, 1 - (scrollY - fadeThreshold) / 200);
  if (opacity < 0.7) {
    navbar.style.opacity = 0.8;
    navbar.style.transition = 'opacity 0.5s';
  } else {
    navbar.style.opacity = opacity;
  }
}

function FadeInNavBar() {
  navbar.style.opacity = 1;
}






