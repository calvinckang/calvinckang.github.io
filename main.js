// Array of image URLs
const images = [
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

// Store the index of the last displayed image
let lastImageIndex = null;

// Function to change the image randomly
function changeImage() {
  let randomIndex = Math.floor(Math.random() * images.length);

  while (randomIndex === lastImageIndex) {
    randomIndex = Math.floor(Math.random() * images.length);
  }

  lastImageIndex = randomIndex;

  const imageElement = document.getElementById("memoji");

  // Add an event listener for transitionend
  imageElement.addEventListener('transitionend', function handler() {
    // Update the image source
    imageElement.src = images[randomIndex];

    // Remove the fade-out class to fade in the new image
    imageElement.classList.remove('fade-out');

    // Remove the event listener to prevent memory leaks
    imageElement.removeEventListener('transitionend', handler);
  }, { once: true }); // Use { once: true } to remove the listener automatically

  // Fade out the current image
  imageElement.classList.add('fade-out');
}

// Attach the function to the image's click event
document.getElementById("memoji").addEventListener("click", changeImage);

