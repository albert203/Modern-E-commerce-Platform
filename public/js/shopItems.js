// fades out the non-hovered items in categories
// opacity is set to 0.5 for non-hovered items
document.addEventListener('DOMContentLoaded', function () {
  const productImages = document.querySelectorAll('.shop-item img');
  const container = document.querySelector('.shop-container');

  productImages.forEach((productImage) => {
    productImage.addEventListener('mouseenter', () => {
      container.classList.add('hovered');
      productImage.classList.add('active');
    });

    productImage.addEventListener('mouseleave', () => {
      container.classList.remove('hovered');
      productImage.classList.remove('active');
    });
  });
});
