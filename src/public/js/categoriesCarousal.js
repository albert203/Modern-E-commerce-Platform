document.addEventListener('DOMContentLoaded', function () {
  (function setupCategoriesCarousel() {
    const categoriesContainer = document.querySelector('.categories-container');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let scrollAmount = 0;
    const scrollStep = 340; // Adjust to the width + margin of each category

    function updateButtonVisibility() {
      const maxScroll =
        categoriesContainer.scrollWidth - categoriesContainer.clientWidth;

      if (scrollAmount === 0) {
        prevBtn.style.display = 'none';
      } else {
        prevBtn.style.display = 'block';
      }

      if (scrollAmount >= maxScroll) {
        nextBtn.style.display = 'none';
      } else {
        nextBtn.style.display = 'block';
      }
    }

    prevBtn.addEventListener('click', () => {
      scrollAmount = Math.max(scrollAmount - scrollStep, 0);
      categoriesContainer.style.transform = `translateX(-${scrollAmount}px)`;
      updateButtonVisibility();
    });

    nextBtn.addEventListener('click', () => {
      const maxScroll =
        categoriesContainer.scrollWidth - categoriesContainer.clientWidth;
      scrollAmount = Math.min(scrollAmount + scrollStep, maxScroll);
      categoriesContainer.style.transform = `translateX(-${scrollAmount}px)`;
      updateButtonVisibility();
    });

    // Initial button visibility check
    updateButtonVisibility();
  })();
});

// fades out the non-hovered items in categories
// opacity is set to 0.5 for non-hovered items
document.addEventListener('DOMContentLoaded', function () {
  const categories = document.querySelectorAll('.category');
  const container = document.querySelector('.categories-container');

  categories.forEach((category) => {
    category.addEventListener('mouseenter', () => {
      container.classList.add('hovered');
      category.classList.add('active');
    });

    category.addEventListener('mouseleave', () => {
      container.classList.remove('hovered');
      category.classList.remove('active');
    });
  });
});
