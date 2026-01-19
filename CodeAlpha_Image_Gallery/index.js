
// Carousel prev/next behavior for horizontal overflow layout
document.addEventListener('DOMContentLoaded', () => {
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    if (!prevButton || !nextButton) return;

    // find the carousel container inside the same overflow-hidden wrapper
    const wrapper = prevButton.closest('.overflow-hidden');
    if (!wrapper) return;

    // the inner flex container (matches the user's markup: overflow-x-hidden flex gap-6)
    const carousel = wrapper.querySelector('.overflow-x-hidden.flex');
    if (!carousel) return;

    const items = Array.from(carousel.querySelectorAll('.group'));

    // Scroll amount: one viewport width (so sm shows 1, md shows 4 etc.)
    function getScrollAmount() {
        return carousel.clientWidth;
    }

    function updateButtons() {
        const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
        if (carousel.scrollLeft <= 0) {
            prevButton.setAttribute('disabled', '');
            prevButton.classList.add('text-gray-400');
            prevButton.classList.remove('text-white');
        } else {
            prevButton.removeAttribute('disabled');
            prevButton.classList.remove('text-gray-400');
            prevButton.classList.add('text-white');
        }

        if (carousel.scrollLeft >= maxScrollLeft - 1) {
            nextButton.setAttribute('disabled', '');
            nextButton.classList.add('text-gray-400');
            nextButton.classList.remove('text-white');
        } else {
            nextButton.removeAttribute('disabled');
            nextButton.classList.remove('text-gray-400');
            nextButton.classList.add('text-white');
        }
    }

    prevButton.addEventListener('click', () => {
        const amount = getScrollAmount();
        carousel.scrollBy({ left: -amount, behavior: 'smooth' });
    });

    nextButton.addEventListener('click', () => {
        const amount = getScrollAmount();
        carousel.scrollBy({ left: amount, behavior: 'smooth' });
    });

    // update buttons after scroll / on resize
    carousel.addEventListener('scroll', () => requestAnimationFrame(updateButtons));
    window.addEventListener('resize', () => requestAnimationFrame(updateButtons));

    // initial state
    updateButtons();

});

// Lightbox functionality (wrapped in DOMContentLoaded for safety/consistency)
document.addEventListener('DOMContentLoaded', () => {
    const galleryContainers = document.querySelectorAll('.group'); // Renamed for clarity
    const lightBox = document.getElementById('lightBox');
    const lightBoxImage = document.getElementById('lightBoxCon');
    const caption = document.getElementById('caption');
    const lightBoxClose = document.getElementById('close');

    console.log({
        galleryContainersLength: galleryContainers.length,
        lightBox,
        lightBoxImage,
        caption,
        lightBoxClose,
    });

    // Check if all elements exist
    if (!galleryContainers.length || !lightBox || !lightBoxImage || !caption || !lightBoxClose) {
        console.warn('Lightbox elements not found in the DOM');
        return; // Now legal inside the event callback
    }

    galleryContainers.forEach((container) => {
        container.addEventListener('click', (e) => { // Added 'e' param
            // Ignore clicks on the favorite button (or add more exclusions if needed)
            if (e.target.closest('button')) return;

            const image = container.querySelector('img');

            if (image) {
                lightBoxImage.src = image.src;
                caption.textContent = image.alt || 'No description available';
                lightBox.classList.remove('hidden');
                lightBox.classList.add('flex');
            }
        });
    });

    lightBoxClose.addEventListener('click', () => {
        lightBox.classList.remove('flex');
        lightBox.classList.add('hidden');
        // console.log('click');
    });

    //Close lightbox by clicking the backdrop (outside the image/close button)
    lightBox.addEventListener('click', (e) => {
        if (e.target === lightBox) {
            lightBox.classList.remove('flex');
            lightBox.classList.add('hidden');
        }
    });
});