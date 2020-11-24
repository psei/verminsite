////////////////////////
// variables
const toTopBtn = document.querySelector('.to-top');
const scrollLinks = document.querySelectorAll('.scroll-link');
const langBtns = document.querySelectorAll('.lang-btn');

////////////////////////
// event listeners
function eventListeners() {
  window.addEventListener('scroll', handleScroll);
  langBtns.forEach(btn => {
    btn.addEventListener('click', changeLangauge);
  });
};

////////////////////////
// functions

function changeLangauge(e) {
  if (e.target.dataset.lang === 'de') {
    showLanguage('de');
    hideLanguage('en');
  } else if (e.target.dataset.lang === 'en') {
    showLanguage('en');
    hideLanguage('de');
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
  hideLanguage('de');
  smoothScrool();
  eventListeners();
};

document.addEventListener('DOMContentLoaded', init);