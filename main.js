document.addEventListener("DOMContentLoaded", function () {
  // Elements to animate
  const elementsToAnimate = document.querySelectorAll('.intro, .grid-layout, .about, .contact, .project, #passwordForm');

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

  // Artwork images from the first <div class="artwork"> in each file
  const artworkImages = [
    "images/chorescore/cover.png",
    "images/dow-jones-interoperable-modules/cover.png",
    "images/dow-jones-risk-and-compliance/cover.png",
    "images/reportly/cover.jpg"
  ];

  // Function to preload images (returns a promise)
  function preloadImages(imageArray) {
    return Promise.all(
      imageArray.map((url) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = url;
          img.onload = resolve;
        });
      })
    );
  }

  // Preload all images (memoji + artwork)
  Promise.all([
    preloadImages(memojiImages),
    preloadImages(artworkImages)
  ]).then(() => {
    console.log("All images are loaded!");

    // Apply fade-in animations after everything is loaded
    elementsToAnimate.forEach((element) => {
      element.classList.add('fade-in');
    });
  });

  // Store the index of the last displayed memoji image
  let lastImageIndex = null;

  // Function to change the memoji image randomly
  function changeImage() {
    let randomIndex = Math.floor(Math.random() * memojiImages.length);

    while (randomIndex === lastImageIndex) {
      randomIndex = Math.floor(Math.random() * memojiImages.length);
    }

    lastImageIndex = randomIndex;

    const imageElement = document.getElementById("memoji");

    // Add an event listener for transitionend
    imageElement.addEventListener('transitionend', function handler() {
      // Update the image source
      imageElement.src = memojiImages[randomIndex];

      // Remove the fade-out class to fade in the new image
      imageElement.classList.remove('fade-out');

      // Remove the event listener to prevent memory leaks
      imageElement.removeEventListener('transitionend', handler);
    }, { once: true }); // Use { once: true } to remove the listener automatically

    // Fade out the current image
    imageElement.classList.add('fade-out');
  }

  // Attach the changeImage function to the memoji's click event
  document.getElementById("memoji").addEventListener("click", changeImage);
});
