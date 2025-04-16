// Memoji images
const memojiImages = [
  "images/memoji/calvin-memoji-1.png",
  "images/memoji/calvin-memoji-2.png",
  "images/memoji/calvin-memoji-3.png",
  "images/memoji/calvin-memoji-4.png",
  "images/memoji/calvin-memoji-5.png",
  "images/memoji/calvin-memoji-6.png",
  "images/memoji/calvin-memoji-7.png",
  "images/memoji/calvin-memoji-8.png",
  "images/memoji/calvin-memoji-9.png",
  "images/memoji/calvin-memoji-10.png",
  "images/memoji/calvin-memoji-11.png",
  "images/memoji/calvin-memoji-12.png",
  "images/memoji/calvin-memoji-13.png",
  "images/memoji/cat.png"
];

// Artwork images
const artworkImages = [
  "images/chorescore/cover.png",
  "images/dow-jones-interoperable-modules/cover.png",
  "images/dow-jones-risk-and-compliance/cover.png",
  "images/reportly/cover.jpg"
];

// Combine all images to preload
const imagesToPreload = [...memojiImages, ...artworkImages];

// Store references to prevent garbage collection
const preloadedImages = [];

// Preload images and call callback when all are loaded
function preloadImages(imageList, callback) {
  let loaded = 0;
  if (imageList.length === 0) {
    callback();
    return;
  }
  imageList.forEach(src => {
    const img = new Image();
    img.onload = img.onerror = () => {
      loaded++;
      if (loaded === imageList.length) {
        callback();
      }
    };
    img.src = src;
    preloadedImages.push(img);
  });
}

// Fade in page content after images are loaded
function animateOnLoad() {
  const elementsToAnimate = document.querySelectorAll('.intro, .grid-layout, .about, .contact, .project, #passwordForm');
  elementsToAnimate.forEach(el => {
    el.style.opacity = "1";
    el.style.transform = "translateY(0)";
  });
}

// --- Memoji click logic (no repeat of last image) ---
let lastImageIndex = null;

function changeImage() {
  if (!memojiImages.length) return;
  let randomIndex = Math.floor(Math.random() * memojiImages.length);

  // Prevent repeat of last image
  while (randomIndex === lastImageIndex && memojiImages.length > 1) {
    randomIndex = Math.floor(Math.random() * memojiImages.length);
  }

  lastImageIndex = randomIndex;

  const imageElement = document.getElementById("memoji");
  if (!imageElement) return;

  // Add an event listener for transitionend
  imageElement.addEventListener('transitionend', function handler() {
    // Update the image source
    imageElement.src = memojiImages[randomIndex];

    // Remove the fade-out class to fade in the new image
    imageElement.classList.remove('fade-out');

    // Remove the event listener to prevent memory leaks
    imageElement.removeEventListener('transitionend', handler);
  }, { once: true });

  // Fade out the current image
  imageElement.classList.add('fade-out');
}

// --- DOMContentLoaded: preload images, then show content, then set up memoji click handler ---
document.addEventListener("DOMContentLoaded", function () {
  preloadImages(imagesToPreload, function() {
    animateOnLoad();

    // Set up memoji click handler if the element exists
    const memojiImg = document.getElementById("memoji");
    if (memojiImg) {
      // Optionally set initial image index for lastImageIndex
      lastImageIndex = memojiImages.findIndex(src => src === memojiImg.src.split('/').slice(-2).join('/'));
      memojiImg.addEventListener('click', changeImage);
    }
  });
});
