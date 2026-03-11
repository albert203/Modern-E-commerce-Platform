document.addEventListener('DOMContentLoaded', () => {
  setupImageCarousel();
  setupCategoriesCarousel();
});

function setupImageCarousel() {
  // Initialize variables for the image carousel
  let currentIndex = 0;
  const dots = document.querySelectorAll('.carousel-dots .dot');
  const items = document.querySelectorAll('.carousel-item');
  const intervalTime = 3000; // Time in milliseconds for each slide

  const ctaData = [
    { title: "Elevate Your Style", description: "Discover our latest trending pieces", button: "Shop Now" },
    { title: "Clearance Sale", description: "Up to 40% off selected wears", button: "Explore Deals" },
    { title: "New Arrivals", description: "Explore our fresh styles", button: "Discover More" },
  ];

  // Helper function to update CTA container using the current slide's data
  const updateCTA = 
    function(index) {
      const ctaContainer = document.querySelector('.cta-container');
      if (ctaContainer && ctaData[index]) {
        const titleElem = ctaContainer.querySelector('.cta');
        const descriptionElem = ctaContainer.querySelector('p');
        const buttonElem = ctaContainer.querySelector('.cta-btn');
        if (titleElem) titleElem.textContent = ctaData[index].title;
        if (descriptionElem) descriptionElem.textContent = ctaData[index].description;
        if (buttonElem) buttonElem.textContent = ctaData[index].button;
    }
  };

  // Sets active slide and corresponding dot, then updates CTA
  const setActiveItem = (index) => {
    // ...clear active classes...
    items.forEach((item) => item.classList.remove('active'));
    dots.forEach((dot) => dot.classList.remove('active'));
    // ...set active classes and update current index...
    items[index].classList.add('active');
    dots[index].classList.add('active');
    currentIndex = index;
    updateCTA(index);
  };

  // Advances to the next slide
  const nextItem = () => {
    const nextIndex = (currentIndex + 1) % items.length;
    setActiveItem(nextIndex);
  };

  // Set interval for automatic slide changes with a reset on manual change
  let interval = setInterval(nextItem, intervalTime);
  const resetInterval = () => {
    clearInterval(interval);
    interval = setInterval(nextItem, intervalTime);
  };

  // Attach event listeners to dots for manual slide selection
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      setActiveItem(index);
      resetInterval();
    });
  });
}

function setupCategoriesCarousel() {
  // Initialize variables for the categories carousel
  const categoriesContainer = document.querySelector('.categories-container');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  let scrollAmount = 0;
  const scrollStep = 320; // Adjust to the width of each category + margin

  // Scroll backward on previous button click
  prevBtn.addEventListener('click', () => {
    scrollAmount = Math.max(scrollAmount - scrollStep, 0);
    categoriesContainer.style.transform = `translateX(-${scrollAmount}px)`;
  });

  // Scroll forward on next button click
  nextBtn.addEventListener('click', () => {
    const maxScroll = categoriesContainer.scrollWidth - categoriesContainer.clientWidth;
    scrollAmount = Math.min(scrollAmount + scrollStep, maxScroll);
    categoriesContainer.style.transform = `translateX(-${scrollAmount}px)`;
  });
}
