// Store the state of each swiper
const swiperStates = {
    closeupSwiper: 'dirty',
    fullSwiper: 'dirty'
};

// Function to swap between dirty and clean images
function swipeImage(swiperId, state) {
    const imageElement = document.getElementById(swiperId);
    let dirtyImageName, cleanImageName, altBase;

    if (swiperId === 'closeupSwiper') {
        dirtyImageName = 'Close-up-dirty.png';
        cleanImageName = 'close-up-clean.png';
        altBase = 'Close-up';
    } else {
        dirtyImageName = 'full-dirty.png';
        cleanImageName = 'full-clean.png';
        altBase = 'Full';
    }

    // Update the state
    swiperStates[swiperId] = state;

    // Update the image source
    if (state === 'dirty') {
        imageElement.src = `images/${dirtyImageName}`;
        imageElement.alt = `${altBase} Dirty`;
    } else {
        imageElement.src = `images/${cleanImageName}`;
        imageElement.alt = `${altBase} Clean`;
    }

    // Add a subtle animation effect
    imageElement.style.opacity = '0.5';
    setTimeout(() => {
        imageElement.style.opacity = '1';
    }, 100);
}

// Add touch swipe functionality for mobile devices
document.addEventListener('DOMContentLoaded', function () {
    const swiperContainers = document.querySelectorAll('.swiper-container');

    swiperContainers.forEach(container => {
        let touchStartX = 0;
        let touchEndX = 0;

        container.addEventListener('touchstart', function (e) {
            touchStartX = e.changedTouches[0].screenX;
        }, false);

        container.addEventListener('touchend', function (e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe(this, touchStartX, touchEndX);
        }, false);
    });
});

// Handle swipe gestures
function handleSwipe(element, startX, endX) {
    const swiperId = element.querySelector('.swiper-image').id;
    const currentState = swiperStates[swiperId];

    // If swiped from left to right, show dirty
    if (startX < endX - 50) {
        swipeImage(swiperId, 'dirty');
    }
    // If swiped from right to left, show clean
    else if (startX > endX + 50) {
        swipeImage(swiperId, 'clean');
    }
}

// Add smooth animation to images when they load
window.addEventListener('load', function () {
    const images = document.querySelectorAll('.swiper-image');
    images.forEach(img => {
        img.style.transition = 'opacity 0.3s ease-in-out';
    });
});
