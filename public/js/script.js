// scrolling nav menu fades in and out using opacity
const navbar = document.querySelector('.header');
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

function scrollToContent() {
  const targetSection = document.querySelector('.categories-carousel');
  const navbarHeight = 100; // Height of the fixed navbar
  const scrollPosition =
    targetSection.getBoundingClientRect().top + window.scrollY - navbarHeight;
  window.scrollTo({
    top: scrollPosition,
    behavior: 'smooth',
  });
}
