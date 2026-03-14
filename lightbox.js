(function () {
  const lightbox = document.getElementById('lightbox');
  const backdrop = lightbox.querySelector('.lightbox-backdrop');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const image = lightbox.querySelector('.lightbox-image');
  const title = lightbox.querySelector('.lightbox-title');
  const description = lightbox.querySelector('.lightbox-description');
  const galleryItems = document.querySelectorAll('.gallery-item');

  function openLightbox(src, titleText, descText) {
    image.src = src;
    image.alt = titleText;
    title.textContent = titleText;
    description.textContent = descText;
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  galleryItems.forEach(function (item) {
    item.addEventListener('click', function () {
      openLightbox(
        item.dataset.src,
        item.dataset.title || 'Previous act',
        item.dataset.description || ''
      );
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  backdrop.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox.classList.contains('is-open')) {
      closeLightbox();
    }
  });
})();
