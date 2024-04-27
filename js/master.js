let mainColor = localStorage.getItem('--main-color');

if (mainColor !== null) {
  document.documentElement.style.setProperty('--main-color', mainColor);

  document.querySelectorAll('.colors-list li').forEach((li) => {
    li.classList.remove('active');
    if (li.dataset.color === localStorage.getItem('--main-color')) {
      li.classList.add('active');
    }

    if (li.dataset.color === localStorage.getItem('--main-color')) {
      li.classList.add('active');
    }
  });
}

const colorsLi = document.querySelectorAll('.colors-list li');
colorsLi.forEach((li) => {
  li.addEventListener('click', (e) => {
    document.documentElement.style.setProperty(
      '--main-color',
      e.target.dataset.color
    );
    localStorage.setItem('--main-color', e.target.dataset.color);
    e.target.parentElement.querySelectorAll('.active').forEach((element) => {
      element.classList.remove('active');
    });

    e.target.classList.add('active');
  });
});

const backgrounds = document.querySelectorAll('.random-background span');

document.querySelector('.settings-box .fa-gear').onclick = function () {
  this.classList.toggle('fa-spin');

  document.querySelector('.settings-box').classList.toggle('open');
};

let backgroundOption = true;

let backgroundInterval;

let backgroundLocalItem = localStorage.getItem('background_option');
if (backgroundLocalItem !== null) {
  backgrounds.forEach((span) => {
    span.classList.remove('active');
    if (backgroundLocalItem === 'true') {
      backgroundOption = true;
      span.parentElement.querySelector('.yes').classList.add('active');
    } else {
      backgroundOption = false;
      span.parentElement.querySelector('.no').classList.add('active');
    }
  });
}

backgrounds.forEach((span) => {
  span.addEventListener('click', function (e) {
    e.target.parentElement.querySelector('.active').classList.remove('active');
    e.target.classList.add('active');
    if (e.target.dataset.background === 'yes') {
      backgroundOption = true;
      randomizeImgs();
      localStorage.setItem('background_option', 'true');
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem('background_option', 'false');
    }
  });
});

const testingOption = document.querySelectorAll('.bullets-option span');

const navBullets = document.querySelector('.nav-bullets');

const optionLocal = localStorage.getItem('bullets_option');

if (optionLocal) {
  navBullets.style.display = optionLocal;
  testingOption.forEach((option) => {
    option.classList.remove('active');
    if (optionLocal === 'block') {
      option.parentElement.querySelector('.yes').classList.add('active');
    } else {
      option.parentElement.querySelector('.no').classList.add('active');
    }
  });
}

testingOption.forEach((option) => {
  option.addEventListener('click', (e) => {
    e.target.parentElement.querySelector('.active').classList.remove('active');
    e.target.classList.add('active');
    if (e.target.dataset.display === 'show') {
      navBullets.style.display = 'block';
      localStorage.setItem('bullets_option', 'block');
    } else {
      navBullets.style.display = 'none';
      localStorage.setItem('bullets_option', 'none');
    }
  });
});

let landingPage = document.querySelector('.landing-page');
let imgs = [
  '../imgs/01.jpg',
  '../imgs/02.jpg',
  '../imgs/03.jpg',
  '../imgs/04.jpg',
  '../imgs/05.jpg',
];

let localImage = localStorage.getItem('background_img');
if (localImage !== null) {
  landingPage.style.backgroundImage = `url(${localImage})`;
}

function randomizeImgs() {
  if (backgroundOption) {
    backgroundInterval = setInterval(() => {
      let randomOfNbr = Math.floor(Math.random() * imgs.length);
      landingPage.style.backgroundImage = `url(${imgs[randomOfNbr]})`;
      localStorage.setItem('background_img', imgs[randomOfNbr]);
    }, 5000);
  }
}
randomizeImgs();

let ourSkills = document.querySelector('.skills');

window.onscroll = function () {
  let skillsOffsetTop = ourSkills.offsetTop;

  let skillsOuterHeight = ourSkills.offsetHeight;

  let windowHeight = this.innerHeight;

  let windowScrollTop = this.scrollY;

  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(
      '.skill-box .skill-progress span'
    );
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

let ourGallery = document.querySelectorAll('.gallery img');

ourGallery.forEach((image) => {
  image.addEventListener('click', function (e) {
    let overlay = document.createElement('div');

    overlay.className = 'popup-overlay';

    document.body.appendChild(overlay);

    let popupBox = document.createElement('div');

    popupBox.className = 'popup-box';

    let closePopup = document.createElement('span');
    closePopup.innerHTML = 'X';

    popupBox.appendChild(closePopup);

    let img = document.createElement('img');

    if (e.target.alt) {
      img.alt = e.target.alt;

      let titleHead = document.createElement('h3');

      titleHead.innerHTML = e.target.alt;

      popupBox.appendChild(titleHead);
    }

    img.src = e.target.src;

    popupBox.appendChild(img);

    document.body.appendChild(popupBox);

    document.querySelector('.popup-box span').onclick = function (e) {
      this.parentElement.remove();
      document.querySelector('.popup-overlay').remove();
    };
  });
});

const allBullets = document.querySelectorAll('.nav-bullets .bullets');

allBullets.forEach((bullet) => {
  bullet.addEventListener('click', (e) => {
    document.querySelector(`.${e.target.dataset.section}`).scrollIntoView({
      behavior: 'smooth',
    });
  });
});

document.querySelector('.reset-option').onclick = function () {
  localStorage.removeItem('--main-color');
  localStorage.removeItem('background_option');
  localStorage.removeItem('bullets_option');
  window.location.reload();
};

let toggleBtn = document.querySelector('.toggle-menu');
let links = document.querySelector('.links');

toggleBtn.onclick = function (e) {
  e.stopPropagation();
  this.classList.toggle('activeToggle');
  links.classList.toggle('open');
};

links.onclick = function (e) {
  e.stopPropagation();
};

document.addEventListener('click', function (e) {
  if (e.target !== toggleBtn && e.target !== links) {
    if (links.classList.contains('open')) {
      toggleBtn.classList.remove('activeToggle');
      links.classList.remove('open');
    }
  }
});
