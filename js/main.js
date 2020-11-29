////////////////////////
// variables
const toTopBtn = document.querySelector('.to-top');
const scrollLinks = document.querySelectorAll('.scroll-link');
const langBtns = document.querySelectorAll('.lang-btn');
const scrollElements = document.querySelectorAll('.scroll');
const tapes = document.querySelectorAll('.tape');
const tapeBtns = document.querySelectorAll('.tape-btn');


////////////////////////
// event listeners
function eventListeners() {
  // handle scroll event
  window.addEventListener('scroll', handleScroll);
  //change language
  langBtns.forEach(btn => {
    btn.addEventListener('click', changeLangauge);
  });
  //show tape content
  tapes.forEach(tape => {
    tape.addEventListener('click', showTapeContent);
  });
};

////////////////////////
// everything related to scroll on page
function handleScroll() {
  showBackToTop();
  showSection();
};

////////////////////////
// functions

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
}

// show element when it is in viewport
function showSection() {
  scrollElements.forEach(element => {
    if (isInViewport(element)) {
      element.classList.add('appear');
    }
  });
}

function isInViewport (element) {
    const bounding = element.getBoundingClientRect();
    return bounding.top <= window.innerHeight * 0.65;
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
};

////////////////////////
// wait until dom content is loeded
document.addEventListener('DOMContentLoaded', init);