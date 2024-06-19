document.addEventListener('DOMContentLoaded', () => {
  const filterForm = document.getElementById('filterForm');
  const minPriceInput = document.getElementById('minPrice');
  const maxPriceInput = document.getElementById('maxPrice');
  const minPriceValue = document.getElementById('minPriceValue');
  const maxPriceValue = document.getElementById('maxPriceValue');

  minPriceInput.addEventListener('input', () => {
    minPriceValue.textContent = minPriceInput.value;
    if (parseInt(minPriceInput.value) > parseInt(maxPriceInput.value)) {
      maxPriceInput.value = minPriceInput.value;
      maxPriceValue.textContent = maxPriceInput.value;
    }
  });

  maxPriceInput.addEventListener('input', () => {
    maxPriceValue.textContent = maxPriceInput.value;
    if (parseInt(maxPriceInput.value) < parseInt(minPriceInput.value)) {
      minPriceInput.value = maxPriceInput.value;
      minPriceValue.textContent = minPriceInput.value;
    }
  });

  filterForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const filters = {
      category: filterForm.category.value,
      size: filterForm.size.value,
      color: filterForm.color.value,
      brand: filterForm.brand.value,
      minPrice: minPriceInput.value,
      maxPrice: maxPriceInput.value,
      rating: filterForm.rating.value,
      availability: filterForm.availability.value,
    };

    applyFilter(filters);
  });

  function applyFilter(filters) {
    // filter logic
    // filter the displayed products in the DOM
    console.log('Applying filters:', filters);
  }
});

// Function to toggle filters visibility
function toggleFilters() {
  const filtersContainer = document.getElementById('filters');
  const filterToggleIcon = document.querySelector('.filter-toggle .icon');
  const shopContainer = document.querySelector('.shop-container');
  const filterToggle = document.querySelector('.filter-toggle');

  // Toggle class to expand/collapse filters
  filtersContainer.classList.toggle('expanded');
  filterToggleIcon.classList.toggle('rotate');

  // Adjust margin-left of shop container when filters are expanded
  if (filtersContainer.classList.contains('expanded')) {
    shopContainer.style.marginLeft = '320px'; // Adjust the value as needed to match the width of filters container
    filterToggle.style.left = '320px'; // Adjust the value as needed to match the width of filters container
  } else {
    shopContainer.style.marginLeft = '0px';
    filterToggle.style.left = '10px';
  }

  // Set filters container height to match main container
  const mainContainerHeight =
    document.querySelector('.main-container').clientHeight;
  filtersContainer.style.height = `${mainContainerHeight}px`;
}

// Function to close filters if clicked outside
document.addEventListener('click', function (event) {
  const filtersContainer = document.getElementById('filters');
  const filterToggle = document.querySelector('.filter-toggle');

  // Check if the click is outside the filters container and filter toggle button
  if (
    !filtersContainer.contains(event.target) &&
    !filterToggle.contains(event.target)
  ) {
    filtersContainer.classList.remove('expanded');
    document.querySelector('.filter-toggle .icon').classList.remove('rotate');
    document.querySelector('.shop-container').style.marginLeft = '0px';
    document.querySelector('.filter-toggle').style.left = '20px';
  }
});
