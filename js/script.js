// Navigation Menu
const body = document.querySelector("body")
const navbar = document.querySelector(".navbar")
const menuBtn = document.querySelector(".menu-btn")
const cancelBtn = document.querySelector(".cancel-btn")

// Show menu on button click
menuBtn.onclick = () => {
    navbar.classList.add("show");
    menuBtn.classList.add("hide");
    body.classList.add("disabled");
};

// Hide menu on cancel button click
cancelBtn.onclick = () => {
    body.classList.remove("disabled");
    navbar.classList.remove("show");
    menuBtn.classList.remove("hide");
}

// Change navbar style on scroll
window.onscroll = () => {
    this.scrollY > 20
    ? navbar.classList.add("sticky")
    : navbar.classList.remove("sticky");
}

document.addEventListener('DOMContentLoaded', function () {
    // Function to initialize a swiper
    function initSwiper(containerId, hasPagination, hasButtons) {
      // Get the container and relevant elements
      const container = document.getElementById(containerId);
      const wrapper = container.querySelector('.swiper-wrapper');
      const slides = container.querySelectorAll('.swiper-slide');
      const pagination = container.querySelector('.swiper-pagination');
      const prevBtn = container.querySelector('.swiper-button-prev');
      const nextBtn = container.querySelector('.swiper-button-next');

      let isDragging = false; // flag to track whether the user is dragging
      let startPosX = 0; // initial x position for drag
      let currentIndex = 0; // current index of the displayed slide

      function updateSlidePosition() {
        const slideWidth = slides[0].offsetWidth;
        // adjust the wrapper transform property to show the current slide
        wrapper.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
      }

      function showSlide(index) {
        // update the current index and update the slide position
        currentIndex = index;
        updateSlidePosition();
      }

      function showNextSlide() {
        // show the next slide
        currentIndex = Math.min(currentIndex + 1, slides.length - 1);
        updateSlidePosition();
      }

      function showPrevSlide() {
        // show the previous slide
        currentIndex = Math.max(currentIndex - 1, 0);
        updateSlidePosition();
      }

      // Create pagination bullets
      if (hasPagination) {
        slides.forEach((_, index) => {
          const bullet = document.createElement('span');
          bullet.addEventListener('click', () => showSlide(index));
          pagination.appendChild(bullet);
        });
      }

      // Add event listeners to buttons
      if (hasButtons) {
        nextBtn.addEventListener('click', showNextSlide);
        prevBtn.addEventListener('click', showPrevSlide);
      }

      // Mouse and touch events for swipe
      container.addEventListener('mousedown', handleDragStart);
      container.addEventListener('touchstart', handleDragStart);

      document.addEventListener('mousemove', handleDragMove);
      document.addEventListener('touchmove', handleDragMove);

      document.addEventListener('mouseup', handleDragEnd);
      document.addEventListener('touchend', handleDragEnd);

      function handleDragStart(event) {
        // set up for dragging: flag, initial x position
        isDragging = true;
        startPosX = event.type === 'mousedown' ? event.clientX : event.touches[0].clientX;
      }

      function handleDragMove(event) {
        if (!isDragging) return;

        const currentPosX = event.type === 'mousemove' ? event.clientX : event.touches[0].clientX;
        const deltaX = currentPosX - startPosX;

        // determine if the user is dragging left ot right and show the corresponding slide
        if (deltaX > 50) {
          showPrevSlide();
          isDragging = false;
        } else if (deltaX < -50) {
          showNextSlide();
          isDragging = false;
        }
      }

      function handleDragEnd() {
        // end of dragging and reset the flag
        isDragging = false;
      }

      // Show the first slide
      updateSlidePosition();
    }

    // Initialize swipers
    initSwiper('swiperWithBullet', true, false); // Swiper with Bullet Pagination
    initSwiper('swiperWithButtons', false, true); // Swiper with Navigation Buttons
  });

// Countdown timer
var countdownDate = new Date("Dec 31, 2023 23:59:59").getTime();
var x = setInterval(function () {
  var nowDT = new Date().getTime();
  var distance = countdownDate - nowDT;
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
  // Update countdown display
  document.querySelector(".days h3").innerHTML = days;
  document.querySelector(".hours h3").innerHTML = hours;
  document.querySelector(".minutes h3").innerHTML = minutes;
  document.querySelector(".seconds h3").innerHTML = seconds;
  
  // If the countdown is over, display a welcome message
  if (distance < 0) {
    clearInterval(x);
    document.querySelector(".countdown-timer").style.display = "none";
    document.querySelector(".cs-content h1").innerHTML = "Welcome";
  }
}, 1000);

// Filter Menu
const fmenuBtns = document.querySelectorAll(".fmenu-btn");
const gameItems = document.querySelectorAll(".game-item");

let activeBtn = "all";

// Initialize with the "all" filter
showMenu(activeBtn);

// Add click event listeners to filter buttons
fmenuBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Reset active state for all buttons
    resetActiveBtn();
    
    // Show items based on the selected filter
    showMenu(btn.id);
    
    // Set the clicked button as active
    btn.classList.add("active-btn");
  });
});

// Reset active state for all filter buttons
function resetActiveBtn() {
  fmenuBtns.forEach((btn) => {
    btn.classList.remove("active-btn");
  });
}

// Show or hide items based on the selected filter
function showMenu(newMenuBtn) {
  activeBtn = newMenuBtn;
  gameItems.forEach((item) => {
    if (item.classList.contains(activeBtn)) {
      item.style.display = "grid";
    } else {
      item.style.display = "none";
    }
  });
}