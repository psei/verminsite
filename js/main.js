////////////////////////
// variables
const toTopBtn = document.querySelector('.to-top');
const scrollLinks = document.querySelectorAll('.scroll-link');

////////////////////////
// event listeners
function eventListeners() {
  window.addEventListener('scroll', handleScroll);
};

////////////////////////
// functions

function handleScroll() {
  showBackToTop();
};

function showBackToTop() {
  if (window.pageYOffset > 512) {
    toTopBtn.classList.add('active');
  } else {
    toTopBtn.classList.remove('active');
  }
};

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

function init() {
  smoothScrool();
  eventListeners();
};

document.addEventListener('DOMContentLoaded', init);