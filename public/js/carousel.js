document.addEventListener('DOMContentLoaded', function () {
  (function setupImageCarousel() {
    const dots = document.querySelectorAll('.carousel-dots .dot');
    const items = document.querySelectorAll('.carousel-item');
    let currentIndex = 0;
    const intervalTime = 3000; // Time in milliseconds for each slide

    function setActiveItem(index) {
      // Remove active class from all items and dots
      items.forEach((item) => item.classList.remove('active'));
      dots.forEach((dot) => dot.classList.remove('active'));

      // Add active class to the current item and dot
      items[index].classList.add('active');
      dots[index].classList.add('active');
      currentIndex = index; // Update the current index
    }

    function nextItem() {
      let nextIndex = (currentIndex + 1) % items.length;
      setActiveItem(nextIndex);
    }

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        setActiveItem(index);
        resetInterval();
      });
    });

    let interval = setInterval(nextItem, intervalTime);

    function resetInterval() {
      clearInterval(interval);
      interval = setInterval(nextItem, intervalTime);
    }
  })();

  (function setupCategoriesCarousel() {
    const categoriesContainer = document.querySelector('.categories-container');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let scrollAmount = 0;
    const scrollStep = 320; // Adjust to the width of each category + margin

    prevBtn.addEventListener('click', () => {
      scrollAmount = Math.max(scrollAmount - scrollStep, 0);
      categoriesContainer.style.transform = `translateX(-${scrollAmount}px)`;
    });

    nextBtn.addEventListener('click', () => {
      const maxScroll =
        categoriesContainer.scrollWidth - categoriesContainer.clientWidth;
      scrollAmount = Math.min(scrollAmount + scrollStep, maxScroll);
      categoriesContainer.style.transform = `translateX(-${scrollAmount}px)`;
    });
  })();
});
