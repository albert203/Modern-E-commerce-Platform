// // toggle password visibility
// const togglePassword = document.querySelector('#togglePassword');

// const password = document.querySelector('#password-input');

// togglePassword.addEventListener('click', function (e){
//         // toggle the hide/unhide password
//         // change types
//         const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
//         password.setAttribute('type', type);
//         // toggle the eye icon
//         this.classList.toggle('fa-eye-slash')
//     }
// )

// const emailInput = document.querySelector('#email-input');
// const passwordInput = document.querySelector('#password-input');
// const loginButton = document.querySelector('#login-btn');
// // if the login button is clicked,
// // check if the email and password are correct
// // if correct, display a success message
// // if incorrect, display an error message in html

// // form validation
// loginButton.addEventListener('click', function (e){
//     // get the values from the input fields
//     const emailValue = emailInput.value;
//     const passwordValue = passwordInput.value;
//     // check if the values are correct
//     if (emailValue === '' && passwordValue === ''){
//         // give error message feedback within the input fields
//         alert('Please fill in the email and password fields');
//     } else if (emailValue === ''){
//         alert('Please fill in the email field');
//     } else if (passwordValue === ''){
//         alert('Please fill in the password field');
//     } else {
//         alert('login successful');
//     }
//     e.preventDefault();
// })

// Sukana'sdomain expansion when clicking "shop" link

// scrolling nav menu fades in and out using opacity
const navbar = document.querySelector("#nav-container");
let previousScrollY = 0;
const fadeThreshold = 10;
let isFadingOut = false;

window.addEventListener("scroll", () => {
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
    navbar.style.transition = "opacity 0.5s";
  } else {
    navbar.style.opacity = opacity;
  }
}

function FadeInNavBar() {
  navbar.style.opacity = 1;
}

// if video is playing hide the nav bar
// video = document.querySelector('.mp4juju');
// video.addEventListener('play', () => {
//   video.parentElement.style.overflow = 'hidden';
// });

// video.addEventListener('pause', () => {
//   video.parentElement.style.overflow = 'auto';
// });

// music player
const audioPlayer = document.getElementById("audioPlayer");
const progressBar = document.getElementById("progress-bar");
const playBtn = document.getElementById("playBtn");
const muteBtn = document.getElementById("muteBtn");

let isPlaying = false;

playBtn.addEventListener("click", () => {
  if (isPlaying) {
    audioPlayer.pause();
    playBtn.textContent = "⏵"; // Pause symbol
    anime({
      targets: "#progress-bar",
      backgroundColor: "#555",
      duration: 500,
      easing: "easeOut",
    });
  } else {
    audioPlayer.play();
    playBtn.textContent = "♫"; // Play symbol
    anime({
      targets: "#progress-bar",
      backgroundColor: "#888",
      duration: 500,
      easing: "easeIn",
    });
  }
  isPlaying = !isPlaying;
});

muteBtn.addEventListener("click", () => {
  audioPlayer.muted = !audioPlayer.muted;
  if (audioPlayer.muted) {
    muteBtn.textContent = ""; // Mute symbol
  } else {
    muteBtn.textContent = ""; // Speaker symbol
  }
});

audioPlayer.addEventListener("timeupdate", () => {
  const progressWidth = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  progressBar.style.width = `${progressWidth}%`;
});

audioPlayer.addEventListener("ended", () => {
  isPlaying = false;
  playBtn.textContent = "⏵"; // Pause symbol
  anime({
    targets: "#progress-bar",
    backgroundColor: "#555",
    duration: 500,
    easing: "easeOut",
  });
});

// Animate progress bar on click
progressBar.addEventListener("click", (event) => {
  const clickPosition = event.offsetX / progressBar.offsetWidth;
  const newTime = clickPosition * audioPlayer.duration;
  audioPlayer.currentTime = newTime;
  anime({
    targets: "#progress-bar",
    width: `${clickPosition * 100}%`,
    duration: 300,
    easing: "easeOut",
  });
});

// Bonus: Add volume control
const volumeSlider = document.createElement("input");
volumeSlider.type = "range";
volumeSlider.min = 0;
volumeSlider.max = 1;
volumeSlider.value = audioPlayer.volume;
volumeSlider.style.marginLeft = "10px";
controls.appendChild(volumeSlider);

volumeSlider.addEventListener("change", () => {
  audioPlayer.volume = volumeSlider.value;
});

// This code ensures smooth animation as the audio plays
function updateProgressBar() {
  if (isPlaying) {
    const progressWidth =
      (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.style.width = `${progressWidth}%`;
    requestAnimationFrame(updateProgressBar);
  }
}

updateProgressBar();
