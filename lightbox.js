(function () {
  const lightbox = document.getElementById('lightbox');
  const backdrop = lightbox.querySelector('.lightbox-backdrop');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');
  const image = lightbox.querySelector('.lightbox-image');
  const title = lightbox.querySelector('.lightbox-title');
  const description = lightbox.querySelector('.lightbox-description');
  const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));

  let currentIndex = 0;

  function showSlide(index) {
    currentIndex = index;
    if (currentIndex < 0) currentIndex = galleryItems.length - 1;
    if (currentIndex >= galleryItems.length) currentIndex = 0;

    const item = galleryItems[currentIndex];
    image.src = item.dataset.src;
    image.alt = item.dataset.title || 'Previous act';
    title.textContent = item.dataset.title || 'Previous act';
    description.textContent = item.dataset.description || '';

    prevBtn.style.visibility = galleryItems.length > 1 ? 'visible' : 'hidden';
    nextBtn.style.visibility = galleryItems.length > 1 ? 'visible' : 'hidden';
  }

  function openLightbox(index) {
    currentIndex = index;
    showSlide(currentIndex);
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function goPrev() {
    showSlide(currentIndex - 1);
  }

  function goNext() {
    showSlide(currentIndex + 1);
  }

  galleryItems.forEach(function (item, index) {
    item.addEventListener('click', function () {
      openLightbox(index);
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  backdrop.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    goPrev();
  });
  nextBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    goNext();
  });

  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') goPrev();
    if (e.key === 'ArrowRight') goNext();
  });

  var touchStartX = 0;
  var touchEndX = 0;

  lightbox.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightbox.addEventListener('touchend', function (e) {
    touchEndX = e.changedTouches[0].screenX;
    var diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
  }, { passive: true });
})();
