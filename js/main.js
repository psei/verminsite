////////////////////////
// variables
const navbar = document.querySelector('.navbar');
const navBtn = document.getElementById('nav-toggle');
const toTopBtn = document.querySelector('.to-top');
const links = document.getElementById('nav-links');
const scrollLinks = document.querySelectorAll('.scroll-link');

//const imageSliderBtns = document.querySelector('.image-slider__controls');
//const imageSliderImages = document.querySelectorAll('.image-slider__images img');

const heroSliderBtns = document.querySelector('.hero-controls');
const heroSlides = document.querySelectorAll('.hero-slide');

const testimonialsBtns = document.querySelector('.testimonials-controls');
const testimonialsContainer = document.querySelector('.testimonials');
const testimonials = document.querySelectorAll('.testimonial');

let lastPageOffset = 0;
let currentImageSlide = 0;

let currentHeroSlide = 0;
let heroSliderIntervalID;

let currentTestimonial = 0;
let testimonialsIntervalID;





////////////////////////
// event listeners
function eventListeners() {
  window.addEventListener('scroll', handleScroll);
  //imageSliderBtns.addEventListener('click', imageSlider);
  heroSliderBtns.addEventListener('click', heroSlider);
  testimonialsBtns.addEventListener('click', testimonialsSlider);
  navBtn.addEventListener('click', function() {
    if(navbar.classList.contains('active')) {
      if (window.pageYOffset === 0) {
        navbar.classList.remove('active');
        navbar.classList.remove('show');
      }
    } else {
      navbar.classList.add('active');
      navbar.classList.add('show');
    }
    links.classList.toggle('show-links');
    this.classList.toggle('toggle');
  });
};

////////////////////////
// functions
function startTestimonialsInterval() {
  testimonialsIntervalID = setInterval(function() {
    changeTestimonialsSlide('next');
  }, 5000);
};

function testimonialsSlider(e) {
  const btn = e.target;
  if (btn.classList.contains('testimonials-prev')) {
    changeTestimonialsSlide('prev');
    clearInterval(testimonialsIntervalID);
    startTestimonialsInterval();
  } else if (btn.classList.contains('testimonials-next')) {
    changeTestimonialsSlide('next');
    clearInterval(testimonialsIntervalID);
    startTestimonialsInterval();
  }
};

function changeTestimonialsSlide(direction) {
  const slidesCount = testimonials.length-1;
  if (direction === 'next') {
    currentTestimonial = currentTestimonial === (slidesCount * 100) ? 0 : currentTestimonial + 100;
  } else if (direction === 'prev') {
    currentTestimonial = currentTestimonial === 0 ? (slidesCount * 100) : currentTestimonial - 100;
  }
  testimonialsContainer.style.transform = `translateX(-${currentTestimonial}%)`;
};



function startHeroSLiderInterval() {
  heroSliderIntervalID = setInterval(function() {
    changeHeroSlide('next');
  }, 5000);
};

function heroSlider(e) {
  const btn = e.target;
  if (btn.classList.contains('hero-prev')) {
    changeHeroSlide('prev');
    clearInterval(heroSliderIntervalID);
    startHeroSLiderInterval();
  } else if (btn.classList.contains('hero-next')) {
    changeHeroSlide('next');
    clearInterval(heroSliderIntervalID);
    startHeroSLiderInterval();
  }
};

function changeHeroSlide(direction) {
  const slidesCount = heroSlides.length;
  if (direction === 'next') {
    heroSlides[currentHeroSlide].classList.remove('active');
    currentHeroSlide = currentHeroSlide < (slidesCount-1) ? currentHeroSlide + 1 : 0;
    heroSlides[currentHeroSlide].classList.add('active');
  } else if (direction === 'prev') {
    heroSlides[currentHeroSlide].classList.remove('active');
    currentHeroSlide = currentHeroSlide  ? currentHeroSlide - 1 : slidesCount-1;
    heroSlides[currentHeroSlide].classList.add('active');
  }
};

function imageSlider(e) {
  const btn = e.target;
  const imageCount = imageSliderImages.length;
  if (btn.classList.contains('left')) {
    imageSliderImages[currentImageSlide].classList.remove('show');
    currentImageSlide = currentImageSlide  ? currentImageSlide - 1 : imageCount-1;
    imageSliderImages[currentImageSlide].classList.add('show');
  } else if (btn.classList.contains('right')) {
    imageSliderImages[currentImageSlide].classList.remove('show');
    currentImageSlide = currentImageSlide < (imageCount-1) ? currentImageSlide + 1 : 0;
    imageSliderImages[currentImageSlide].classList.add('show');
  }
};

function handleScroll() {
  showNav();
  showBackToTop();
};

function showBackToTop() {
  if (window.pageYOffset > 512) {
    toTopBtn.classList.add('active');
  } else {
    toTopBtn.classList.remove('active');
  }
};

function showNav() {
  if (window.pageYOffset != 0) {
    navbar.classList.add('active');
    if (lastPageOffset > window.pageYOffset || window.pageYOffset === 0) {
      navbar.classList.add('show');
    } else {
      navbar.classList.remove('show');
      if(links.classList.contains('show-links')) {
        links.classList.remove('show-links');
        navBtn.classList.remove('toggle');
      }
    }
    lastPageOffset = window.pageYOffset;
  } else {
    navbar.classList.remove('active');
  }
};

function smoothScrool() {
  scrollLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      links.classList.remove('show-links');
      navBtn.classList.remove('toggle');
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

function init() {
  smoothScrool();
  eventListeners();
  startHeroSLiderInterval();
  startTestimonialsInterval();
};

document.addEventListener('DOMContentLoaded', init);