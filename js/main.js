////////////////////////
// variables
const toTopBtn = document.querySelector('.to-top');
const scrollLinks = document.querySelectorAll('.scroll-link');
const langBtns = document.querySelectorAll('.lang-btn');
const scrollElements = document.querySelectorAll('.scroll');
const dividerElements = document.querySelectorAll('.divider');
const tapes = document.querySelectorAll('.tape');
const tapeBtns = document.querySelectorAll('.tape-btn');

// image slider
const imageSlider = document.querySelector('.image-slider');
const imagesContainer = imageSlider.querySelector('.image-slider__images');
const sliderImages = imageSlider.querySelectorAll('.image-slider__image');
const sliderDots = imageSlider.querySelectorAll('.dot');
const nextBtn = imageSlider.querySelector('.next');
const prevBtn = imageSlider.querySelector('.prev');
const imageCount = imagesContainer.querySelectorAll('.image-slider__image').length - 1;
let currentImage = 0;
let imageSliderID;
let startAgainID;
const imageSliderInterval = 5000;

////////////////////////
// event listeners
function eventListeners() {
  // handle scroll event
  window.addEventListener('scroll', handleScroll);
  // change language
  langBtns.forEach(btn => {
    btn.addEventListener('click', changeLangauge);
  });
  // show tape content
  tapes.forEach(tape => {
    tape.addEventListener('click', showTapeContent);
  });
  // image slider controls
  nextBtn.addEventListener('click', imageSliderControl);
  prevBtn.addEventListener('click', imageSliderControl);
  // image slider nav
  sliderDots.forEach(dot => {
    dot.addEventListener('click', imageSliderControl);
  });
};

////////////////////////
// everything related to scroll on page
function handleScroll() {
  showBackToTop();
  showSection();
  handleDivider();
};

////////////////////////
// functions

// image slider
function imageSliderControl(e) {
  if (e.target.classList.contains('prev')) {
    if (currentImage - 1 < 0) {
      currentImage = imageCount;
    } else {
      currentImage -= 1;
    }
    slideImage(currentImage);
  } else if (e.target.classList.contains('next')) {
    if (currentImage + 1 > imageCount) {
      currentImage = 0;
    } else {
      currentImage += 1;
    }
    slideImage(currentImage);
  } else if (e.target.classList.contains('dot')) {
    currentImage = parseInt(e.target.dataset.image);
    slideImage(currentImage);
  }
  clearInterval(imageSliderID);
  startSlider();
}

function slideImage(slideTo) {
  imagesContainer.style.transform = `translateX(-${slideTo*100}%)`;
  // switch dots
  sliderDots.forEach(dot => {
    dot.classList.remove('active');
  });
  sliderDots[slideTo].classList.add('active');
  // show overlay
    sliderImages.forEach(image => {
    image.classList.remove('active');
  });
  sliderImages[slideTo].classList.add('active');
}

function startSlider() {
  imageSliderID = setInterval(() => {
    if (currentImage + 1 > imageCount) {
      currentImage = 0;
    } else {
      currentImage += 1;
    }
    slideImage(currentImage);
  }, imageSliderInterval);
}

// show element when it is in viewport
function handleDivider() {
  dividerElements.forEach(element => {
    if (isInViewport(element, 0.30)) {
      element.classList.add('active');
    } else {
      element.classList.remove('active');
    }
  });
};

// open tape content
function showTapeContent(e) {
  e.preventDefault();
  const tapeID = e.currentTarget.id;
  const tapeButton = e.currentTarget.querySelector('.tape-btn');
  if (tapeID.indexOf('tape') != -1) {
    window.location.hash = tapeID;
    tapeBtns.forEach(tapeBtn => {
      tapeBtn.innerHTML = '<i class="fas fa-plus"></i>';
    });
    tapeButton.innerHTML = '<i class="fas fa-caret-up"></i>';
  }
};

// show element when it is in viewport
function showSection() {
  scrollElements.forEach(element => {
    if (isInViewport(element, 0.65)) {
      element.classList.add('appear');
    }
  });
};

function isInViewport (element, topValue) {
  const bounding = element.getBoundingClientRect();
  return bounding.top <= window.innerHeight * topValue;
};

/*
  bounding.left >= 0 &&
  bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
  bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
*/

// switch between languages
function changeLangauge(e) {
  if (e.target.dataset.lang === 'de') {
    showLanguage('de');
    hideLanguage('en');
    document.querySelector('html').setAttribute('lang', 'de');
  } else if (e.target.dataset.lang === 'en') {
    showLanguage('en');
    hideLanguage('de');
    document.querySelector('html').setAttribute('lang', 'en');
  }
  langBtns.forEach(btn => {
    if (btn.dataset.lang === e.target.dataset.lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
};

function hideLanguage(language) {
  const langaugeContent = document.querySelectorAll(`body [lang="${language}"]`);
    langaugeContent.forEach(content => {
    content.style.display = 'none';
  });
};

function showLanguage(language) {
  const langaugeContent = document.querySelectorAll(`body [lang="${language}"]`);
    langaugeContent.forEach(content => {
    content.style.display = 'block';
  });
};

// show the back to top button
function showBackToTop() {
  if (window.pageYOffset > 512) {
    toTopBtn.classList.add('active');
  } else {
    toTopBtn.classList.remove('active');
  }
};

// smooth scroll
function smoothScrool() {
  scrollLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const id = e.target.getAttribute('href').slice(1);
      const element = document.getElementById(id) || document.getElementById('home');
      let position = element.offsetTop - 62;
      window.scrollTo({
        left: 0,
        top: position,
        behavior: 'smooth'
      });
    });
  });
};

////////////////////////
// init everyhting
function init() {
  hideLanguage('de');
  smoothScrool();
  eventListeners();
  startSlider();
};

////////////////////////
// wait until dom content is loeded
document.addEventListener('DOMContentLoaded', init);